import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { LANGUAGE_STORAGE_KEY, LanguageProvider, Message, localDate, message, useLanguage } from "@/lib/guide-language";
import { explainTerms } from "@/components/ship/InsuranceText";

function Sample() {
  const { language, setLanguage } = useLanguage();
  return <><select aria-label="Language" value={language} onChange={(event) => setLanguage(event.target.value === "hi" ? "hi" : "en")}><option value="en">English</option><option value="hi">Hindi</option></select>
    {explainTerms(<p><Message values={{ count: 3 }}>{"per year ({count} quarters)"}</Message></p>, new Set(), language)}</>;
}

describe("Language preference and insurance values", () => {
  beforeEach(() => { window.localStorage.clear(); window.history.replaceState({}, "", "/"); });
  afterEach(() => vi.restoreAllMocks());
  it("saves a selection and restores it on a later visit without a language in the URL", async () => {
    const first = render(<LanguageProvider><Sample /></LanguageProvider>);
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "hi" } });
    await waitFor(() => expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("hi"));
    first.unmount();
    window.history.replaceState({}, "", "/#waiver");
    render(<LanguageProvider><Sample /></LanguageProvider>);
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("hi"));
    expect(window.location.hash).toBe("#waiver");
  });
  it("lets an explicit English link override the saved language and remembers English", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "hi");
    window.history.replaceState({}, "", "/?lang=en");
    render(<LanguageProvider><Sample /></LanguageProvider>);
    await waitFor(() => expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en"));
    expect(screen.getByRole("combobox")).toHaveValue("en");
  });
  it("ignores unsupported saved languages", async () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, "unsupported");
    render(<LanguageProvider><Sample /></LanguageProvider>);
    await waitFor(() => expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe("en"));
  });
  it("keeps language selection working when device storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("Blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("Blocked"); });
    window.history.replaceState({}, "", "/?lang=hi");
    render(<LanguageProvider><Sample /></LanguageProvider>);
    await waitFor(() => expect(screen.getByRole("combobox")).toHaveValue("hi"));
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "en" } });
    expect(screen.getByRole("combobox")).toHaveValue("en");
  });
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