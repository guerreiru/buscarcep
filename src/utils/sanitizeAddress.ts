import { abbreviations } from "./abbreviations";

export function sanitizeAddress(address: string): string {
  const words = address.toLowerCase().replace(/[,]/, "").split(" ");

  const abbreviationsExpanded = words
    .map((word) => abbreviations[word] || word)
    .join(" ");

  return abbreviationsExpanded.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]/g, "").trim();
}

export function addressWithOutHouseNumber(address: string): string {
  return address.replace(/\d+$/, "").trim();
}
