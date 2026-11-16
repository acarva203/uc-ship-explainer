export function firstTermOccurrence(term: string, seen: Set<string>): boolean {
  const canonical = term.toLowerCase().replace(/-/g, " ").replace(/\s+/g, " ");
  if (seen.has(canonical)) return false;
  seen.add(canonical);
  return true;
}