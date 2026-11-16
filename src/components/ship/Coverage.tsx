import { Icon, type IconName } from "./icons";
import { Details, Section, Src } from "./ui";
import { SRC } from "@/data/ucship";
import type { ReactNode } from "react";

type Row = { id: string; icon: IconName; title: string; desc: string; stat: string; statLabel: string; note: string; details: ReactNode; src: string; carrier: string };
const ROWS: Row[] = [
  { id: "cov-medical", icon: "medical", title: "Medical", carrier: "Anthem Blue Cross", desc: "Doctor visits, preventive care, urgent and emergency care, hospital stays, labs and X-rays.",
    stat: "$4,500", statLabel: "Medical + pharmacy out-of-pocket max (individual, network)",
    note: "SHCS referral needed outside SHCS, with listed exceptions. Network: Anthem Blue Cross Prudent Buyer PPO.",
    details: (<ul className="list-disc space-y-1 pl-4">
      <li>At SHCS: $0 deductible, $0 office visits, urgent care, labs and X-rays.</li>
      <li>Network deductible: $250 individual / $500 family. Many services waive it (office visits, urgent care, ER).</li>
      <li>Network inpatient hospital: 20% coinsurance. Lab $5, X-ray $50.</li>
      <li>Out of network: $500 deductible, 40% coinsurance, $9,000 individual max, plus charges above the allowed amount. Out-of-network hospitals add a 25% penalty.</li>
      <li>Once you reach the out-of-pocket max, the plan pays 100% of covered medical and pharmacy costs for the rest of the year.</li>
    </ul>), src: SRC.medical },
  { id: "cov-mental", icon: "mental", title: "Mental health", carrier: "SHCS · LiveHealth Online · Anthem", desc: "Inpatient and outpatient mental health and substance use care.",
    stat: "$0", statLabel: "Network or SHCS mental health office visit",
    note: "Referral needed outside SHCS, except LiveHealth Online.",
    details: (<ul className="list-disc space-y-1 pl-4">
      <li>SHCS Counseling Services: (530) 752-2349, available 24/7.</li>
      <li>LiveHealth Online therapy: $0, 45-minute sessions, no referral.</li>
      <li>Out of network: 40% coinsurance after deductible.</li>
    </ul>), src: SRC.mental },
  { id: "cov-rx", icon: "rx", title: "Prescriptions", carrier: "Optum Rx", desc: "Copays depend on drug type. Show your Anthem ID card at pharmacies outside SHCS.",
    stat: "$5", statLabel: "Generic, 30-day supply (SHCS or network pharmacy)",
    note: "Network: SHCS Pharmacy (usually the lowest copay) and Optum Rx pharmacies including CVS and Walgreens.",
    details: (<table className="w-full text-left text-sm"><caption className="sr-only">Prescription copays, 30-day supply</caption>
      <thead><tr className="text-muted-foreground"><th className="py-1 font-normal">Type</th><th className="font-normal">SHCS</th><th className="font-normal">Network</th></tr></thead>
      <tbody className="num">
        <tr className="border-t border-border"><td className="py-1">Generic</td><td>$5</td><td>$5</td></tr>
        <tr className="border-t border-border"><td className="py-1">Brand formulary</td><td>$15</td><td>$35</td></tr>
        <tr className="border-t border-border"><td className="py-1">Brand non-formulary</td><td>$40</td><td>$40</td></tr>
        <tr className="border-t border-border"><td className="py-1">Specialty</td><td colSpan={2}>10% up to $250</td></tr>
      </tbody></table>), src: SRC.rx },
  { id: "cov-dental", icon: "dental", title: "Dental", carrier: "Delta Dental", desc: "Two checkups and cleanings a year, plus fillings, root canals and crowns with cost sharing.",
    stat: "$1,200", statLabel: "Annual dental benefit maximum (the most the plan pays)",
    note: "No referral needed. Choose the Delta Dental PPO network specifically.",
    details: (<><p className="mb-2 rounded bg-gold-soft px-2 py-1 text-gold-foreground">Not the same as the medical out-of-pocket max: the dental maximum caps what the <em>plan</em> pays; the medical max caps what <em>you</em> pay.</p>
      <ul className="list-disc space-y-1 pl-4">
      <li>Preventive and diagnostic: $0 in network.</li>
      <li>Deductible for other services: $25 in network, $50 out.</li>
      <li>Basic (fillings, root canals, extractions): 20% in network, 40% out.</li>
      <li>Major (crowns, inlays, prosthodontics): 30% in network, 60% out.</li>
      <li>Out-of-network benefits max out at $750, within the $1,200 combined.</li>
    </ul></>), src: SRC.dental },
  { id: "cov-vision", icon: "vision", title: "Vision", carrier: "Anthem Blue View Vision", desc: "A yearly eye exam and an allowance for glasses or contacts.",
    stat: "$10", statLabel: "Routine eye exam copay, in network",
    note: "No referral needed. Network: Blue View Vision Insight, or the SHCS Optometry Clinic.",
    details: (<ul className="list-disc space-y-1 pl-4">
      <li>Frames: $120 allowance + 20% off the balance, one pair per year.</li>
      <li>Standard lenses: $25 copay. Contacts instead: $120 allowance.</li>
      <li>Out of network: exam up to $49, frames up to $50, contacts $92; you pay first and file a claim.</li>
    </ul>), src: SRC.vision },
];

export function Coverage() {
  return (
    <Section id="coverage" eyebrow="Coverage" title="What the plan covers"
      intro="Medical, mental health, prescriptions, dental and vision are included. The provider networks and payment rules differ by benefit.">
      <ul className="divide-y divide-border border-y border-border">
        {ROWS.map((r) => (
          <li key={r.id} id={r.id} className="grid gap-4 py-7 md:grid-cols-[56px_1fr_220px] md:gap-8">
            <div className="grid size-12 place-items-center rounded-full border border-border text-primary"><Icon name={r.icon} className="size-7" /></div>
            <div>
              <h3 className="font-semibold">{r.title} <span className="ml-1 text-sm font-normal text-muted-foreground">· {r.carrier}</span></h3>
              <p className="prose-w mt-1 text-muted-foreground">{r.desc}</p>
              <p className="prose-w mt-2 text-sm"><span aria-hidden className="mr-1.5 text-primary">↳</span>{r.note}</p>
              <Details summary="Details and limits">{r.details}</Details>
            </div>
            <div className="md:border-l md:border-border md:pl-6">
              <p className="num text-2xl font-medium text-primary">{r.stat}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.statLabel}</p>
              <p className="mt-2"><Src href={r.src} /></p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
