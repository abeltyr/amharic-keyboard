import { isVowel } from "./isVowel";
import { translateNumberToAmharic } from "./numberToAmharic";
import { words } from "@/words/collection";

/**
 * Translates English text to Amharic using the mapping in final.ts
 * @param text The English text to translate
 * @returns An object containing both the original English text and its Amharic translation
 */
export function translateToAmharic(text: string): { en: string; am: string } {
  if (!text) {
    return { en: "", am: "" };
  }

  let i = 0;
  let amharicLetter = "";

  while (i < text.length) {
    // Check for special letters (longer combinations first)

    const numberRegex = /^\d+/;
    const match = text.substring(i).match(numberRegex);
    let fetchingLetter = text[i];

    if (match) {
      const numStr = match[0];
      const num = parseInt(numStr, 10);
      const val = translateNumberToAmharic(num);
      i += numStr.length;
      amharicLetter += val;
    } else if (i > 0 && isVowel(text[i])) {
      // Try combinations of up to 4 preceding consonants with the current vowel
      for (let depth = 2; depth >= 0; depth--) {
        if (
          depth === 2 &&
          text[i - 1] &&
          text[i - 2] &&
          text[i - 3] &&
          !isVowel(text[i - 1]) &&
          !isVowel(text[i - 2]) &&
          !isVowel(text[i - 3])
        ) {
          fetchingLetter = text[i - 3] + text[i - 2] + text[i - 1] + text[i];
          amharicLetter = amharicLetter.slice(0, i - 3) + words[fetchingLetter];
          break;
        }

        if (
          depth === 1 &&
          text[i - 1] &&
          text[i - 2] &&
          !isVowel(text[i - 1]) &&
          !isVowel(text[i - 2])
        ) {
          fetchingLetter = text[i - 2] + text[i - 1] + text[i];
          amharicLetter = amharicLetter.slice(0, i - 2) + words[fetchingLetter];
          break;
        }

        if (depth === 0 && text[i - 1] && !isVowel(text[i - 1])) {
          fetchingLetter = text[i - 1] + text[i];
          amharicLetter = amharicLetter.slice(0, i - 1) + words[fetchingLetter];
          break;
        }

        amharicLetter += words[fetchingLetter];
      }
    } else if (" " === fetchingLetter) {
      amharicLetter += " ";
    } else {
      const data = words[fetchingLetter];
      if (data) amharicLetter += data;
    }
    i++;
  }
  return {
    en: text,
    am: amharicLetter,
  };
}
