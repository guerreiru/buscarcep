export function sanitizeAddress(address: string): string {
  return address
    .replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ0-9 ]/g, "")
    .toLowerCase()
    .trim();
}
