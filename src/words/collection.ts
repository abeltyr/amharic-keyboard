import { WordsMapping, NumbersArray, NumberMapping } from "../types/shared";
import amEn from "@/words/values/am-en.json";
import enAm from "@/words/values/en-am.json";
import numberValue from "@/words/values/number.json";
import underHundredValue from "@/words/values/underHundred.json";
import overHundredValue from "@/words/values/overHundred.json";

export const words: WordsMapping = enAm;
export const reverseWords: WordsMapping = amEn;
export const numbers: NumbersArray = numberValue;
export const underHundred: NumberMapping = underHundredValue;
export const overHundred: NumberMapping = overHundredValue;
