import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Lora } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Satz — Learn by Sentences",
  description:
    "Skip grammar tables. Learn a language the way you learned your first one — through real sentences.",
  openGraph: {
    title: "Satz",
    description: "Learn languages through sentence translation, not grammar rules.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lora.variable} ${GeistMono.variable}`}>
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}