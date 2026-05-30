import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

/**
 * Glow tier analysis ($14.99/month) — features:
 *
 * ✅ 3x skin analysis per week
 * ✅ Full concern detection (acne, pigmentation, texture, etc.)
 * ✅ Severity scoring (quantified tracking)
 * ✅ Real product recommendations (not generic)
 * ✅ Weekly progress tracking (photo + AI comparison)
 * ✅ Guided weekly routine (AI-assisted)
 * ✅ Basic lifestyle suggestions
 *
 * ❌ Routine compliance tracking           → Glow Pro only
 * ❌ Audit of your current products        → Glow Pro only
 * ❌ Pre-access to latest features         → Glow Pro only
 */
export async function analyzeImagesGlow(
  images: Array<{ data: string; mimeType: string }>,
  answers: Record<string, string[]>
) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `
  You are an AI skin analysis expert.
  User provided the following questionnaire responses:
      ${JSON.stringify(answers, null, 2)}

  Analyze these facial images and questionnaires. Provide a DETAILED analysis covering:

  **1. Full Concern Detection:**
    - Skin type detection (oily, dry, combination, normal, sensitive)
    - Detect ALL of these concerns: acne, pigmentation, texture, wrinkles, fine lines, dark spots, hyperpigmentation, redness, dehydration
    - Skin texture quality (poor, fair, good, excellent)
    - Skin tone evenness
    - Pore visibility (low, moderate, high)

  **2. Severity Scoring (Quantified Tracking):**
    - Assign each detected concern a severity score from 0-10
    - This allows the user to track improvements week-over-week

  **3. Real Product Recommendations (Not Generic):**
    - Recommend SPECIFIC real brand products (e.g. "CeraVe Foaming Cleanser", "The Ordinary Niacinamide 10%", "La Roche-Posay Effaclar Duo")
    - Do NOT give generic category-only suggestions — always name the real product

  **4. Weekly Progress Tracking (Photo + AI Comparison):**
    - Provide a progress summary that compares the current skin state to what a typical user with these conditions would see over 2-4 weeks of consistent care
    - Highlight which areas are likely improving, stable, or need attention
    - Give a brief "focus this week" action item

  **5. Guided Weekly Routine (AI-Assisted):**
    - Provide a full weekly skincare routine with morning and evening steps
    - Each step should include the specific product name and clear instructions
    - This is a weekly guide, not a daily adaptive routine (daily adaptive is Glow Pro only)

  **6. Basic Lifestyle Suggestions:**
    - Provide 3-5 actionable lifestyle tips that impact skin health (hydration, sleep, diet, etc.)
    - Keep these basic and general — detailed lifestyle engine analysis is Glow Pro only

  IMPORTANT: Do NOT include any of the following (these are Glow Pro exclusive):
    - Routine compliance tracking
    - Product audit / ingredient conflict detection
    - Product stack optimization
    - Skin pattern intelligence / breakout prediction
    - Daily adaptive routines (morning/afternoon/evening)

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
      "dehydration": { "severity": "<none | mild | moderate | severe>", "severityScore": <number 0-10>, "confidence": <number 0-1> }
    },
    "recommendations": [
      {
        "category": "<e.g. Cleanser, Serum, Moisturizer, Sunscreen>",
        "product": "<specific real brand product name>",
        "reason": "<why this helps>",
        "priority": "low | medium | high"
      }
    ],
    "weeklyProgressTracking": {
      "currentState": "<brief summary of current skin condition>",
      "areasImproving": ["<concern likely to improve with recommended routine>"],
      "areasNeedingAttention": ["<concern that needs focused care>"],
      "focusThisWeek": "<one key action to prioritize this week>"
    },
    "weeklyRoutine": {
      "morning": ["<step 1: specific product + instruction>", "<step 2>", "..."],
      "evening": ["<step 1: specific product + instruction>", "<step 2>", "..."]
    },
    "lifestyleSuggestions": ["<actionable tip 1>", "<actionable tip 2>", "<actionable tip 3>"],
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
