import { db } from "@/lib/db";
import { analysisLog } from "@/lib/schemas/analysis-schema";
import { eq, gte, and, count } from "drizzle-orm";
import { type Tier, TIER_CONFIG } from "./get-tier";

/**
 * Checks if a user is allowed to run another analysis based on their tier limits.
 * - Free: 1 per month
 * - Glow: 3 per week
 * - Glow Pro: unlimited
 */
export async function canUserAnalyse(
  userId: string,
  tier: Tier
): Promise<{ allowed: boolean; used: number; limit: number }> {
  // Glow Pro = unlimited, skip the DB query
  if (tier === "glow_pro") {
    return { allowed: true, used: 0, limit: Infinity };
  }

  let since: Date;
  let limit: number;

  if (tier === "glow") {
    // 3 per week
    since = new Date();
    since.setDate(since.getDate() - 7);
    limit = TIER_CONFIG.glow.analysisPerWeek;
  } else {
    // Free: 1 per month
    since = new Date();
    since.setMonth(since.getMonth() - 1);
    limit = TIER_CONFIG.free.analysisPerMonth;
  }

  const [result] = await db
    .select({ count: count() })
    .from(analysisLog)
    .where(
      and(eq(analysisLog.userId, userId), gte(analysisLog.createdAt, since))
    );

  const used = result?.count ?? 0;
  return { allowed: used < limit, used, limit };
}

/**
 * Records that a user performed an analysis. Call this after a successful analysis.
 */
export async function recordAnalysis(userId: string) {
  await db.insert(analysisLog).values({ userId });
}
