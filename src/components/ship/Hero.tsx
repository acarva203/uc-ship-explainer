import { Icon, type IconName } from "./icons";
import { PLAN_YEAR, SRC } from "@/data/ucship";

const NODES: { id: string; label: string; icon: IconName; x: number; y: number }[] = [
  { id: "cov-medical", label: "Medical", icon: "medical", x: 200, y: 38 },
  { id: "cov-mental", label: "Mental health", icon: "mental", x: 360, y: 128 },
  { id: "cov-rx", label: "Prescriptions", icon: "rx", x: 305, y: 285 },
  { id: "cov-dental", label: "Dental", icon: "dental", x: 95, y: 285 },
  { id: "cov-vision", label: "Vision", icon: "vision", x: 40, y: 128 },
];

export function CoverageHub() {
  return (
    <figure className="mx-auto w-full max-w-[420px]">
      <svg viewBox="-20 0 440 340" role="group" aria-labelledby="hub-title hub-desc" className="w-full text-primary">
        <title id="hub-title">UC SHIP coverage at a glance</title>
        <desc id="hub-desc">One plan connects five benefit areas: medical, mental health, prescriptions, dental and vision. Each label links to its explanation below.</desc>
        {NODES.map((n) => (
          <line key={n.id} x1="200" y1="170" x2={n.x} y2={n.y} stroke="var(--color-border)" strokeWidth="1.5" strokeDasharray="3 4" />
        ))}
        <circle cx="200" cy="170" r="52" fill="var(--color-accent)" stroke="var(--color-primary)" strokeWidth="1.5" />
        <g transform="translate(176 140) scale(1.7)" className="text-primary"><Icon name="shield" className="" width={28} height={28} /></g>
        <text x="200" y="204" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--color-primary)">UC SHIP</text>
        {NODES.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="group outline-none" aria-label={`${n.label} coverage`}>
            <circle cx={n.x} cy={n.y} r="26" fill="var(--color-background)" stroke="var(--color-foreground)" strokeOpacity=".7" strokeWidth="1.25" className="transition-colors group-hover:fill-[var(--color-accent)] group-focus-visible:stroke-[var(--color-ring)] group-focus-visible:[stroke-width:3]" />
            <g transform={`translate(${n.x - 12} ${n.y - 12}) scale(0.86)`} style={{ color: "var(--color-foreground)" }}><Icon name={n.icon} className="" width={28} height={28} /></g>
            <text x={n.x} y={n.y + 46} textAnchor="middle" fontSize="15" fontWeight="500" fill="var(--color-foreground)" className="underline-offset-4 group-hover:underline">{n.label}</text>
          </a>
        ))}
      </svg>
      <figcaption className="sr-only">Coverage areas: Medical, Mental health, Prescriptions, Dental, Vision.</figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <header className="grid items-center gap-10 pb-14 pt-10 md:grid-cols-[1fr_420px] md:pt-16">
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-border px-2.5 py-1 font-medium">Independent student guide</span>
          <span className="rounded-full bg-gold-soft px-2.5 py-1 font-medium text-gold-foreground">Plan year {PLAN_YEAR}</span>
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight md:text-4xl">UC SHIP, made clear.</h1>
        <p className="prose-w mt-4 text-lg text-muted-foreground">Your UC Davis health insurance—what’s covered, where to go, and what you pay.</p>
        <p className="prose-w mt-4 text-sm text-muted-foreground">
          Every registered UC Davis student is automatically enrolled in UC SHIP unless an approved waiver is on file. <a className="underline underline-offset-4 hover:text-primary" href={SRC.insurance} target="_blank" rel="noreferrer">SHCS ↗</a>
        </p>
        <nav aria-label="Start here" className="mt-8 grid gap-2 sm:grid-cols-3">
          {[
            ["#navigator", "I need care", "Where to go first"],
            ["#costs", "I want to understand costs", "Premiums and visits"],
            ["#waiver", "I already have insurance", "Waiver rules and dates"],
          ].map(([href, t, s]) => (
            <a key={href} href={href} className="group flex min-h-16 flex-col justify-center rounded-lg border border-border px-4 py-3 transition-colors hover:border-primary hover:bg-accent">
              <span className="text-sm font-medium">{t} <span aria-hidden className="text-primary transition-transform group-hover:translate-x-0.5">→</span></span>
              <span className="text-xs text-muted-foreground">{s}</span>
            </a>
          ))}
        </nav>
      </div>
      <CoverageHub />
    </header>
  );
}
