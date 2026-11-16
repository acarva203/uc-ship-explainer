import { Children, cloneElement, isValidElement, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { INSURANCE_TERMS } from "@/data/insurance-terms";
import { Button } from "./ui";

const words = Object.keys(INSURANCE_TERMS).sort((a, b) => b.length - a.length).map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const pattern = new RegExp(`\\b(${words.join("|")})(s)?\\b`, "gi");

function Term({ label, term }: { label: string; term: string }) {
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  function show() {
    const r = trigger.current?.getBoundingClientRect();
    if (!r) return;
    const width = Math.min(300, window.innerWidth - 32);
    setPosition({ left: Math.max(16, Math.min(r.left, window.innerWidth - width - 16)), top: r.bottom + 8 > window.innerHeight - 150 ? Math.max(16, r.top - 150) : r.bottom + 8 });
  }
  return <>
    <Button ref={trigger} type="button" className="insurance-term" aria-describedby={position ? id : undefined} aria-expanded={!!position}
      onMouseEnter={show} onMouseLeave={() => setPosition(null)} onFocus={show} onBlur={() => setPosition(null)} onClick={() => position ? setPosition(null) : show()} onKeyDown={(e) => { if (e.key === "Escape") { e.preventDefault(); setPosition(null); } }}>
      {label}
    </Button>
    {position && createPortal(<div id={id} role="tooltip" className="term-definition fixed z-50 rounded-md border border-border bg-popover p-4 text-sm leading-relaxed text-popover-foreground" style={position} onMouseEnter={show} onMouseLeave={() => setPosition(null)}><p className="mb-1 font-medium">{label}</p>{INSURANCE_TERMS[term]}</div>, document.body)}
  </>;
}

export function explainTerms(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      const parts: ReactNode[] = [];
      let start = 0;
      for (const match of child.matchAll(pattern)) {
        const index = match.index;
        const term = match[1]?.toLowerCase();
        if (!term) continue;
        parts.push(child.slice(start, index), <Term key={`${index}-${term}`} label={match[0]} term={term} />);
        start = index + match[0].length;
      }
      parts.push(child.slice(start));
      return parts;
    }
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (child.type === Button || child.type === Term || ["a", "button", "svg", "summary", "input", "label", "option"].includes(String(child.type))) return child;
    return cloneElement(child, {}, explainTerms(child.props.children));
  });
}