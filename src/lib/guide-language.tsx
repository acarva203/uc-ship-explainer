import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import es from "@/data/locales/es.json";
import zh from "@/data/locales/zh-CN.json";
import vi from "@/data/locales/vi.json";
import ko from "@/data/locales/ko.json";
import hi from "@/data/locales/hi.json";
export const LANGUAGES = [{ code: "en", label: "English" }, { code: "es", label: "Español" }, { code: "zh-CN", label: "简体中文" }, { code: "vi", label: "Tiếng Việt" }, { code: "ko", label: "한국어" }, { code: "hi", label: "हिन्दी" }] as const;
export type Language = typeof LANGUAGES[number]["code"];
const catalogs: Record<string, Record<string, string>> = { es, "zh-CN": zh, vi, ko, hi };
export function translate(text: string, language: Language): string {
  if (language === "en") return text;
  const trimmed = text.trim().replace(/\s+/g, " ");
  const translated = catalogs[language]?.[trimmed];
  return translated ? text.replace(text.trim(), translated) : text;
}
// Translate a whole sentence before inserting values; never translate sentence fragments.
export function message(text: string, language: Language, values: Record<string, string | number> = {}): string {
  return translate(text, language).replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));
}
export function Message({ children, values }: { children: string; values?: Record<string, string | number> }) {
  const { language } = useLanguage();
  return message(children, language, values);
}
export function localDate(date: Date, language: Language, short = false): string {
  return date.toLocaleDateString(language === "en" ? "en-US" : language, { month: short ? "short" : "long", day: "numeric", year: "numeric" });
}
const LanguageContext = createContext<{ language: Language; setLanguage: (value: Language) => void }>({ language: "en", setLanguage: () => {} });
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const saved = new URLSearchParams(window.location.search).get("lang");
    const match = LANGUAGES.find((l) => l.code === saved);
    if (match) setLanguage(match.code);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = language;
    const url = new URL(window.location.href);
    if (language === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", language);
    window.history.replaceState(window.history.state, "", url);
  }, [language, ready]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}
export function useLanguage() { return useContext(LanguageContext); }
export function Text({ children }: { children: string }) { const { language } = useLanguage(); return translate(children, language); }