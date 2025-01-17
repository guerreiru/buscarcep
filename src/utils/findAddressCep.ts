import Fuse from "fuse.js";
import { streets } from "./streets";
import { normalizeAddress } from "./normalizeString";

const fuse = new Fuse(streets, {
  keys: ["name"],
  threshold: 0.4,
});

export function findAddressCep(address: string): string {
  const normalizedQuery = normalizeAddress(address);
  const results = fuse.search(normalizedQuery);

  if (results.length > 0) {
    return results[0].item.name;
  }

  return normalizedQuery;
}
