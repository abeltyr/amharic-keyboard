import { words, numbers, underHundred, overHundred } from "./data/final";

/**
 * Translates a number to Amharic format
 * @param num The number to translate
 * @returns The Amharic representation of the number
 */
function translateNumberToAmharic(num: number): string {
  if (num === 0) return "0";

  // Handle numbers 1-9
  if (num < 10) {
    const data: string = numbers[num - 1] as string;
    return data;
  }

  // Handle numbers 10-99
  if (num < 100) {
    const tens = Math.floor(num / 10) * 10;
    const ones = num % 10;

    if (ones === 0) {
      return underHundred[tens];
    } else {
      return underHundred[tens] + numbers[ones - 1];
    }
  }

  // Handle numbers 100-999
  if (num < 1000) {
    const hundreds = Math.floor(num / 100);
    const remainder = num % 100;

    let result =
      hundreds === 1
        ? overHundred[100]
        : numbers[hundreds - 1] + overHundred[100];

    if (remainder > 0) {
      result += translateNumberToAmharic(remainder);
    }

    return result;
  }

  // Handle numbers 1000-9999
  if (num < 10000) {
    const thousands = Math.floor(num / 1000);
    const remainder = num % 1000;

    let result =
      thousands === 1
        ? overHundred[1000]
        : numbers[thousands - 1] + overHundred[1000];

    if (remainder > 0) {
      result += translateNumberToAmharic(remainder);
    }

    return result;
  }

  // Handle numbers 10000 and above
  if (num < 100000) {
    const tenThousands = Math.floor(num / 10000);
    const remainder = num % 10000;

    let result =
      tenThousands === 1
        ? overHundred[10000]
        : numbers[tenThousands - 1] + overHundred[10000];

    if (remainder > 0) {
      result += translateNumberToAmharic(remainder);
    }

    return result;
  }

  if (num)
    // For larger numbers, return as is
    return num.toString();
  else {
    return "";
  }
}

/**
 * Checks if a character is a vowel
 * @param char The character to check
 * @returns True if the character is a vowel, false otherwise
 */
function isVowel(char: string): boolean {
  return ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(char);
}

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

console.log(translateToAmharic("abEl 2"));
