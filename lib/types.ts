export type Language = {
  code: string;
  label: string;
  nativeLabel: string;
  flag: string;
};

export type CEFRLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type GeneratedSentence = {
  english: string;
  translation: string;
  transliteration?: string; // useful for non-latin scripts later
  notes?: string;           // grammar tip, cultural note, etc.
};

export type GenerateRequest = {
  language: string;
  level: CEFRLevel;
};

export type GenerateResponse =
  | { success: true; data: GeneratedSentence }
  | { success: false; error: string };