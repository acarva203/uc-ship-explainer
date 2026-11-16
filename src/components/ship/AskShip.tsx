import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import ReactMarkdown from "react-markdown";
import { ArrowUp, MessageCircle, RotateCcw, Square } from "lucide-react";
import { chatShip } from "@/lib/ship-chat.functions";
import { CHAT_MAX_CHARS, type ChatTurn } from "@/lib/ship-chat";
import { Text, translate, useLanguage } from "@/lib/guide-language";
import { Button, Src } from "./ui";
import { SRC } from "@/data/ucship";

export function AskShip() {
  const { language } = useLanguage();
  const chat = useServerFn(chatShip);
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const request = useRef(0);
  const input = useRef<HTMLTextAreaElement>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ block: "nearest" }); if (!pending) input.current?.focus({ preventScroll: true }); }, [turns, pending]);

  async function send() {
    const question = draft.trim();
    if (pending || !question) return;
    const next: ChatTurn[] = [...turns, { role: "user", content: question }];
    const id = ++request.current;
    setTurns(next); setDraft(""); setError(null); setPending(true);
    try {
      const result = await chat({ data: { language, messages: next } });
      if (id !== request.current) return;
      if (result.ok) setTurns([...next, { role: "assistant", content: result.answer }]);
      else setError(result.error);
    } catch { if (id === request.current) setError("AI guidance is unavailable right now. Use the care guide or contact SHCS."); }
    finally { if (id === request.current) setPending(false); }
  }
  const stop = () => { request.current++; setPending(false); };
  const reset = () => { request.current++; setTurns([]); setError(null); setPending(false); setDraft(""); };

  return <section aria-labelledby="ask-ship-title" className="print-hide border-t border-border py-8">
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-primary"><MessageCircle size={18} aria-hidden /><h2 id="ask-ship-title" className="text-lg font-medium"><Text>Ask about UC SHIP</Text></h2></div>
      {turns.length > 0 && <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-sm text-muted-foreground underline hover:text-foreground"><RotateCcw size={14} aria-hidden /><Text>New conversation</Text></button>}
    </div>
    <p className="mt-2 text-xs text-muted-foreground"><Text>This tool cannot assess symptoms. For an emergency, call 911. For advice, call SHCS at (530) 752-2349.</Text></p>
    <div role="log" aria-live="polite" aria-busy={pending} aria-label={translate("Conversation", language)} className="mt-4 max-h-[32rem] space-y-4 overflow-y-auto">
      {turns.map((turn, i) => turn.role === "user"
        ? <p key={i} className="ml-auto w-fit max-w-[85%] whitespace-pre-wrap rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground">{turn.content}</p>
        : <div key={i} className="ship-chat-answer max-w-[65ch] text-sm leading-relaxed"><ReactMarkdown components={{ a: ({ href, children }) => <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-primary underline">{children}</a> }}>{turn.content}</ReactMarkdown></div>)}
      {pending && <p className="text-sm text-muted-foreground"><Text>Writing an answer…</Text></p>}
      {error && <p className="text-sm text-destructive"><Text>{error}</Text> <Src href={SRC.contacts}>UC SHIP contacts</Src></p>}
      <div ref={end} />
    </div>
    <form className="mt-4" onSubmit={(e) => { e.preventDefault(); void send(); }}>
      <label htmlFor="ship-question" className="sr-only"><Text>Your question about care, referrals or costs</Text></label>
      <div className="flex items-end gap-2 rounded-md border border-input bg-background p-2 focus-within:ring-2 focus-within:ring-ring">
        <textarea ref={input} id="ship-question" rows={2} maxLength={CHAT_MAX_CHARS} value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); void send(); } }} aria-describedby="ship-question-privacy" placeholder={translate("Do I need a referral to see a therapist off campus?", language)} className="block flex-1 resize-none bg-transparent p-1 text-sm text-foreground outline-none" />
        {pending
          ? <Button type="button" onClick={stop} aria-label={translate("Stop", language)} className="size-9 shrink-0 p-0"><Square size={14} aria-hidden /></Button>
          : <Button type="submit" disabled={!draft.trim()} aria-label={translate("Send", language)} className="size-9 shrink-0 bg-primary p-0 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"><ArrowUp size={16} aria-hidden /></Button>}
      </div>
      <p id="ship-question-privacy" className="mt-2 max-w-[65ch] text-xs text-muted-foreground"><Text>Your question is sent to AI. Don’t include names, student IDs, insurance IDs or private medical details.</Text> <Text>Answers are not saved and are not a coverage decision.</Text></p>
    </form>
    <p className="mt-2 text-xs text-muted-foreground"><Text>Check official plan documents for full terms. We couldn’t find a 2026–27 Summary of Benefits and Coverage or confirm that the linked medical, pharmacy and dental booklets dated 2024 reflect this plan year. The vision summary is labeled 2026–27.</Text></p>
  </section>;
}
