import { useState } from "react";
import { Icon } from "./icons";
import { Section, Segmented, Src } from "./ui";
import { explainTerms } from "./InsuranceText";
import { MEDICAL, PREMIUMS, SRC, VISITS, type Category } from "@/data/ucship";
import { splitCost } from "@/lib/ship-math";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 });

export function Costs() {
  const [cat, setCat] = useState<Category>("undergrad");
  const p = PREMIUMS[cat];
  const max = Math.max(...Object.values(PREMIUMS).map((x) => x.annual));
  return (
    <Section id="costs" eyebrow="Costs" title="Having insurance vs. using it">
      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
        <div className="bg-background p-5"><p className="font-semibold"><span className="mr-2 inline-block size-2.5 rounded-sm bg-primary align-middle" aria-hidden />Premium</p><p className="mt-1 text-sm text-muted-foreground">What you pay to have the plan. Billed each term to your student account.</p></div>
        <div className="bg-background p-5"><p className="font-semibold"><span className="mr-2 inline-block size-2.5 rounded-full border-2 border-gold align-middle" aria-hidden />Care costs</p><p className="mt-1 text-sm text-muted-foreground">What you may pay when you use it: copays, deductible, coinsurance. Premiums never count toward the out-of-pocket max.</p></div>
      </div>

      <h3 className="mt-12 font-semibold">Premiums, 2026–27</h3>
      <div className="mt-3"><Segmented label="Student category" value={cat} onChange={setCat} options={[{ value: "undergrad", label: "Undergraduate" }, { value: "grad", label: "Graduate" }, { value: "lawvet", label: "Law / Veterinary" }]} /></div>
      <p className="mt-5 text-sm" aria-live="polite">
        <span className="num text-xl font-medium">{usd(p.perTerm)}</span> <span className="text-muted-foreground">per {p.term}</span>
        <span className="mx-3 text-border">|</span>
        <span className="num text-xl font-medium">{usd(p.annual)}</span> <span className="text-muted-foreground">per year ({p.terms} {p.term}s)</span>
      </p>
      <figure className="mt-5">
        <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-2"><span aria-hidden className="size-3 rounded-sm bg-primary" />Dark blue: selected student category</span>
          <span className="flex items-center gap-2"><span aria-hidden className="size-3 rounded-sm bg-chart-4" />Light blue: other student categories</span>
        </figcaption>
        <ul className="space-y-2.5">
          {(Object.keys(PREMIUMS) as Category[]).map((k) => {
            const x = PREMIUMS[k]; const on = k === cat;
            return (
              <li key={k} className="grid grid-cols-[110px_1fr] items-center gap-3 text-sm sm:grid-cols-[140px_1fr]">
                <span className={on ? "font-medium" : "text-muted-foreground"}>{x.label}</span>
                <div className="flex items-center gap-2">
                  <div className={`h-5 rounded-sm transition-colors ${on ? "bg-primary" : "bg-chart-4"}`} style={{ width: `${(x.annual / max) * 70}%` }} />
                  <span className="num whitespace-nowrap text-xs">{usd(x.annual)}/yr · {usd(x.perTerm)}/{x.term}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </figure>
      <p className="mt-3 text-xs text-muted-foreground">Financial aid offers for 2026–27 include a loan component for UC SHIP. <Src href={SRC.insurance}>SHCS insurance page (table captioned “2026-27 Academic Year”)</Src></p>

      <h3 className="mt-14 font-semibold">Common visit costs</h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">What you pay for common services at SHCS and in the Anthem network, 2026–27</caption>
          <thead className="text-xs text-muted-foreground"><tr><th className="pb-2 pr-3 font-normal">Service</th><th className="pb-2 pr-3 font-normal">At SHCS</th><th className="pb-2 pr-3 font-normal">In network</th><th className="pb-2 pr-3 font-normal">What to know</th></tr></thead>
          <tbody>
            {VISITS.map((v) => (
              <tr key={v.service} className="border-t border-border align-top">
                <td className="py-3 pr-3"><span className="flex items-center gap-2.5"><Icon name={v.icon} className="size-5 shrink-0 text-primary" />{v.service}</span></td>
                <td className="num py-3 pr-3">{v.shcs}</td>
                <td className="num py-3 pr-3">{v.network}</td>
                <td className="py-3 text-xs text-muted-foreground">{v.note} <Src href={v.src} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CostSplit />
    </Section>
  );
}

function CostSplit() {
  const [amt, setAmt] = useState(2000);
  const s = splitCost(amt, MEDICAL.deductible, MEDICAL.inpatientCoinsurance, MEDICAL.oopMax);
  const pct = (n: number) => (amt ? (n / amt) * 100 : 0);
  return (
    <div className="mt-14 rounded-lg border border-border p-5 md:p-7">{explainTerms(<>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-semibold">How a deductible and coinsurance split a bill</h3>
        <span className="rounded bg-gold-soft px-2 py-0.5 text-xs font-medium text-gold-foreground">Illustration only. Not a bill estimate.</span>
      </div>
      <p className="prose-w mt-2 text-sm text-muted-foreground">
        For an in-network hospital stay, you pay the first {usd(MEDICAL.deductible)}, then 20% of the remaining covered allowed amount. Your share stops at the {usd(MEDICAL.oopMax)} out-of-pocket max. This example assumes you haven’t paid toward your deductible or out-of-pocket max this year. <Src href={SRC.medical} />
      </p>
      <label htmlFor="allowed" className="mt-6 block text-sm">Example amount covered at the insurer’s agreed rate: <span className="num font-medium">{usd(amt)}</span></label>
      <input id="allowed" type="range" min={0} max={30000} step={50} value={amt} onChange={(e) => setAmt(+e.target.value)} className="mt-2 h-10 w-full accent-[var(--color-primary)]" />
      <div className="mt-4 flex h-8 w-full overflow-hidden rounded-sm border border-border" role="img" aria-label={`Of ${usd(amt)}: deductible ${usd(s.deductiblePart)}, coinsurance ${usd(s.coinsurancePart)}, plan pays ${usd(s.plan)}.`}>
        <div className="bg-gold" style={{ width: `${pct(s.deductiblePart)}%` }} />
        <div className="bg-primary" style={{ width: `${pct(s.coinsurancePart)}%` }} />
        <div className="bg-accent [background-image:repeating-linear-gradient(45deg,transparent_0_6px,var(--color-border)_6px_7px)]" style={{ width: `${pct(s.plan)}%` }} />
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-4">
        <div><dt className="flex items-center gap-2 text-muted-foreground"><span aria-hidden className="size-3 shrink-0 rounded-sm bg-gold" />Gold: your deductible</dt><dd className="num font-medium">{usd(s.deductiblePart)}</dd></div>
        <div><dt className="flex items-center gap-2 text-muted-foreground"><span aria-hidden className="size-3 shrink-0 rounded-sm bg-primary" />Blue: your 20% coinsurance</dt><dd className="num font-medium">{usd(s.coinsurancePart)}</dd></div>
        <div><dt className="flex items-center gap-2 text-muted-foreground"><span aria-hidden className="size-3 shrink-0 rounded-sm border border-border bg-accent [background-image:repeating-linear-gradient(45deg,transparent_0_6px,var(--color-border)_6px_7px)]" />Light blue stripes: plan pays</dt><dd className="num font-medium">{usd(s.plan)}</dd></div>
        <div className="sm:border-l sm:border-border sm:pl-4"><dt className="text-muted-foreground">You pay</dt><dd className="num text-lg font-semibold">{usd(s.you)}</dd></div>
      </dl>
      <p className="mt-3 text-xs text-muted-foreground num">
        {usd(s.deductiblePart)} + {usd(s.coinsurancePart)} = {usd(s.you)} you · {usd(s.you)} + {usd(s.plan)} = {usd(amt)} total{s.capped ? " · capped at the out-of-pocket max" : ""}
      </p>
      <p className="prose-w mt-4 text-xs text-muted-foreground">Many services waive the deductible and use a flat copay instead (office visits, urgent care, ER). Real costs depend on the service, network, referral and what you’ve already paid this year.</p>
    </> )}</div>
  );
}
