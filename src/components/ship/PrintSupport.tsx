import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Text } from "@/lib/guide-language";
import { prepareGuidePrint, type PrintLink } from "@/lib/print-guide";

export function PrintSupport() {
  const [links, setLinks] = useState<PrintLink[]>([]);
  useEffect(() => {
    let restore: (() => void) | undefined;
    const before = () => {
      restore?.();
      const root = document.getElementById("main");
      if (!root) return;
      const prepared = prepareGuidePrint(root);
      restore = prepared.restore;
      flushSync(() => setLinks(prepared.links));
    };
    const after = () => { restore?.(); restore = undefined; };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => { after(); window.removeEventListener("beforeprint", before); window.removeEventListener("afterprint", after); };
  }, []);
  return <section className="print-only print-links" aria-labelledby="print-links-title">
    <h2 id="print-links-title"><Text>Sources and links</Text></h2>
    <ol>{links.map((link) => <li key={link.href}><span>{link.label}</span><br /><a href={link.href} translate="no">{link.href}</a></li>)}</ol>
  </section>;
}