import { replaceAbbreviations } from "./replaceAbbreviations";

export function normalizeAddress(input: string): string {
  return replaceAbbreviations(
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  );
}
