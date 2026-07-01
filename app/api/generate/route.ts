import { NextRequest, NextResponse } from "next/server";
import { buildSentencePrompt } from "@/lib/prompts";
import { getDummySentence } from "@/lib/dummy";
import { CEFRLevel, GenerateRequest, GenerateResponse, GeneratedSentence } from "@/lib/types";

const VALID_LEVELS: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const USE_DUMMY = !process.env.ANTHROPIC_API_KEY;

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
    if (USE_DUMMY) {
      // Small artificial delay so the loading state is visible
      await new Promise((r) => setTimeout(r, 600));
      return NextResponse.json<GenerateResponse>({
        success: true,
        data: getDummySentence(level),
      });
    }

    // ── Live mode ────────────────────────────────────────────────────────────
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [{ role: "user", content: buildSentencePrompt(language, level) }],
    });

    const rawText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const clean = rawText.replace(/```json|```/g, "").trim();
    const parsed: GeneratedSentence = JSON.parse(clean);

    if (!parsed.english || !parsed.translation) {
      throw new Error("Incomplete response from model.");
    }

    return NextResponse.json<GenerateResponse>({ success: true, data: parsed });
  } catch (err) {
    console.error("[/api/generate] Error:", err);
    return NextResponse.json<GenerateResponse>(
      { success: false, error: "Failed to generate sentence. Please try again." },
      { status: 500 }
    );
  }
}