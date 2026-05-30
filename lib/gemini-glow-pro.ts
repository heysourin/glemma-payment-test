import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Glow Pro tier analysis ($19.99/month) — the full suite:
 *
 * ✅ Unlimited skin analysis
 * ✅ Full concern + severity tracking
 * ✅ Real product recommendations
 * ✅ Daily adaptive routine (not weekly)
 * ✅ Lifestyle engine (Sleep, diet, stress correlations to skin)
 * ✅ Product stack optimization (Detect conflicts between products)
 * ✅ Skin pattern intelligence (Predict breakouts before they happen)
 * ✅ Audit of current products
 * ✅ Predict breakouts before they happen
 * ✅ Pre-access to our skincare products & latest features (business perk)
 */
export async function analyzeImagesGlowPro(
  images: Array<{ data: string; mimeType: string }>,
  answers: Record<string, string[]>
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
  You are an elite AI skin analysis expert and dermatology advisor.
  User provided the following questionnaire responses:
      ${JSON.stringify(answers, null, 2)}

  Analyze these facial images and questionnaires. Provide a COMPREHENSIVE, premium-level analysis:

  **Skin Analysis:**
    1. Skin type detection (oily, dry, combination, normal, sensitive)
    2. Full concern detection with severity tracking: acne, pigmentation, texture, wrinkles, fine lines, dark spots, hyperpigmentation, redness, dehydration, sun damage, under-eye concerns
    3. Severity scoring for each concern (quantified 0-10 scale)
    4. Skin texture quality (poor, fair, good, excellent)
    5. Skin tone evenness
    6. Pore visibility (low, moderate, high)

  **Product Recommendations:**
    - Recommend SPECIFIC real brand products (e.g. "CeraVe Foaming Cleanser", "The Ordinary Niacinamide 10%", "Paula's Choice 2% BHA")
    - Focus on products that work well TOGETHER (no ingredient conflicts)

  **Daily Adaptive Routine:**
    - Provide a full daily routine (morning, afternoon, evening) — NOT just weekly
    - Each step should include the specific product and clear instructions

  **Lifestyle Engine:**
    - Analyze correlations between sleep, diet, stress, hydration, exercise and their skin
    - Give actionable, specific lifestyle recommendations based on their questionnaire answers

  **Product Stack Optimization:**
    - Detect potential conflicts between commonly used products (e.g. retinol + AHA, vitamin C + niacinamide timing)
    - Suggest optimal product layering order

  **Skin Pattern Intelligence:**
    - Based on their current skin state and habits, predict potential future skin issues
    - Provide preventive recommendations

  **Product Audit:**
    - List common product ingredients they should AVOID based on their specific skin conditions
    - Explain why each ingredient is problematic for them

  Return ONLY valid JSON:
  {
    "skinType": "<oily | dry | combination | normal | sensitive>",
    "skinConditions": {
      "acne": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "wrinkles": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "fineLines": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "skinTexture": { "quality": "<poor | fair | good | excellent>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "skinTone": { "evenness": "<uneven | slightly uneven | even>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "darkSpots": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "hyperpigmentation": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "pores": { "visibility": "<low | moderate | high>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "redness": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "dehydration": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "sunDamage": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> },
      "underEye": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> }
    },
    "recommendations": [
      {
        "category": "<e.g. Cleanser, Serum, Moisturizer, Sunscreen>",
        "product": "<specific real brand product name>",
        "reason": "<why this helps>",
        "priority": "low | medium | high"
      }
    ],
    "dailyRoutine": {
      "morning": ["<step 1: specific product + instruction>", "<step 2>", "..."],
      "afternoon": ["<step: e.g. reapply sunscreen, blotting paper>"],
      "evening": ["<step 1: specific product + instruction>", "<step 2>", "..."]
    },
    "lifestyleEngine": {
      "sleep": { "recommendation": "<specific advice>", "skinImpact": "<how it affects their skin>" },
      "diet": { "recommendation": "<specific advice>", "skinImpact": "<how it affects their skin>" },
      "hydration": { "recommendation": "<specific advice>", "skinImpact": "<how it affects their skin>" },
      "stress": { "recommendation": "<specific advice>", "skinImpact": "<how it affects their skin>" },
      "exercise": { "recommendation": "<specific advice>", "skinImpact": "<how it affects their skin>" }
    },
    "productStackOptimization": [
      {
        "conflict": "<e.g. Retinol + AHA/BHA>",
        "explanation": "<why they conflict>",
        "solution": "<how to use them safely, e.g. alternate days>"
      }
    ],
    "skinPatternIntelligence": {
      "predictions": [
        { "concern": "<potential future issue>", "likelihood": "low | medium | high", "preventiveAction": "<what to do now>" }
      ]
    },
    "productAudit": {
      "ingredientsToAvoid": [
        { "ingredient": "<name>", "reason": "<why it's bad for their specific skin>" }
      ]
    },
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
