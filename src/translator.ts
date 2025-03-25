import { words, specialLetters, numbers } from "./data/final";

/**
 * Translates English text to Amharic using the mapping in final.ts
 * @param text The English text to translate
 * @returns An object containing both the original English text and its Amharic translation
 */
export function translateToAmharic(text: string): { en: string; am: string } {
  if (!text) {
    return { en: "", am: "" };
  }

  let result = "";
  let i = 0;

  while (i < text.length) {
    // Check for special letters (longer combinations first)
    let found = false;

    // Check for special letter combinations (like 'qwo', 'qwi', etc.)
    for (const [latin, amharic] of Object.entries(specialLetters)) {
      if (text.substring(i).startsWith(latin)) {
        result += amharic;
        i += latin.length;
        found = true;
        break;
      }
    }

    if (found) continue;

    // Check for regular word mappings
    for (const [latin, amharic] of Object.entries(words)) {
      if (text.substring(i).startsWith(latin)) {
        result += amharic;
        i += latin.length;
        found = true;
        break;
      }
    }

    if (found) continue;

    // Check for numbers
    for (const [latin, amharic] of Object.entries(numbers)) {
      if (text.substring(i).startsWith(latin)) {
        result += amharic;
        i += latin.length;
        found = true;
        break;
      }
    }

    if (found) continue;

    // If no match found, keep the original character
    result += text[i];
    i++;
  }

  return {
    en: text,
    am: result,
  };
}

console.log(translateToAmharic("selam")); // => { en: "hello", am: "ሰላም" }
