import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Free tier analysis:
 * - Skin type detection
 * - Basic concern identification
 * - Generic product suggestions (no real brands)
 */
export async function analyzeImagesFree(
  images: Array<{ data: string; mimeType: string }>,
  answers: Record<string, string[]>
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
  You are an AI skin analysis expert.
  User provided the following questionnaire responses:
      ${JSON.stringify(answers, null, 2)}

  Analyze these facial images and questionnaires. Provide a BASIC analysis:
    1. Skin type detection (oily, dry, combination, normal, sensitive)
    2. Basic concern identification (acne, dryness, oiliness, uneven tone)
    3. Skin texture quality (poor, fair, good, excellent)
    4. Pore visibility (low, moderate, high)

  For recommendations, provide ONLY generic product category suggestions
  (e.g. "Gentle foaming cleanser", "Lightweight moisturizer with SPF").
  Do NOT recommend specific brand names.

  Return ONLY valid JSON:
  {
    "skinType": "<oily | dry | combination | normal | sensitive>",
    "skinConditions": {
      "acne": { "severity": "<none | mild | moderate | severe>", "confidence": <number 0-1> },
      "skinTexture": { "quality": "<poor | fair | good | excellent>", "confidence": <number 0-1> },
      "skinTone": { "evenness": "<uneven | slightly uneven | even>", "confidence": <number 0-1> },
      "pores": { "visibility": "<low | moderate | high>", "confidence": <number 0-1> }
    },
    "recommendations": [
      {
        "category": "<e.g. Cleanser, Moisturizer, Sunscreen>",
        "product": "<generic product type, NOT a brand>",
        "reason": "<why this helps their skin>",
        "priority": "low | medium | high"
      }
    ],
    "overallScore": <number 0-100>
  }`;

  const imageParts = images.map((img) => ({
    inlineData: { data: img.data, mimeType: img.mimeType },
  }));

  const result = await model.generateContent([prompt, ...imageParts]);
  let text = result.response.text();
  text = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const parsed = JSON.parse(text);
  if (!parsed.skinConditions || !parsed.recommendations || !parsed.overallScore)
    throw new Error("Invalid response structure from Gemini");

  return parsed;
}
