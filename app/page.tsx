"use client";

import { useState } from "react";
import LanguageSelector, { SUPPORTED_LANGUAGES } from "@/components/LanguageSelector";
import LevelSelector from "@/components/LevelSelector";
import SentenceCard from "@/components/SentenceCard";
import TranslationReveal from "@/components/TranslationReveal";
import { CEFRLevel, GeneratedSentence, GenerateResponse } from "@/lib/types";

type AppState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "prompt"; data: GeneratedSentence }
  | { phase: "revealed"; data: GeneratedSentence }
  | { phase: "error"; message: string };

export default function Home() {
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0].code);
  const [level, setLevel] = useState<CEFRLevel>("A2");
  const [state, setState] = useState<AppState>({ phase: "idle" });

  async function handleGenerate() {
    setState({ phase: "loading" });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, level }),
      });

      const json: GenerateResponse = await res.json();

      if (json.success) {
        setState({ phase: "prompt", data: json.data });
      } else {
        setState({ phase: "error", message: json.error });
      }
    } catch {
      setState({ phase: "error", message: "Network error. Please try again." });
    }
  }

  function handleReveal() {
    if (state.phase === "prompt") {
      setState({ phase: "revealed", data: state.data });
    }
  }

  const isLoading = state.phase === "loading";
  const hasPrompt = state.phase === "prompt" || state.phase === "revealed";

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-sm tracking-widest text-zinc-400 uppercase">
          Satz
        </span>
        <span className="font-mono text-xs text-zinc-600 hidden sm:block">
          Learn by sentences
        </span>
      </header>

      {/* Main content */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-6 py-12 flex flex-col gap-10">

        {/* Controls */}
        <section className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Language
            </label>
            <LanguageSelector value={language} onChange={setLanguage} />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
              Level
            </label>
            <LevelSelector value={level} onChange={setLevel} />
          </div>
        </section>

        {/* Generate button */}
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="
            self-start px-6 py-3 font-mono text-sm tracking-widest uppercase
            bg-white text-black rounded-sm
            hover:bg-zinc-200 active:scale-95
            transition-all duration-150
            disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
          "
        >
          {isLoading ? "Generating…" : "Generate"}
        </button>

        {/* Sentence area */}
        {hasPrompt && (
          <section className="space-y-6">
            <SentenceCard sentence={(state as { data: GeneratedSentence }).data.english} />

            {state.phase === "prompt" && (
              <button
                onClick={handleReveal}
                className="
                  font-mono text-sm tracking-widest uppercase text-zinc-400
                  border border-zinc-700 px-5 py-2.5 rounded-sm
                  hover:border-zinc-400 hover:text-zinc-200
                  transition-all duration-150 active:scale-95
                "
              >
                Reveal Translation
              </button>
            )}

            {state.phase === "revealed" && (
              <TranslationReveal
                data={(state as { data: GeneratedSentence }).data}
                visible={true}
              />
            )}
          </section>
        )}

        {/* Error */}
        {state.phase === "error" && (
          <p className="font-mono text-sm text-red-400">{state.message}</p>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-4">
        <p className="font-mono text-xs text-zinc-700 text-center">
           Built for real language learning
        </p>
      </footer>
    </main>
  );
}