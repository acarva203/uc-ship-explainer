import { Translated } from "./Translated";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui";
import { LANGUAGES, useLanguage, translate } from "@/lib/guide-language";

const NAV: [string, string][] = [["navigator", "Get care"], ["coverage", "Coverage"], ["costs", "Costs"], ["waiver", "Waiver"], ["calendar", "Dates"], ["help", "Help"]];

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const update = () => {
      const current = NAV.filter(([id]) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 140;
      }).at(-1);
      setActive(current?.[0] ?? "");
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function close() { dialog.current?.close(); }

  return (<Translated>
    <div className="sticky top-0 z-40 border-b-2 border-gold bg-background">
      <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-5">
        <a href="#top" className="whitespace-nowrap text-sm font-semibold text-primary">UC SHIP<span className="hidden sm:inline">, made clear</span></a>
        <nav aria-label="Sections" className="hidden gap-1 text-sm lg:flex">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} className={`inline-flex min-h-11 items-center border-b-2 px-2 transition-colors ${active === id ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</a>)}
        </nav>
        <div className="flex shrink-0 items-center gap-1">
          <label className="sr-only" htmlFor="guide-language">{translate("Language", language)}</label>
          <select id="guide-language" value={language} onChange={(e) => { const selected = LANGUAGES.find((l) => l.code === e.target.value); if (selected) setLanguage(selected.code); }} className="min-h-11 max-w-32 rounded-md border border-border bg-background px-2 text-sm text-foreground focus-visible:outline-ring" translate="no">
            {LANGUAGES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
          </select>
        <Button aria-label="Open section menu" aria-expanded={open} aria-controls="section-menu" className="text-foreground hover:bg-muted lg:hidden" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
        </Button>
        </div>
      </div>
      <dialog ref={dialog} id="section-menu" aria-labelledby="section-menu-title" onClose={() => setOpen(false)} onClick={(e) => { if (e.target === e.currentTarget) close(); }} className="section-menu fixed inset-x-0 top-0 bottom-auto m-0 max-h-dvh w-full max-w-none border-b border-border bg-background p-5 text-foreground lg:hidden">
        <div className="mx-auto max-w-[1040px]">
          <div className="flex items-center justify-between">
            <h2 id="section-menu-title" className="text-sm font-medium">UC SHIP guide</h2>
            <Button aria-label="Close section menu" autoFocus onClick={close} className="hover:bg-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" /></svg>
            </Button>
          </div>
          <nav aria-label="Phone sections" className="mt-4 grid divide-y divide-border">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={close} aria-current={active === id ? "location" : undefined} className={`flex min-h-12 items-center justify-between px-2 ${active === id ? "bg-accent font-medium text-primary" : "hover:bg-muted"}`}>{label}{active === id && <span className="text-xs">Current section</span>}</a>)}
          </nav>
        </div>
      </dialog>
    </div></Translated>
  );
}