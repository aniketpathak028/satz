// gemini.ts
import { GoogleGenAI } from "@google/genai";

// Initializes the client. It automatically picks up process.env.GEMINI_API_KEY
// Provide the API key from environment; GoogleGenAI expects a config object with the key
export const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });