import { CEFRLevel } from "./types";

const LEVEL_DESCRIPTIONS: Record<CEFRLevel, string> = {
  A1: "absolute beginner — present tense, simple vocabulary (greetings, numbers, family, food), very short sentences (3–6 words)",
  A2: "elementary — past/future tense, common everyday topics (shopping, directions, weather), sentences of 6–10 words",
  B1: "intermediate — opinions, plans, experiences, slightly complex structures, 8–14 words",
  B2: "upper intermediate — abstract topics, nuanced vocabulary, subordinate clauses, 10–18 words",
  C1: "advanced — idiomatic expressions, complex grammar, professional/academic topics, 12–22 words",
  C2: "mastery — sophisticated register, rare vocabulary, literary or technical language, any length",
};

export function buildSentencePrompt(language: string, level: CEFRLevel): string {
  return `You are a language learning assistant specializing in teaching ${language} through sentence translation.

Generate ONE English sentence appropriate for a ${level} ${language} learner (${LEVEL_DESCRIPTIONS[level]}).

The sentence should:
- Be natural and useful in real conversation
- Match the vocabulary and grammar complexity of the level exactly
- Cover varied everyday topics (don't repeat topics if possible)

Respond ONLY with a valid JSON object — no markdown, no explanation, no extra text:
{
  "english": "<the English sentence>",
  "translation": "<the ${language} translation>",
  "notes": "<one short, useful grammar or usage note in English, max 15 words — or null if not needed>"
}`;
}