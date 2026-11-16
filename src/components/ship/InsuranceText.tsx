import { Text, translate, type Language } from "@/lib/guide-language";
import { Children, cloneElement, isValidElement, useEffect, useLayoutEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { INSURANCE_TERMS } from "@/data/insurance-terms";
import { Button } from "./ui";
import { firstTermOccurrence } from "@/lib/term-occurrences";

const words = Object.keys(INSURANCE_TERMS).sort((a, b) => b.length - a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`\\b(${words.join("|")})(s)?\\b`, "gi");

function Term({ label, term }: { label: string; term: string }) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const tooltip = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const dismissOthers = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) setPosition(null); };
    const dismiss = () => setPosition(null);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") dismiss(); };
    const onOutside = (event: PointerEvent) => { if (event.target instanceof Node && !trigger.current?.contains(event.target) && !tooltip.current?.contains(event.target)) dismiss(); };
    window.addEventListener("insurance-term-open", dismissOthers);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onOutside);
    return () => { window.removeEventListener("insurance-term-open", dismissOthers); window.removeEventListener("scroll", dismiss, true); window.removeEventListener("resize", dismiss); window.removeEventListener("keydown", onKey); window.removeEventListener("pointerdown", onOutside); if (timer.current) clearTimeout(timer.current); };
  }, [id]);
  useLayoutEffect(() => {
    if (!position) return;
    const box = tooltip.current?.getBoundingClientRect();
    const anchor = trigger.current?.getBoundingClientRect();
    if (!box || !anchor) return;
    const top = anchor.bottom + 8 + box.height <= window.innerHeight - 16 ? anchor.bottom + 8 : Math.max(16, anchor.top - box.height - 8);
    if (top !== position.top) setPosition({ ...position, top });
  }, [position]);
  function hideSoon() { timer.current = setTimeout(() => setPosition(null), 160); }
  function show() {
    if (timer.current) clearTimeout(timer.current);
    const r = trigger.current?.getBoundingClientRect();
    if (!r) return;
    window.dispatchEvent(new CustomEvent("insurance-term-open", { detail: id }));
    const width = Math.min(300, window.innerWidth - 32);
    setPosition({ left: Math.max(16, Math.min(r.left, window.innerWidth - width - 16)), top: r.bottom + 8 > window.innerHeight - 150 ? Math.max(16, r.top - 150) : r.bottom + 8 });
  }
  return <>
    <Button ref={trigger} type="button" className="insurance-term" aria-describedby={position ? id : undefined} aria-expanded={!!position}
      onMouseEnter={show} onMouseLeave={hideSoon} onFocus={show} onBlur={() => setPosition(null)} onClick={show} onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); setPosition(null); } }}>
      <Text>{label}</Text>
    </Button>
    {position && createPortal(<div ref={tooltip} id={id} role="tooltip" className="term-definition fixed z-50 rounded-md border border-border bg-popover p-4 text-sm leading-relaxed text-popover-foreground" style={position} onMouseEnter={() => { if (timer.current) clearTimeout(timer.current); }} onMouseLeave={hideSoon}><p className="mb-1 font-medium"><Text>{label}</Text></p><Text>{INSURANCE_TERMS[term] ?? term}</Text></div>, document.body)}
  </>;
}

export function explainTerms(children: ReactNode, seen = new Set<string>(), language: Language = "en"): ReactNode {
  const localized = new Map(Object.keys(INSURANCE_TERMS).map((term) => [translate(term, language).toLowerCase(), term]));
  const localWords = [...localized.keys()].sort((a,b) => b.length-a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const matcher = language === "en" ? pattern : new RegExp(`(${localWords.join("|")})`, "gi");
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      const text = translate(child, language);
      const parts: ReactNode[] = [];
      let start = 0;
      for (const match of text.matchAll(matcher)) {
        const index = match.index;
        const term = language === "en" ? match[1]?.toLowerCase() : localized.get(match[1]?.toLowerCase() ?? "");
        if (!term) continue;
        parts.push(text.slice(start, index), firstTermOccurrence(term, seen) ? <Term key={`${index}-${term}`} label={match[0]} term={term} /> : match[0]);
        start = index + match[0].length;
      }
      parts.push(text.slice(start));
      return parts;
    }
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (child.type === Button || child.type === Term || ["a", "button", "svg", "summary", "input", "label", "option"].includes(String(child.type))) return child;
    return cloneElement(child, {}, explainTerms(child.props.children, seen, language));
  });
}