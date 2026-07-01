"use client";

import { CEFRLevel } from "@/lib/types";

const LEVELS: { value: CEFRLevel; description: string }[] = [
  { value: "A1", description: "Beginner" },
  { value: "A2", description: "Elementary" },
  { value: "B1", description: "Intermediate" },
  { value: "B2", description: "Upper Intermediate" },
  { value: "C1", description: "Advanced" },
  { value: "C2", description: "Mastery" },
];

type Props = {
  value: CEFRLevel;
  onChange: (level: CEFRLevel) => void;
};

export default function LevelSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {LEVELS.map((lvl) => (
        <button
          key={lvl.value}
          onClick={() => onChange(lvl.value)}
          title={lvl.description}
          className={`
            px-3 py-1.5 rounded-sm text-sm font-mono tracking-widest
            border transition-all duration-200
            ${
              value === lvl.value
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
            }
          `}
        >
          {lvl.value}
        </button>
      ))}
    </div>
  );
}