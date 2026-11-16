import { Children, cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { INSURANCE_TERMS } from "@/data/insurance-terms";
import { Button } from "./ui";
import { firstTermOccurrence } from "@/lib/term-occurrences";

const words = Object.keys(INSURANCE_TERMS).sort((a, b) => b.length - a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`\\b(${words.join("|")})(s)?\\b`, "gi");

function Term({ label, term }: { label: string; term: string }) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const dismissOthers = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) setPosition(null); };
    const dismiss = () => setPosition(null);
    window.addEventListener("insurance-term-open", dismissOthers);
    window.addEventListener("scroll", dismiss, true);
    window.addEventListener("resize", dismiss);
    return () => { window.removeEventListener("insurance-term-open", dismissOthers); window.removeEventListener("scroll", dismiss, true); window.removeEventListener("resize", dismiss); if (timer.current) clearTimeout(timer.current); };
  }, [id]);
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
      {label}
    </Button>
    {position && createPortal(<div id={id} role="tooltip" className="term-definition fixed z-50 rounded-md border border-border bg-popover p-4 text-sm leading-relaxed text-popover-foreground" style={position} onMouseEnter={show} onMouseLeave={hideSoon}><p className="mb-1 font-medium">{label}</p>{INSURANCE_TERMS[term]}</div>, document.body)}
  </>;
}

export function explainTerms(children: ReactNode, seen = new Set<string>()): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      const parts: ReactNode[] = [];
      let start = 0;
      for (const match of child.matchAll(pattern)) {
        const index = match.index;
        const term = match[1]?.toLowerCase();
        if (!term) continue;
        parts.push(child.slice(start, index), firstTermOccurrence(term, seen) ? <Term key={`${index}-${term}`} label={match[0]} term={term} /> : match[0]);
        start = index + match[0].length;
      }
      parts.push(child.slice(start));
      return parts;
    }
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (child.type === Button || child.type === Term || ["a", "button", "svg", "summary", "input", "label", "option"].includes(String(child.type))) return child;
    return cloneElement(child, {}, explainTerms(child.props.children, seen));
  });
}