import { isVowel } from "./isVowel";
import { translateNumberToAmharic } from "./numberToAmharic";
import { words, reverseWords } from "@/words/collection";

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
  let amharicLetterCount = 0;
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
      for (let depth = 3; depth >= 0; depth--) {
        if (
          depth === 3 &&
          text[i - 1] != " " &&
          text[i - 2] != " " &&
          text[i - 3] != " " &&
          text[i - 1] &&
          text[i - 2] &&
          text[i - 3] &&
          !isVowel(text[i - 1]) &&
          !isVowel(text[i - 2]) &&
          !isVowel(text[i - 3])
        ) {
          let fetchingLetter =
            text[i - 3] + text[i - 2] + text[i - 1] + text[i];
          const valueData = words[fetchingLetter];
          if (valueData) {
            amharicLetter =
              amharicLetter.slice(0, amharicLetterCount - 3) + valueData;
            break;
          }
        }

        if (
          depth === 2 &&
          text[i - 1] &&
          text[i - 2] &&
          text[i - 1] != " " &&
          text[i - 2] != " " &&
          !isVowel(text[i - 1]) &&
          !isVowel(text[i - 2])
        ) {
          let fetchingLetter = text[i - 2] + text[i - 1] + text[i];
          const valueData = words[fetchingLetter];
          if (valueData) {
            amharicLetter =
              amharicLetter.slice(0, amharicLetterCount - 2) + valueData;
            break;
          }
        }

        if (
          depth === 1 &&
          text[i - 1] &&
          text[i - 1] != " " &&
          !isVowel(text[i - 1])
        ) {
          let fetchingLetter = text[i - 1] + text[i];
          const valueData = words[fetchingLetter];

          if (valueData) {
            amharicLetter =
              amharicLetter.slice(0, amharicLetterCount - 1) + valueData;
            break;
          }
        }

        if (depth === 0) {
          const valueData = words[fetchingLetter];
          if (valueData) {
            amharicLetter += valueData;
            break;
          }
        }
      }
    } else if (" " === fetchingLetter) {
      amharicLetter += " ";
    } else {
      const data = words[fetchingLetter];
      if (data) amharicLetter += data;
    }

    amharicLetterCount = amharicLetter.length;
    i++;
  }
  return {
    en: text,
    am: amharicLetter,
  };
}

/**
 * Translates Amharic text to English using the reverseWords mapping
 * @param text The Amharic text to translate
 * @returns An object containing both the original Amharic text and its English translation
 */
export function translateToEnglish(text: string): { am: string; en: string } {
  if (!text) {
    return { am: "", en: "" };
  }

  let englishText = "";

  for (let i = 0; i < text.length; i++) {
    const amharicChar = text[i];
    const englishChar = reverseWords[amharicChar];
    if (englishChar) {
      englishText += englishChar;
    } else {
      englishText += amharicChar; // If no mapping found, keep the original character
    }
  }

  return {
    am: text,
    en: englishText,
  };
}
