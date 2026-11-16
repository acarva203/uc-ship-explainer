import { Text, translate, useLanguage } from "@/lib/guide-language";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Translated } from "./Translated";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { explainTerms } from "./InsuranceText";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(function Button({ className = "", ...props }, ref) {
  const { language } = useLanguage();
  return <button {...props} aria-label={props["aria-label"] ? translate(props["aria-label"], language) : undefined} ref={ref} className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-ring ${className}`}><Translated>{props.children}</Translated></button>;
});
export function ChoiceGroup({ label, value, onChange, className, children }: { label: string; value: string; onChange: (value: string) => void; className?: string; children: ReactNode }) {
  const { language } = useLanguage();
  return <RadioGroup.Root aria-label={translate(label, language)} value={value} onValueChange={onChange} className={className}>{children}</RadioGroup.Root>;
}
export function Choice({ value, className, children }: { value: string; className?: string; children: ReactNode }) {
  return <RadioGroup.Item value={value} asChild><Button type="button" className={className}>{children}</Button></RadioGroup.Item>;
}
export function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: ReactNode; children: ReactNode }) {
  const { language } = useLanguage();
  return (
    <section id={id} aria-labelledby={`${id}-h`} className={`border-t border-border py-12 ${id === "coverage" || id === "terms" || id === "help" ? "md:py-14" : "md:py-16"}`}>
      {!["coverage", "costs", "waiver", "calendar"].includes(id) && <p className="eyebrow">{<Text>{eyebrow}</Text>}</p>}
       <h2 id={`${id}-h`} className="mt-2 text-xl font-medium text-foreground md:text-2xl">{<Text>{title}</Text>}</h2>
      {intro && <div className="prose-w mt-3 text-muted-foreground">{<Translated>{explainTerms(intro, new Set(), language)}</Translated>}</div>}
      <div className="mt-8">{<Translated>{explainTerms(children, new Set(), language)}</Translated>}</div>
    </section>
  );
}
export function Src({ href, children = "Source" }: { href: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground underline decoration-border underline-offset-4 hover:text-primary hover:decoration-primary">
      <Translated>{children}</Translated> ↗
    </a>
  );
}
export function Segmented<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: { value: T; label: string }[]; onChange: (v: T) => void }) {
  return (
    <ChoiceGroup label={label} value={value} onChange={(next) => { const option = options.find((o) => o.value === next); if (option) onChange(option.value); }} className="inline-flex flex-wrap gap-1 rounded-lg border border-border bg-muted p-1">
      {options.map((o) => (
        <Choice key={o.value} value={o.value}
          className={value === o.value ? "bg-background text-foreground" : "text-muted-foreground hover:text-foreground"}>
          <Text>{o.label}</Text>
        </Choice>
      ))}
    </ChoiceGroup>
  );
}
export function Details({ summary, children }: { summary: string; children: ReactNode }) {
  return (
    <details className="group mt-3">
      <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm font-medium text-foreground hover:text-primary [&::-webkit-details-marker]:hidden">
        <span aria-hidden className="inline-block transition-transform group-open:rotate-90">›</span><Text>{summary}</Text>
      </summary>
      <div className="fade-in prose-w pb-2 pl-4 text-sm text-muted-foreground"><Translated>{children}</Translated></div>
    </details>
  );
}
