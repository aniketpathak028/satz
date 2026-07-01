"use client";

import { GeneratedSentence } from "@/lib/types";

type Props = {
  data: GeneratedSentence;
  visible: boolean;
};

export default function TranslationReveal({ data, visible }: Props) {
  if (!visible) return null;

  return (
    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <p className="text-2xl sm:text-3xl font-serif text-emerald-400 leading-snug tracking-tight">
        {data.translation}
      </p>
      {data.notes && (
        <p className="text-sm font-mono text-zinc-500 border-l-2 border-zinc-700 pl-3">
          {data.notes}
        </p>
      )}
    </div>
  );
}