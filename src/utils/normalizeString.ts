import { replaceAbbreviations } from "./replaceAbbreviations";

const addressStopWords = [
  "rua",
  "travessa",
  "avenida",
  "estrada",
  "alameda",
  "largo",
  "rodovia",
  "praça",
];

export function normalizeAddress(input: string): string {
  const cleaned = input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const withoutStopWords = cleaned
    .split(" ")
    .filter((word) => !addressStopWords.includes(word))
    .join(" ");

  return replaceAbbreviations(withoutStopWords);
}
