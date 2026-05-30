import { GoogleGenerativeAI } from "@google/generative-ai";

import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function analyzeImages(
  images: Array<{ data: string; mimeType: string }>,
  answers: Record<number, string[]>
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Use the correct model name
    // model: "gemini-3.1-pro-preview",
  });

  const prompt = `
  You are an AI skin analysis expert, 
  User provided the following questionnaire responses:
      ${JSON.stringify(answers, null, 2)}

  Analyze these facial images and questionnaires for skin conditions. Provide a detailed analysis including:

    1. Acne severity (none, mild, moderate, severe)
    2. Signs of aging (wrinkles, fine lines)
    3. Skin texture quality (poor, fair, good, excellent)
    4. Skin tone evenness
    5. Dark spots and hyperpigmentation
    6. Pore visibility (low, moderate, high)

    Return ONLY valid JSON in the following format, with no extra text:

    {
      "skinConditions": {
        "acne": { "severity": "<string>", "confidence": <number 0-1> },
        "wrinkles": { "severity": "<string>", "confidence": <number 0-1> },
        "fineLines": { "severity": "<string>", "confidence": <number 0-1> },
        "skinTexture": { "quality": "<string>", "confidence": <number 0-1> },
        "skinTone": { "evenness": "<string>", "confidence": <number 0-1> },
        "darkSpots": { "severity": "<string>", "confidence": <number 0-1> },
        "hyperpigmentation": { "severity": "<string>", "confidence": <number 0-1> },
        "pores": { "visibility": "<string>", "confidence": <number 0-1> }
      },
      "recommendations": [
        {
          "category": "<string>",
          "product": "<string>",
          "reason": "<string>",
          "priority": "low | medium | high"
        }
      ],
      "overallScore": <number 0-100>
    }`;

  try {
    // Convert input images into Gemini-compatible inline parts
    const imageParts = images.map((img) => ({
      inlineData: {
        data: img.data,
        mimeType: img.mimeType,
      },
    }));

    // Send prompt + images to Gemini
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    let text = response.text();

    // Sometimes Gemini may wrap JSON in markdown ```json blocks — strip them
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsedResult = JSON.parse(text);

    // Validate the response has the expected structure
    if (
      !parsedResult.skinConditions ||
      !parsedResult.recommendations ||
      !parsedResult.overallScore
    ) {
      throw new Error("Invalid response structure from Gemini");
    }

    return parsedResult;
  } catch (err) {
    console.error("Gemini analysis error:", err);
    throw new Error(
      `Analysis failed: ${err instanceof Error ? err.message : "Unknown error"}`
    );
  }
}