import { NextRequest, NextResponse } from "next/server";
import { buildSentencePrompt } from "@/lib/prompts";
import { getDummySentence } from "@/lib/dummy";
import { CEFRLevel, GenerateRequest, GenerateResponse, GeneratedSentence } from "@/lib/types";
import { GoogleGenAI } from "@google/genai";

const VALID_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

// Fallback to dummy if the Gemini key is missing
const USE_DUMMY = !process.env.GEMINI_API_KEY;

// Initialize the Gemini client if the key is present
const ai = !USE_DUMMY ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }) : null;

export async function POST(req: NextRequest) {
  try {
    const body: GenerateRequest = await req.json();
    const { language, level } = body;

    if (!language || !VALID_LEVELS.includes(level)) {
      return NextResponse.json<GenerateResponse>(
        { success: false, error: "Invalid language or level." },
        { status: 400 }
      );
    }

    // ── Dummy mode (no API key set yet) ─────────────────────────────────────
    if (USE_DUMMY || !ai) {
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json<GenerateResponse>({
        success: true,
        data: getDummySentence(level),
      });
    }

    // ── Live mode (Gemini) ──────────────────────────────────────────────────
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: buildSentencePrompt(language, level),
      config: {
        // This forces Gemini to respond with clean, parseable JSON data directly
        responseMimeType: "application/json",
      },
    });

    const rawText = response.text;
    if (!rawText) {
      throw new Error("No response returned from the AI model.");
    }

    const parsed: GeneratedSentence = JSON.parse(rawText);

    if (!parsed.english || !parsed.translation) {
      throw new Error("Incomplete response structure from model.");
    }

    return NextResponse.json<GenerateResponse>({ 
      success: true, 
      data: parsed 
    });

  } catch (err) {
    console.error("[/api/generate] Error:", err);
    return NextResponse.json<GenerateResponse>(
      { success: false, error: "Failed to generate sentence. Please try again." },
      { status: 500 }
    );
  }
}