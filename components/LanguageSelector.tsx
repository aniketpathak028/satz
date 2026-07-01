"use client";

import { Language } from "@/lib/types";

// Structured for easy scaling — add languages here
export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "de", label: "German", nativeLabel: "Deutsch", flag: "🇩🇪" },
  // Future: { code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" },
  // Future: { code: "es", label: "Spanish", nativeLabel: "Español", flag: "🇪🇸" },
  // Future: { code: "ja", label: "Japanese", nativeLabel: "日本語", flag: "🇯🇵" },
];

type Props = {
  value: string;
  onChange: (code: string) => void;
};

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUPPORTED_LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-mono tracking-wide
            border transition-all duration-200
            ${
              value === lang.code
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
            }
          `}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  );
}