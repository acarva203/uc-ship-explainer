import { Translated } from "./Translated";
import { Icon, type IconName } from "./icons";
import { PLAN_YEAR, SRC } from "@/data/ucship";
import { explainTerms } from "./InsuranceText";
import { useLanguage } from "@/lib/guide-language";

const NODES: { id: string; label: string; icon: IconName; x: number; y: number }[] = [
  { id: "cov-medical", label: "Medical", icon: "medical", x: 200, y: 38 },
  { id: "cov-mental", label: "Mental health", icon: "mental", x: 360, y: 128 },
  { id: "cov-rx", label: "Prescriptions", icon: "rx", x: 305, y: 285 },
  { id: "cov-dental", label: "Dental", icon: "dental", x: 95, y: 285 },
  { id: "cov-vision", label: "Vision", icon: "vision", x: 40, y: 128 },
];

export function CoverageHub() {
  return (<Translated>
    <figure className="mx-auto w-full max-w-[320px] md:max-w-[420px]">
      <svg viewBox="-20 0 440 340" role="group" aria-labelledby="hub-title hub-desc" className="w-full text-primary">
        <title id="hub-title">UC SHIP coverage at a glance</title>
        <desc id="hub-desc">One plan connects five benefit areas: medical, mental health, prescriptions, dental and vision. Each label links to its explanation below.</desc>
        {NODES.map((n) => (
          <line key={n.id} x1="200" y1="170" x2={n.x} y2={n.y} stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
         <circle cx="200" cy="170" r="52" fill="var(--color-gold-soft)" stroke="var(--color-gold)" strokeWidth="2" />
        <g transform="translate(176 140) scale(1.7)" className="text-primary"><Icon name="shield" className="" width={28} height={28} /></g>
        <text x="200" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--color-primary)">UC SHIP</text>
        {NODES.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="group outline-none" aria-label={`${n.label} coverage`}>
            <circle cx={n.x} cy={n.y} r="26" fill="var(--color-background)" stroke="var(--color-foreground)" strokeOpacity=".7" strokeWidth="1.25" className="transition-colors group-hover:fill-[var(--color-accent)] group-focus-visible:stroke-[var(--color-ring)] group-focus-visible:[stroke-width:3]" />
            <g transform={`translate(${n.x - 13.3} ${n.y - 13.3}) scale(0.95)`} style={{ color: "var(--color-foreground)" }}><Icon name={n.icon} className="" width={28} height={28} /></g>
            <text x={n.x} y={n.y + 46} textAnchor="middle" fontSize="15" fontWeight="500" fill="var(--color-foreground)" className="underline-offset-4 group-hover:underline">{n.label}</text>
          </a>
        ))}
      </svg>
      <figcaption className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">Gold center: your UC SHIP plan · White circles: included care areas · Gray lines: connected to the same plan</figcaption>
    </figure></Translated>
  );
}

export function Hero() {
  const { language } = useLanguage();
  return (<Translated>
    <header className="grid items-center gap-6 pb-8 pt-8 md:grid-cols-[1fr_420px] md:gap-10 md:py-12">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-muted-foreground">Independent student guide</span>
          <span aria-hidden className="text-border">/</span>
          <span className="font-medium text-gold-foreground">{PLAN_YEAR}</span>
        </div>
         <h1 className="mt-4 text-3xl font-medium text-primary md:text-4xl">UC SHIP, made clear</h1>
        <p className="prose-w mt-4 text-lg text-muted-foreground">What your UC Davis health insurance covers, where to get care, and what you’ll pay.</p>
        {language !== "en" && <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Translations are incomplete and have not been professionally reviewed. Some text remains in English; official plan documents govern.</p>}
        <p className="prose-w mt-4 text-sm text-muted-foreground">
          {explainTerms("UC Davis enrolls registered students in UC SHIP automatically. To opt out, you need an approved waiver.", new Set(), language)} <a className="underline underline-offset-4 hover:text-primary" href={SRC.insurance} target="_blank" rel="noreferrer">SHCS ↗</a>
        </p>
        <nav aria-label="Start here" className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a href="#navigator" className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">I need care</a>
          <a href="#costs" className="inline-flex min-h-11 items-center text-sm underline decoration-border underline-offset-4 hover:text-primary">Check costs</a>
          <a href="#waiver" className="inline-flex min-h-11 items-center text-sm underline decoration-border underline-offset-4 hover:text-primary">Already insured?</a>
        </nav>
      </div>
      <CoverageHub />
    </header></Translated>
  );
}
