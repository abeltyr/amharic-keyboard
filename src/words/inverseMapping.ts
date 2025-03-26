import { WordsMapping } from "@/types/shared";
import { words } from "./collection";

// Create inverse mapping where Amharic characters are keys and Latin transliterations are values
export const inverseWords: WordsMapping = Object.entries(words).reduce(
  (acc, [latinKey, amharicValue]) => {
    acc[amharicValue] = latinKey;
    return acc;
  },
  {} as WordsMapping,
);
