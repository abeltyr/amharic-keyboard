/**
 * Checks if a character is a vowel
 * @param char The character to check
 * @returns True if the character is a vowel, false otherwise
 */
export const isVowel = (char: string): boolean => {
  return ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"].includes(char);
};
