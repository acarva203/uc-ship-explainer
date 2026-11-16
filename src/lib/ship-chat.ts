import { SRC } from "@/data/ucship";

export type ChatTurn = { role: "user" | "assistant"; content: string };
export const CHAT_MAX_TURNS = 20;
export const CHAT_MAX_CHARS = 1500;

const ALLOWED = new Set<string>(Object.values(SRC));

/** Keeps the newest turns, starting on a student turn, with each turn capped. */
export function trimHistory(turns: ChatTurn[]): ChatTurn[] {
  const recent = turns.slice(-CHAT_MAX_TURNS).map((t) => ({ ...t, content: t.content.slice(0, t.role === "user" ? CHAT_MAX_CHARS : 6000) }));
  const first = recent.findIndex((t) => t.role === "user");
  return first < 0 ? [] : recent.slice(first);
}

/** Removes any link that is not an official source on the guide's allowlist. */
export function filterLinks(markdown: string): string {
  return markdown
    .replace(/\[([^\]]*)\]\((\S+?)\)/g, (_m, label: string, url: string) => (ALLOWED.has(url) || url.startsWith("tel:") ? `[${label}](${url})` : label))
    .replace(/(?<!\()https?:\/\/[^\s)]+/g, (url) => (ALLOWED.has(url) ? url : ""));
}
