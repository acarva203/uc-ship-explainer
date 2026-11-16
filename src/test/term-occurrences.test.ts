import { describe, expect, it } from "vitest";
import { firstTermOccurrence } from "@/lib/term-occurrences";

describe("Definitions within a content box", () => {
  it("defines a term only once in the same box", () => {
    const box = new Set<string>();
    expect(firstTermOccurrence("deductible", box)).toBe(true);
    expect(firstTermOccurrence("Deductible", box)).toBe(false);
  });
  it("treats hyphenated network terms as the same word", () => {
    const box = new Set<string>();
    expect(firstTermOccurrence("in-network", box)).toBe(true);
    expect(firstTermOccurrence("in network", box)).toBe(false);
  });
  it("allows a definition in a separate box", () => {
    expect(firstTermOccurrence("copay", new Set())).toBe(true);
    expect(firstTermOccurrence("copay", new Set())).toBe(true);
  });
});