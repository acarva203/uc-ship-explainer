import { describe, it, expect } from "vitest";
import { splitCost, deadlineStatus } from "@/lib/ship-math";
import { PREMIUMS } from "@/data/ucship";

describe("cost illustration", () => {
  it("$2,000 with $250 deductible and 20%: you pay $600", () => {
    const s = splitCost(2000, 250, 0.2, 4500);
    expect(s.deductiblePart).toBe(250); expect(s.coinsurancePart).toBe(350); expect(s.you).toBe(600); expect(s.plan).toBe(1400);
  });
  it("small bill under the deductible is all yours", () => { expect(splitCost(180, 250, 0.2, 4500).you).toBe(180); });
  it("caps at the $4,500 out-of-pocket max", () => {
    const s = splitCost(40000, 250, 0.2, 4500); expect(s.you).toBe(4500); expect(s.capped).toBe(true); expect(s.plan).toBe(35500);
  });
});
describe("deadlines", () => {
  it("Sept 1 2026 has passed by Nov 16 2026", () => expect(deadlineStatus("2026-09-01", new Date(2026, 10, 16))).toBe("passed"));
  it("Dec 1 2026 is upcoming on Nov 16 2026", () => expect(deadlineStatus("2026-12-01", new Date(2026, 10, 16))).toBe("upcoming"));
  it("deadline day itself is still upcoming", () => expect(deadlineStatus("2026-12-01", new Date(2026, 11, 1, 15))).toBe("upcoming"));
});
describe("2026-27 premiums", () => {
  it("annual = per term x terms", () => { for (const p of Object.values(PREMIUMS)) expect(p.perTerm * p.terms).toBe(p.annual); });
  it("undergrad quarter is $1,308", () => expect(PREMIUMS.undergrad.perTerm).toBe(1308));
});
