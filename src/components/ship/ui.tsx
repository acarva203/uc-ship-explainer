import type { ReactNode } from "react";
export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="border-t border-border py-16 md:py-20">
      <p className="eyebrow">{eyebrow}</p>
       <h2 id={`${id}-h`} className="mt-2 text-xl font-semibold text-primary md:text-2xl">{title}</h2>
      {intro && <div className="prose-w mt-3 text-muted-foreground">{intro}</div>}
      <div className="mt-8">{children}</div>
    </section>
  );
}
export function Src({ href, children = "Source" }: { href: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
      {children} ↗
    </a>
  );
}
export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted p-1">
      {options.map((o) => (
        <button key={o.value} type="button" role="radio" aria-checked={value === o.value} onClick={() => onChange(o.value)}
          className={`min-h-10 rounded-md px-3.5 text-sm transition-colors ${value === o.value ? "bg-background font-medium text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group mt-3">
      <summary className="inline-flex min-h-10 cursor-pointer list-none items-center gap-2 text-sm font-medium text-primary [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="inline-block transition-transform group-open:rotate-90">›</span>{summary}
      </summary>
      <div className="fade-in prose-w pb-2 pl-4 text-sm text-muted-foreground">{children}</div>
    </details>
  );
}
