"use client";

type Props = {
  sentence: string;
};

export default function SentenceCard({ sentence }: Props) {
  return (
    <div className="py-10 border-y border-zinc-800">
      <p className="text-3xl sm:text-4xl font-serif text-white leading-snug tracking-tight">
        {sentence}
      </p>
    </div>
  );
}