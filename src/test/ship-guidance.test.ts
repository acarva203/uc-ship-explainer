import { describe, expect, it } from "vitest";
import { selectedGuidance, SHIP_GUIDANCE } from "@/data/ship-guidance";
import { SRC } from "@/data/ucship";

describe("AI guidance grounding", () => {
  it("rejects invented IDs and deduplicates matching entries", () => {
    expect(selectedGuidance(["https://evil.example", "doctor", "doctor"]).map((entry) => entry.id)).toEqual(["doctor"]);
  });
  it("returns only official links from the guide source list", () => {
    const links: string[] = Object.values(SRC);
    expect(SHIP_GUIDANCE.every((entry) => links.includes(entry.href))).toBe(true);
  });
  it("preserves the guide's $45 urgent care copay and official medical source", () => {
    const entry = selectedGuidance(["visit-3"])[0];
    expect(entry && "cost" in entry ? entry.cost : null).toBe("$45 copay, deductible waived");
    expect(entry?.href).toBe(SRC.medical);
  });
});