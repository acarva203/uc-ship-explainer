import { describe, expect, it } from "vitest";
import { prepareGuidePrint } from "@/lib/print-guide";

describe("print preparation", () => {
  it("keeps the selected language and choices while expanding and restoring disclosures", () => {
    const root = document.createElement("main");
    root.lang = "hi";
    root.innerHTML = '<details><summary>One</summary>Body</details><details open><summary>Two</summary>Body</details><input type="radio" checked value="semester">';
    const prepared = prepareGuidePrint(root);
    expect(root.lang).toBe("hi");
    expect(root.querySelector("input")?.checked).toBe(true);
    expect(Array.from(root.querySelectorAll("details")).map((d) => d.open)).toEqual([true, true]);
    prepared.restore();
    expect(Array.from(root.querySelectorAll("details")).map((d) => d.open)).toEqual([false, true]);
  });
  it("keeps exact official URLs and shares one reference for repeated sources", () => {
    const root = document.createElement("main");
    root.innerHTML = '<a href="https://shcs.ucdavis.edu/insurance">SHCS ↗</a><a href="https://shcs.ucdavis.edu/insurance">Source</a><a href="https://shcs.ucdavis.edu/waiver-criteria">Criteria</a><a href="tel:911">911</a>';
    const prepared = prepareGuidePrint(root);
    expect(prepared.links.map((link) => link.href)).toEqual(["https://shcs.ucdavis.edu/insurance", "https://shcs.ucdavis.edu/waiver-criteria"]);
    expect(Array.from(root.querySelectorAll("a")).map((a) => a.getAttribute("data-print-reference"))).toEqual([" [1]", " [1]", " [2]", null]);
    prepared.restore();
    expect(root.querySelectorAll("[data-print-reference]")).toHaveLength(0);
  });
});