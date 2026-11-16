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
/** A deadline counts as passed after the end of its calendar day (local time). */
export function deadlineStatus(isoDate: string, today: Date): "upcoming" | "passed" {
  const [y, m, d] = isoDate.split("-").map(Number);
  return today.getTime() > new Date(y, m - 1, d, 23, 59, 59).getTime() ? "passed" : "upcoming";
}
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
