import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Translated } from "./Translated";
import { PLAN_YEAR, SRC } from "@/data/ucship";
import { explainTerms } from "./InsuranceText";
import { useLanguage } from "@/lib/guide-language";

const benefits = [
  ["cov-medical", "Medical"],
  ["cov-mental", "Mental health"],
  ["cov-rx", "Prescriptions"],
  ["cov-dental", "Dental"],
  ["cov-vision", "Vision"],
] as const;

function CoverageIndex() {
  return (
    <Translated><aside aria-labelledby="coverage-index-title" className="min-w-0 bg-primary px-6 py-5 text-primary-foreground sm:px-8 sm:py-7 print:bg-transparent print:text-foreground">
      <h2 id="coverage-index-title" className="mb-4 text-xl font-semibold leading-tight tracking-tight">
        UC SHIP coverage at a glance
      </h2>
      <ul className="divide-y divide-current/25 border-y border-current/25">
        {benefits.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className="group flex min-h-11 items-center justify-between gap-4 py-2 font-medium hover:underline focus-visible:outline-current">
              {label}
              <ArrowDownRight size={17} aria-hidden="true" className="shrink-0 text-gold print:hidden" />
            </a>
          </li>
        ))}
      </ul>
    </aside></Translated>
  );
}

export function Hero() {
  const { language } = useLanguage();
  return (<Translated>
    <header className="grid items-center gap-8 py-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:gap-12 md:py-16">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">Independent student guide</span>
          <span aria-hidden className="text-border">/</span>
          <span className="font-medium text-gold-foreground">{PLAN_YEAR}</span>
        </div>
         <h1 className="mt-4 max-w-[15ch] text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-primary sm:text-5xl lg:text-6xl">UC Davis UC SHIP guide</h1>
        <p className="mt-5 max-w-[43ch] text-lg leading-relaxed text-foreground">What your UC Davis health insurance covers, where to get care, and what you’ll pay.</p>
        {language !== "en" && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Translations have been checked for completeness and consistency, but not professionally reviewed. Official plan documents govern; source links open in their original language.</p>}
        <p className="prose-w mt-4 text-sm text-muted-foreground">
          {explainTerms("UC Davis enrolls registered students in UC SHIP automatically. To opt out, you need an approved waiver.", new Set(), language)} <a className="underline underline-offset-4 hover:text-primary" href={SRC.insurance} target="_blank" rel="noreferrer">SHCS ↗</a>
        </p>
        <nav aria-label="Start here" className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#navigator" className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">I need care<ArrowRight size={16} className="ms-2" aria-hidden="true" /></a>
          <a href="#costs" className="inline-flex min-h-11 items-center text-sm underline decoration-border underline-offset-4 hover:text-primary">Check costs</a>
          <a href="#waiver" className="inline-flex min-h-11 items-center text-sm underline decoration-border underline-offset-4 hover:text-primary">Already insured?</a>
        </nav>
      </div>
      <CoverageIndex />
    </header></Translated>
  );
}
