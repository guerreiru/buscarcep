export function addressWithOutHouseNumber(address: string): string {
  return address.replace(/\d+$/, "").trim();
}
