import { abbreviations } from "./abbreviations";

export function replaceAbbreviations(input: string): string {
  return input
    .toLowerCase()
    .replace(/\b\w+\b/g, (word) => abbreviations[word] || word);
}
