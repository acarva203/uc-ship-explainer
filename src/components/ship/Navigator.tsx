import { Translated } from "./Translated";
import { useState } from "react";
import { Icon, type IconName } from "./icons";
import { Button, Section, Src } from "./ui";
import { SRC } from "@/data/ucship";

type Step = { title: string; body: string; tag?: string };
type Path = { key: string; label: string; icon: IconName; summary: string; referral: "Yes, outside SHCS" | "No" | "Depends"; steps: Step[]; exceptions?: string[]; cost: string; next: { label: string; href: string }; src: string };

const PATHS: Path[] = [
  { key: "doctor", label: "Doctor’s visit", icon: "medical", referral: "Yes, outside SHCS", summary: "Start with SHCS for primary care. You usually need its referral before getting medical care off campus.",
    steps: [
      { title: "Start at SHCS", body: "Book with Student Health and Counseling Services. Visits there cost $0.", tag: "(530) 752-2349" },
      { title: "Get a referral when required", body: "If SHCS can’t provide the service, it refers you. Without a needed referral, care may not be covered." },
      { title: "Confirm the network", body: "Search Anthem’s Find Care for the “UCSHIP” network (Anthem Blue Cross Prudent Buyer PPO)." },
      { title: "Book care", body: "Call the provider to confirm they take new patients, then bring your Anthem ID." },
    ],
    exceptions: ["Emergency room", "Urgent care clinics", "Pediatric care", "Obstetrics", "Gynecological care", "LiveHealth Online"],
    cost: "SHCS office visit $0 · Network office visit $25 copay, deductible waived", next: { label: "How to find a network provider", href: SRC.medical }, src: SRC.medical },
  { key: "mental", label: "Mental health", icon: "mental", referral: "Depends", summary: "Counseling at SHCS and LiveHealth Online therapy need no referral. Other outside providers do.",
    steps: [
      { title: "Start at SHCS Counseling", body: "Counseling support is available 24/7 by phone.", tag: "(530) 752-2349" },
      { title: "Or see a therapist online", body: "LiveHealth Online therapy: $0, no referral needed. Sessions last 45 minutes." },
      { title: "Outside therapist? Get a referral", body: "For an Anthem network provider outside SHCS, get an SHCS referral first." },
    ],
    cost: "SHCS and network mental health office visits $0 · LiveHealth Online therapy $0", next: { label: "Mental health coverage", href: SRC.mental }, src: SRC.mental },
  { key: "urgent", label: "Urgent care", icon: "urgent", referral: "No", summary: "For problems that can’t wait for a regular appointment but aren’t emergencies. Not sure how urgent it is? Call the advice nurse. This guide can’t assess symptoms.",
    steps: [
      { title: "Call the advice nurse", body: "Free 24/7 nurse advice for students.", tag: "(530) 752-2349" },
      { title: "SHCS or a network urgent care", body: "SHCS urgent care is $0. Off campus, choose an Anthem network urgent care clinic. You don’t need a referral." },
      { title: "Or a virtual visit", body: "LiveHealth Online doctors are available 24/7, no referral." },
    ],
    cost: "SHCS urgent care $0 · Network urgent care $45 copay, deductible waived", next: { label: "Where to get care now", href: SRC.whereCare }, src: SRC.medical },
  { key: "dental", label: "Dental", icon: "dental", referral: "No", summary: "Go straight to a dentist. Choose one in the Delta Dental PPO network to pay less.",
    steps: [
      { title: "Find a Delta Dental PPO dentist", body: "Use the Delta Dental app or website. Other Delta networks cost more." },
      { title: "Give your Delta Dental ID", body: "Find it in the Delta Dental app, or call (800) 765-6003." },
      { title: "Book a checkup", body: "Two checkups and cleanings per year at $0 in network." },
    ],
    cost: "In-network checkup and cleaning $0 · Fillings 20% after $25 deductible", next: { label: "Dental coverage", href: SRC.dental }, src: SRC.dental },
  { key: "vision", label: "Vision", icon: "vision", referral: "No", summary: "Book an eye exam on campus or with an Anthem Blue View Vision Insight provider. No referral needed.",
    steps: [
      { title: "On campus or off", body: "SHCS Optometry Clinic and Optical Shop, or search Anthem for “Blue View Vision Insight.”" },
      { title: "Book an exam", body: "One routine exam per benefit year." },
      { title: "Use your eyewear allowance", body: "$120 frames or $120 contacts in network, once per benefit year." },
    ],
    cost: "In-network routine eye exam $10 copay", next: { label: "Vision coverage", href: SRC.vision }, src: SRC.vision },
];

