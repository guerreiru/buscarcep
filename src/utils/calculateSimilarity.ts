export function calculateSimilarity(str1: string, str2: string) {
  const normalizedStr1 = str1.toLowerCase();
  const normalizedStr2 = str2.toLowerCase();

  let matches = 0;
  const length = Math.max(normalizedStr1.length, normalizedStr2.length);

  for (let i = 0; i < length; i++) {
    if (normalizedStr1[i] === normalizedStr2[i]) {
      matches++;
    }
  }

  return matches / length;
}
