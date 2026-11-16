import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider, Message, localDate, message, useLanguage } from "@/lib/guide-language";
import { explainTerms } from "@/components/ship/InsuranceText";

function Sample() {
  const { language, setLanguage } = useLanguage();
  return <><select aria-label="Language" value={language} onChange={() => setLanguage("hi")}><option value="en">English</option><option value="hi">Hindi</option></select>
    {explainTerms(<p><Message values={{ count: 3 }}>{"per year ({count} quarters)"}</Message></p>, new Set(), language)}</>;
}

describe("Language preference and insurance values", () => {
  it("restores a requested language without deleting it during initialization", async () => {
    window.history.replaceState({}, "", "/?lang=hi#costs");
    render(<LanguageProvider><Sample /></LanguageProvider>);
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("hi"));
    expect(new URLSearchParams(window.location.search).get("lang")).toBe("hi");
    expect(window.location.hash).toBe("#costs");
    fireEvent.change(screen.getByRole("combobox"));
  });
  it.each(["es", "zh-CN", "vi", "ko", "hi"] as const)("preserves cost amounts when interpolating %s", (language) => {
    const result = message("Of {amount}: deductible {deductible}, coinsurance {coinsurance}, plan pays {plan}.", language, { amount: "$10,000", deductible: "$250", coinsurance: "$1,950", plan: "$7,800" });
    expect(result.match(/\$\d+(?:,\d{3})*/g)?.sort()).toEqual(["$10,000", "$250", "$1,950", "$7,800"].sort());
    expect(result).not.toContain("{amount}");
  });
  it.each(["es", "zh-CN", "vi", "ko", "hi"] as const)("keeps the same calendar deadline in %s", (language) => {
    const date = new Date(2026, 11, 1);
    expect(localDate(date, language)).toBe(new Intl.DateTimeFormat(language, { month: "long", day: "numeric", year: "numeric" }).format(date));
  });
});