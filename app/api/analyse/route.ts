import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserTier } from "@/lib/get-tier";
import { canUserAnalyse, recordAnalysis } from "@/lib/check-usage";
import { analyzeImagesFree } from "@/lib/gemini-free";
import { analyzeImagesGlow } from "@/lib/gemini-glow";
import { analyzeImagesGlowPro } from "@/lib/gemini-glow-pro";

interface ImageData {
  name: string;
  data: string;
  mimeType: string;
}

export async function POST(request: NextRequest) {
  try {
    // 1. Auth check — reject unauthenticated requests
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json(
        { error: "auth_required", message: "Please sign in to analyze." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    // 2. Resolve the user's subscription tier from Polar
    const tier = await getUserTier(userId);

    // 3. Check if user has remaining analyses for their tier
    const usage = await canUserAnalyse(userId, tier);
    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: "limit_reached",
          message: `You've used ${usage.used}/${usage.limit} analyses. Upgrade your plan for more.`,
          tier,
          used: usage.used,
          limit: usage.limit,
        },
        { status: 429 }
      );
    }

    // 4. Parse and validate images
    const body = await request.json();
    const { images, answers } = body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "No images provided" },
        { status: 400 }
      );
    }

    const validImages: ImageData[] = images.filter(
      (img: any): img is ImageData =>
        typeof img === "object" &&
        img !== null &&
        typeof img.data === "string" &&
        typeof img.mimeType === "string" &&
        img.data.length > 0 &&
        img.mimeType.startsWith("image/")
    );

    if (validImages.length === 0) {
      return NextResponse.json(
        { error: "No valid images provided" },
        { status: 400 }
      );
    }

    if (validImages.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed" },
        { status: 400 }
      );
    }

    console.log(
      `[Analysis] User: ${userId} | Tier: ${tier} | Images: ${validImages.length}`
    );

    // 5. Call the correct Gemini file based on tier
    const TIMEOUT_MS = 60000;
    let analysisPromise;

    switch (tier) {
      case "glow_pro":
        analysisPromise = analyzeImagesGlowPro(validImages, answers);
        break;
      case "glow":
        analysisPromise = analyzeImagesGlow(validImages, answers);
        break;
      default:
        analysisPromise = analyzeImagesFree(validImages, answers);
    }

    const results = await Promise.race([
      analysisPromise,
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Analysis timed out")), TIMEOUT_MS)
      ),
    ]);

    // 6. Record this analysis in the DB (for usage tracking)
    await recordAnalysis(userId);

    // 7. Return results with tier info so the frontend knows what sections to show
    console.log(`[Analysis] Complete for ${userId} (${tier})`);
    return NextResponse.json({ ...(results as object), tier });
  } catch (error) {
    console.error("Analysis error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message.includes("GEMINI_API_KEY")) {
        return NextResponse.json(
          { error: "API configuration error" },
          { status: 500 }
        );
      }

      if (
        error.message.includes("quota") ||
        error.message.includes("rate limit")
      ) {
        return NextResponse.json(
          { error: "Service temporarily unavailable. Please try again later." },
          { status: 429 }
        );
      }
    }

    const errMsg =
      (error as Error)?.message ?? "Analysis failed. Please try again.";
    return NextResponse.json(
      { error: "analysis_failed", message: errMsg },
      { status: 500 }
    );
  }
}
