import { Translated } from "./Translated";
import { Section, Src } from "./ui";
import { SOURCES_CHECKED, SRC } from "@/data/ucship";

const TERMS = [
  ["Premium", "The price of having the plan, charged each term whether or not you use care."],
  ["Copay", "A flat amount you pay for a service, like $25 for a network office visit."],
  ["Deductible", "The amount you pay for certain covered services each benefit year before the plan shares the cost. It doesn’t apply to every service."],
  ["Coinsurance", "Your percentage share after the deductible, like 20% of an allowed amount."],
  ["Referral", "Approval from SHCS to get covered medical care elsewhere. Not needed for ER, urgent care, OB/GYN, pediatrics, LiveHealth Online, dental or vision."],
  ["Explanation of benefits", "A statement from the insurer after care showing what was billed, what the plan paid, and what you may owe. It isn’t a bill."],
];

const CONTACTS: { who: string; what: string; links: [string, string][] }[] = [
  { who: "SHCS appointments & advice", what: "First stop for care; 24/7 advice nurse and counseling", links: [["(530) 752-2349", "tel:+15307522349"], ["shcs.ucdavis.edu", SRC.shcs]] },
  { who: "Insurance & waiver questions", what: "SHCS Insurance Services", links: [["insurance@shcs.ucdavis.edu", "mailto:insurance@shcs.ucdavis.edu"], ["waiver@shcs.ucdavis.edu", "mailto:waiver@shcs.ucdavis.edu"]] },
  { who: "Anthem Blue Cross", what: "Medical and vision member services", links: [["(866) 940-8306", "tel:+18669408306"]] },
  { who: "Delta Dental · Optum Rx", what: "Dental and pharmacy benefits", links: [["(800) 765-6003", "tel:+18007656003"], ["(844) 265-1879", "tel:+18442651879"]] },
  { who: "Insurance ID & apps", what: "Anthem Sydney Health app for your ID card", links: [["Mobile apps page", SRC.apps]] },
  { who: "Official plan documents", what: "Benefit booklets and summaries", links: [["Medical booklet", SRC.medicalBooklet], ["Pharmacy", SRC.rxBooklet], ["Dental", SRC.dentalBooklet], ["Vision summary", SRC.visionSummary]] },
];

export function Help() {
  return (<Translated>
    <>
      <Section id="terms" eyebrow="Vocabulary" title="Useful terms">
        <div className="grid gap-x-10 md:grid-cols-2">
          {TERMS.map(([t, d]) => (
            <details key={t} className="group border-b border-border">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-medium [&::-webkit-details-marker]:hidden">{t}<span aria-hidden className="text-muted-foreground transition-transform group-open:rotate-45">+</span></summary>
              <p className="fade-in pb-4 text-sm text-muted-foreground">{d}</p>
            </details>
          ))}
        </div>
      </Section>
      <Section id="help" eyebrow="Real help" title="Who to contact">
        <dl className="divide-y divide-border border-y border-border">
          {CONTACTS.map((c) => (
            <div key={c.who} className="grid gap-1 py-4 md:grid-cols-[260px_1fr_auto] md:items-baseline md:gap-6">
              <dt className="text-sm font-medium">{c.who}</dt>
              <dd className="text-sm text-muted-foreground">{c.what}</dd>
              <dd className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                {c.links.map(([l, h]) => <a key={h} href={h} {...(h.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})} className="inline-flex min-h-10 items-center text-primary underline underline-offset-4 num">{l}{h.startsWith("http") ? " ↗" : ""}</a>)}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3"><Src href={SRC.contacts}>UC SHIP contacts</Src></p>
      </Section>
      <footer className="border-t border-border py-10 text-xs text-muted-foreground">
        <p className="prose-w">This is an independent student guide. UC Davis, UC SHIP and the insurers have not endorsed it. Figures are for the 2026–27 plan year. Sources checked {SOURCES_CHECKED}.</p>
        <p className="prose-w mt-2">Check official plan documents for full terms. We couldn’t find a 2026–27 Summary of Benefits and Coverage or confirm that the linked medical, pharmacy and dental booklets dated 2024 reflect this plan year. The vision summary is labeled 2026–27.</p>
      </footer>
    </></Translated>
  );
}
