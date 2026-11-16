export type Split = { deductiblePart: number; coinsurancePart: number; you: number; plan: number; capped: boolean };
/** Illustrative split of one covered allowed amount, assuming nothing has been paid toward the deductible yet this year. */
export function splitCost(allowed: number, deductible: number, coinsurance: number, oopMax: number): Split {
  const a = Math.max(0, allowed);
  const deductiblePart = Math.min(a, deductible);
  let coinsurancePart = (a - deductiblePart) * coinsurance;
  let capped = false;
  if (deductiblePart + coinsurancePart > oopMax) { coinsurancePart = Math.max(0, oopMax - deductiblePart); capped = true; }
  const you = Math.round((deductiblePart + coinsurancePart) * 100) / 100;
  return { deductiblePart, coinsurancePart: Math.round(coinsurancePart * 100) / 100, you, plan: Math.round((a - you) * 100) / 100, capped };
}
export function parseISO(iso: string): [number, number, number] {
  const [y = 0, m = 1, d = 1] = iso.split("-").map(Number);
  return [y, m, d];
}
/** A deadline counts as passed after the end of its calendar day (local time). */
export function deadlineStatus(isoDate: string, today: Date): "upcoming" | "passed" {
  const [y, m, d] = parseISO(isoDate);
  return today.getTime() >= new Date(y, m - 1, d + 1).getTime() ? "passed" : "upcoming";
}
export function millisecondsUntilNextDay(now: Date): number {
  return Math.max(1, new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime());
}
export function formatDate(iso: string, locale = "en-US") {
  const [y, m, d] = parseISO(iso);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "en" ? "en-US" : locale, { month: "long", day: "numeric", year: "numeric" });
}
