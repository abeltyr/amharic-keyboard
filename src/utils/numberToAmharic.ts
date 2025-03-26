import { numbers, overHundred, underHundred } from "@/words/collection";

/**
 * Translates a number to Amharic format
 * @param num The number to translate
 * @returns The Amharic representation of the number
 */
export const translateNumberToAmharic = (num: number): string => {
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
};
