import { Translated } from "./Translated";
import { useEffect, useState } from "react";
import { Details, Section, Segmented, Src } from "./ui";
import { COVERAGE, DEADLINES, SRC } from "@/data/ucship";
import { deadlineStatus, formatDate, parseISO } from "@/lib/ship-math";

type Sys = "quarter" | "semester";
const SYS_OPTS = [{ value: "quarter" as Sys, label: "Quarter · undergrad, grad" }, { value: "semester" as Sys, label: "Semester · law, vet" }];

function useToday() {
  const [t, setT] = useState<Date | null>(null);
  useEffect(() => setT(new Date()), []);
  return t;
}

export function Waiver() {
  const [sys, setSys] = useState<Sys>("quarter");
  const today = useToday();
  const steps = [
    ["Check your plan", "Your plan must meet all UC Davis waiver requirements.", SRC.criteria],
    ["Gather documents", "Insurance ID card and plan benefits summary, as PDF or JPG.", SRC.waiver],
    ["Submit through the portal", "Run by Academic HealthPlans; register with your student ID.", SRC.portal],
    ["Check approval", "Watch your email. Keep UC SHIP fees paid until approved.", SRC.waiver],
  ];
  return (<Translated>
    <Section id="waiver" eyebrow="Waiver" title="Already insured? Check before you waive"
      intro="Another insurance plan doesn’t cancel UC SHIP. You stay enrolled and keep paying until your waiver is approved. Apply again each academic year.">
      <ol className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 md:grid-cols-4">
        {steps.map(([t, b, h], i) => (
          <li key={t} className="bg-background p-4">
            <span className="num text-xs text-primary">0{i + 1}</span>
            <p className="mt-1 text-sm font-semibold">{t}</p>
            <p className="mt-1 text-xs text-muted-foreground">{b}</p>
            <a href={h} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs text-primary underline underline-offset-4">Official page ↗</a>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold">2026–27 waiver deadlines</h3>
        <Segmented label="Term system" value={sys} onChange={setSys} options={SYS_OPTS} />
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Blue dots: upcoming regular deadlines · Gray dots: passed dates · Gold outlined dots: upcoming late-waiver dates · Gold labels: late fee applies</p>
      <ol className="mt-6 border-l border-border" aria-label={`Waiver deadlines for ${sys} students`}>
        {DEADLINES[sys].map((d) => {
          const st = today ? deadlineStatus(d.date, today) : null;
          return (
            <li key={d.date + d.label} className={`relative grid gap-1 py-3 pl-6 sm:grid-cols-[180px_1fr_auto] sm:items-baseline sm:gap-4 ${st === "passed" ? "text-muted-foreground" : ""}`}>
              <span aria-hidden className={`absolute -left-[5px] top-[1.2rem] size-[9px] rounded-full border ${st === "passed" ? "border-muted-foreground bg-muted-foreground" : d.kind === "late" ? "border-gold-foreground bg-background" : "border-primary bg-primary"}`} />
              <time dateTime={d.date} className="num text-sm font-medium">{formatDate(d.date)}</time>
              <span className="text-sm">{d.kind === "late" ? <span className="mr-2 rounded bg-gold-soft px-1.5 py-0.5 text-xs text-gold-foreground">Late · $75 fee</span> : null}{d.label}</span>
              <span className="text-xs">{st === "passed" ? "Passed" : st === "upcoming" ? <span className="font-medium text-primary">Upcoming</span> : ""}</span>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-xs text-muted-foreground">Status is based on your device’s date{today ? ` (${today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })})` : ""}. Summer-start programs get deadlines from their program. <Src href={SRC.waiver} /></p>

      <div className="mt-10 grid gap-x-10 md:grid-cols-2">
        <Details summary="Annual renewal">Approved waivers last one academic year. Submit a new one before each year starts. If you gain coverage mid-year, you can waive the remaining terms. <Src href={SRC.waiver} /></Details>
        <Details summary="Local access (50-mile rule)">Your plan must give in-person, in-network primary care, a hospital, and full non-emergency medical and behavioral care within 50 miles of campus or where you live while at school. Starting 2026–27 this also applies to HMOs and Medi-Cal (previously 175 miles). Travel, ministry cost-sharing and county CMSP plans can’t be used. <Src href={SRC.criteria} /></Details>
        <Details summary="Other plan requirements">Medi-Cal, Medicare, TRICARE, Covered California/exchange or UC employee plans qualify by type. Employer or individual plans must have an out-of-pocket max of $10,600 or less (individual), equal mental health coverage, all essential health benefits, and not be a reimbursement plan. <Src href={SRC.criteria} /></Details>
        <Details summary="International students: extra criteria">Also required: no pre-existing condition exclusions, no lifetime maximums, coverage for suicide-related care and amateur sports injuries, an English master policy in U.S. dollars, a U.S. claims office, at least $50,000 medical evacuation and $25,000 repatriation. <Src href={SRC.criteria} /></Details>
        <Details summary="Missed the deadline?">You can submit a late waiver up to 30 days after the deadline. Approved late waivers cost a $75 fee and apply only to current and future terms; processing takes about 30 days. Email <a className="underline" href="mailto:waiver@shcs.ucdavis.edu">waiver@shcs.ucdavis.edu</a> or visit Insurance Services (3rd floor, Student Health and Wellness Center). Denied? You can appeal using the <a className="underline" href={SRC.forms} target="_blank" rel="noreferrer">Waiver Appeal form ↗</a>. <Src href={SRC.waiver} /></Details>
        <Details summary="If your other coverage ends">Contact Insurance Services quickly and submit a Request to Cancel Waiver form to enroll. You’ll be charged the full term premium (not pro-rated) and need proof of when coverage ended. <Src href={SRC.waiver} /></Details>
      </div>
      <p className="mt-8"><a href={SRC.portal} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Open the official waiver portal ↗</a></p>
    </Section></Translated>
  );
}

const day = (iso: string) => { const [y, m, d] = parseISO(iso); return Date.UTC(y, m - 1, d) / 864e5; };

export function Calendar() {
  const [sys, setSys] = useState<Sys>("quarter");
  const terms = COVERAGE[sys];
  const start = day(terms[0]!.start), end = day(terms[terms.length - 1]!.end) + 1;
  return (<Translated>
    <Section id="calendar" eyebrow="Coverage calendar" title="When you’re covered"
      intro="Coverage runs in back-to-back terms. Summer is included at no extra charge if you’re enrolled in UC SHIP for spring.">
      <Segmented label="Term system" value={sys} onChange={setSys} options={SYS_OPTS} />
      <ol className="mt-8 flex flex-col gap-3 md:flex-row md:gap-1" aria-label={`2026–27 coverage periods, ${sys} students`}>
        {terms.map((t) => {
          const w = ((day(t.end) + 1 - day(t.start)) / (end - start)) * 100;
          return (
            <li key={t.name} className="fade-in md:flex-[var(--w)]" style={{ ["--w" as string]: w.toFixed(2) }}>
              <div className={`flex h-10 items-center overflow-hidden rounded-sm px-3 text-sm font-medium ${t.summer ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                {t.name}{t.summer && <span className="ml-auto rounded-sm bg-gold px-1.5 text-xs text-foreground">+ summer</span>}
              </div>
              <p className="num mt-2 text-xs"><time dateTime={t.start}>{formatDate(t.start)}</time> – <time dateTime={t.end}>{formatDate(t.end)}</time></p>
            </li>
          );
        })}
      </ol>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Light blue: earlier coverage terms · Dark blue: the spring term that includes summer · Gold: summer included at no extra charge</p>
      <p className="mt-2 text-xs text-muted-foreground"><Src href={SRC.insurance}>Official coverage dates</Src></p>
    </Section></Translated>
  );
}
