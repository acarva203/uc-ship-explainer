import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Search } from "lucide-react";
import { findShipGuidance } from "@/lib/ship-question.functions";
import { Text, translate, useLanguage } from "@/lib/guide-language";
import { QUESTION_MAX_LENGTH } from "@/data/ship-guidance";
import { Button, Src } from "./ui";
import { SRC } from "@/data/ucship";

type Answer = Awaited<ReturnType<typeof findShipGuidance>>;
export function AskShip() {
  const { language } = useLanguage();
  const ask = useServerFn(findShipGuidance);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [pending, setPending] = useState(false);
  const busy = useRef(false);
  return <section aria-labelledby="ask-ship-title" className="print-hide border-t border-border py-8">
    <div className="flex items-center gap-2 text-primary"><Search size={18} aria-hidden /><h2 id="ask-ship-title" className="text-lg font-medium"><Text>Ask about UC SHIP</Text></h2></div>
    <p className="mt-2 text-xs text-muted-foreground"><Text>This tool cannot assess symptoms. For an emergency, call 911. For advice, call SHCS at (530) 752-2349.</Text></p>
    <form className="mt-4" onSubmit={async (event) => {
      event.preventDefault();
      if (busy.current || !question.trim()) return;
      busy.current = true; setPending(true); setAnswer(null);
      try { setAnswer(await ask({ data: { question } })); }
      catch { setAnswer({ ok: false, error: "AI guidance is unavailable right now. Use the care guide or contact SHCS." }); }
      finally { busy.current = false; setPending(false); }
    }}>
      <label htmlFor="ship-question" className="block text-sm font-medium"><Text>Your question about care, referrals or costs</Text></label>
      <textarea id="ship-question" rows={3} maxLength={QUESTION_MAX_LENGTH} required value={question} disabled={pending} onChange={(event) => setQuestion(event.target.value)} aria-describedby="ship-question-privacy" placeholder={translate("Do I need a referral to see a therapist off campus?", language)} className="mt-2 block w-full resize-y rounded-md border border-input bg-background p-3 text-sm text-foreground" />
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <p id="ship-question-privacy" className="max-w-[65ch] text-xs text-muted-foreground"><Text>Your question is sent to AI. Don’t include names, student IDs, insurance IDs or private medical details.</Text></p>
        <Button type="submit" disabled={pending || !question.trim()} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60"><Text>{pending ? "Finding guidance…" : "Find guidance"}</Text><ArrowRight size={16} aria-hidden /></Button>
      </div>
    </form>
    <div role="status" aria-live="polite" aria-atomic="true" aria-busy={pending} className="mt-4">
      {pending && <p className="text-sm text-muted-foreground"><Text>Finding guidance…</Text></p>}
      {answer && !answer.ok && <p className="text-sm text-destructive"><Text>{answer.error}</Text> <Src href={SRC.contacts}>UC SHIP contacts</Src></p>}
      {answer?.ok && <>
        <p className="text-xs text-muted-foreground"><Text>AI-matched excerpts from this independent 2026–27 guide, not a coverage decision. Confirm details with SHCS and official plan documents.</Text></p>
        {answer.medical && <p className="mt-3 text-sm"><Text>This tool cannot assess symptoms. For an emergency, call 911. For advice, call SHCS at (530) 752-2349.</Text></p>}
        {answer.entries.length === 0 && <p className="mt-3 text-sm"><Text>No matching guidance found. Contact SHCS for your question.</Text> <Src href={SRC.contacts}>UC SHIP contacts</Src></p>}
        <ul className="mt-3 divide-y divide-border">{answer.entries.map((entry) => <li key={entry.id} className="py-3">
          <h3 className="text-sm font-semibold"><Text>{entry.title}</Text></h3>
          <p className="mt-1 text-sm text-muted-foreground"><Text>{entry.text}</Text> <Src href={entry.href} /></p>
          {"cost" in entry && <p className="mt-2 text-sm"><Text>At SHCS</Text>: <Text>{entry.campus}</Text> · <Text>In network</Text>: <Text>{entry.cost}</Text> <Src href={entry.href} /></p>}
          {"phone" in entry && <a href="tel:+15307522349" className="text-sm text-primary underline">{entry.phone}</a>}
          {entry.id === "premium" && <a href="#costs" className="mt-2 inline-block text-sm text-primary underline"><Text>Check costs</Text></a>}
          {entry.id === "split" && <a href="#costs" className="mt-2 inline-block text-sm text-primary underline"><Text>How a deductible and coinsurance split a bill</Text></a>}
        </li>)}</ul>
        <p className="mt-3 text-xs text-muted-foreground"><Text>Check official plan documents for full terms. We couldn’t find a 2026–27 Summary of Benefits and Coverage or confirm that the linked medical, pharmacy and dental booklets dated 2024 reflect this plan year. The vision summary is labeled 2026–27.</Text></p>
      </>}
    </div>
  </section>;
}