export function Navigator() {
  const [sel, setSel] = useState("doctor");
  const p = PATHS.find((x) => x.key === sel);
  if (!p) return null;
  return (<Translated>
    <Section id="navigator" eyebrow="Care navigator" title="What do you need help with?"
      intro="A referral is SHCS approval to get covered care elsewhere. Whether you need one depends on the care you’re getting. This guide doesn’t assess symptoms.">
      <p role="note" className="flex items-start gap-3 rounded-lg border border-destructive/40 px-4 py-3 text-sm">
        <span aria-hidden className="mt-0.5 font-semibold text-destructive">!</span>
        <span><strong className="font-semibold">For an emergency, call <a href="tel:911" className="underline underline-offset-4">911</a> or go to the nearest emergency room.</strong> No referral needed.</span>
      </p>
      <div role="radiogroup" aria-label="Type of care" className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {PATHS.map((x) => {
          const on = x.key === sel;
          return (
            <Button key={x.key} role="radio" aria-checked={on} type="button" onClick={() => setSel(x.key)}
              className={`flex min-h-24 flex-col last:col-span-2 sm:last:col-span-1 items-center justify-center gap-2 rounded-lg border px-2 py-3 text-sm transition-colors ${on ? "border-primary bg-accent font-medium text-accent-foreground" : "border-border hover:border-foreground/40"}`}>
              <Icon name={x.icon} className="size-8" />{x.label}
            </Button>
          );
        })}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Light blue: your selected type of care · Blue numbered circles: steps in order · Gold referral label: a referral is required or depends on the provider · Light blue referral label: no referral needed</p>
      <div key={p.key} className="fade-in mt-8" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <p className="prose-w">{p.summary}</p>
          <p className="text-sm"><span className="text-muted-foreground">SHCS referral needed:</span>{" "}
            <span className={`rounded px-2 py-0.5 font-medium ${p.referral === "No" ? "bg-accent text-accent-foreground" : "bg-gold-soft text-gold-foreground"}`}>{p.referral}</span>
          </p>
        </div>
        <ol className="relative mt-6 grid gap-6 md:grid-flow-col md:auto-cols-fr md:gap-4">
          {p.steps.map((s, i) => (
            <li key={s.title} className="relative pl-12 md:pl-0 md:pt-12">
              <span aria-hidden className="absolute left-0 top-0 grid size-8 place-items-center rounded-full border border-primary bg-background text-sm font-medium text-primary num">{i + 1}</span>
              {i < p.steps.length - 1 && <span aria-hidden className="absolute left-4 top-9 h-[calc(100%-1rem)] w-px bg-border md:left-10 md:top-4 md:h-px md:w-[calc(100%-2rem)]" />}
              <h3 className="text-sm font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              {s.tag && <a href={`tel:+1${s.tag.replace(/\D/g, "")}`} className="mt-1 inline-block text-sm text-primary underline underline-offset-4 num">{s.tag}</a>}
            </li>
          ))}
        </ol>
        {p.exceptions && (
          <div className="mt-8 rounded-lg bg-muted px-4 py-4">
            <p className="text-sm font-medium">No referral needed for:</p>
            <ul className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-3">{p.exceptions.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4 text-sm">
          <p><span className="text-muted-foreground">Cost example:</span> {p.cost} <Src href={p.src} /></p>
          <a href={p.next.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center rounded-md bg-primary px-4 font-medium text-primary-foreground hover:bg-primary/90">{p.next.label} ↗</a>
        </div>
      </div>
    </Section></Translated>
  );
}
