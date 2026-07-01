# Satz

> Learn a language by translating sentences — not memorizing grammar tables.

Satz generates real, level-appropriate sentences in English and challenges you to translate them mentally before revealing the answer. Built with Next.js, Tailwind CSS, and Claude.

## Stack

- **Next.js 15** (App Router)
- **Tailwind CSS v4**
- **Anthropic SDK** (Claude for sentence generation)
- **TypeScript** throughout

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.local.example .env.local
# → Add your ANTHROPIC_API_KEY from https://console.anthropic.com

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Then add your environment variable in the Vercel dashboard:
- `ANTHROPIC_API_KEY` → your key from console.anthropic.com

Or use the Vercel UI: **Project → Settings → Environment Variables**.

## Extending

### Add a new language
In `components/LanguageSelector.tsx`, uncomment or add to `SUPPORTED_LANGUAGES`:
```ts
{ code: "fr", label: "French", nativeLabel: "Français", flag: "🇫🇷" }
```
That's it — the prompt system picks it up automatically.

### Adjust level descriptions
Edit `lib/prompts.ts` → `LEVEL_DESCRIPTIONS` to tune how Claude calibrates each CEFR level.

### Add sentence history
Wire up a `useState<GeneratedSentence[]>` in `page.tsx` and push each result — the types are already structured for this.

### Add a user account layer
The API route is stateless — drop in NextAuth or Clerk for auth, and persist history to a database (e.g. Supabase, PlanetScale) keyed by user ID.

## Project Structure

```
app/
  api/generate/route.ts   ← API: calls Claude, returns sentence JSON
  layout.tsx              ← Fonts, metadata
  page.tsx                ← Main UI
  globals.css             ← Tailwind + animation utilities
components/
  LanguageSelector.tsx    ← Language picker (scalable)
  LevelSelector.tsx       ← CEFR level picker
  SentenceCard.tsx        ← Displays the English sentence
  TranslationReveal.tsx   ← Reveals translation on demand
lib/
  anthropic.ts            ← Anthropic client singleton
  prompts.ts              ← Prompt templates (one place to edit)
  types.ts                ← Shared TypeScript types
```