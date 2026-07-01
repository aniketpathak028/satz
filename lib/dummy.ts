import { CEFRLevel, GeneratedSentence } from "./types";

const DUMMY_SENTENCES: Record<CEFRLevel, GeneratedSentence[]> = {
  A1: [
    { english: "I drink coffee every morning.", translation: "Ich trinke jeden Morgen Kaffee.", notes: "'Jeden' is accusative masculine — 'every' changes by case." },
    { english: "The cat is sleeping.", translation: "Die Katze schläft." },
    { english: "Where is the train station?", translation: "Wo ist der Bahnhof?" },
    { english: "I am from Germany.", translation: "Ich komme aus Deutschland.", notes: "Use 'kommen aus' (come from) rather than 'sein aus' to say where you're from." },
  ],
  A2: [
    { english: "I went to the supermarket yesterday.", translation: "Ich bin gestern in den Supermarkt gegangen.", notes: "Movement verbs like 'gehen' take 'sein', not 'haben', in perfect tense." },
    { english: "Can you help me, please?", translation: "Kannst du mir bitte helfen?", notes: "'Helfen' takes dative — 'mir' not 'mich'." },
    { english: "The weather is nice today.", translation: "Das Wetter ist heute schön." },
    { english: "I would like a glass of water.", translation: "Ich hätte gerne ein Glas Wasser.", notes: "'Hätte gerne' is the polite way to order or request something." },
  ],
  B1: [
    { english: "I have been living in Berlin for three years.", translation: "Ich wohne seit drei Jahren in Berlin.", notes: "German uses present tense with 'seit' for ongoing actions — not perfect tense like English." },
    { english: "Although it was raining, we went for a walk.", translation: "Obwohl es regnete, sind wir spazieren gegangen.", notes: "'Obwohl' (although) sends the verb to the end of its clause." },
    { english: "Could you explain that again more slowly?", translation: "Könnten Sie das bitte noch einmal langsamer erklären?" },
  ],
  B2: [
    { english: "If I had more time, I would learn to play the piano.", translation: "Wenn ich mehr Zeit hätte, würde ich Klavier spielen lernen.", notes: "Konjunktiv II: 'hätte' + 'würde + infinitive' for hypothetical conditionals." },
    { english: "The meeting was postponed due to unforeseen circumstances.", translation: "Das Meeting wurde aufgrund unvorhergesehener Umstände verschoben.", notes: "'Aufgrund' takes the genitive case." },
    { english: "She insisted that he apologise immediately.", translation: "Sie bestand darauf, dass er sich sofort entschuldigt.", notes: "Verbs after 'dass' go to the end of the clause." },
  ],
  C1: [
    { english: "The proposal was met with considerable skepticism by the board.", translation: "Der Vorschlag stieß beim Vorstand auf erhebliche Skepsis.", notes: "'Auf etwas stoßen' is an idiomatic way to express encountering a reaction." },
    { english: "Notwithstanding the risks, she proceeded with the plan.", translation: "Ungeachtet der Risiken setzte sie den Plan um.", notes: "'Ungeachtet' is formal/literary and takes the genitive." },
    { english: "He couldn't help but notice the irony of the situation.", translation: "Er konnte die Ironie der Situation nicht übersehen." },
  ],
  C2: [
    { english: "The legislation's ambiguity renders its enforcement virtually impossible.", translation: "Die Mehrdeutigkeit der Gesetzgebung macht ihre Durchsetzung nahezu unmöglich." },
    { english: "Her prose is suffused with a melancholy that defies easy categorisation.", translation: "Ihre Prosa ist von einer Melancholie durchdrungen, die sich einer einfachen Einordnung entzieht.", notes: "'Sich entziehen' + dative: to elude or resist something." },
    { english: "The ramifications of this precedent remain to be seen.", translation: "Die Tragweite dieses Präzedenzfalls bleibt abzuwarten." },
  ],
};

/** Returns a random dummy sentence for the given level. */
export function getDummySentence(level: CEFRLevel): GeneratedSentence {
  const pool = DUMMY_SENTENCES[level];
  return pool[Math.floor(Math.random() * pool.length)];
}