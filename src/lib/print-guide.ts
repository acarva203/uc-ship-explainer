export type PrintLink = { href: string; label: string };

// Prepare the existing guide, not a second copy, so current choices and language survive.
export function prepareGuidePrint(root: HTMLElement) {
  const details = Array.from(root.querySelectorAll<HTMLDetailsElement>("details"));
  const previouslyOpen = details.map((detail) => detail.open);
  details.forEach((detail) => { detail.open = true; });
  const links: PrintLink[] = [];
  const numbered = new Map<string, number>();
  const anchors = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[href^="https://"]'));
  const previousReferences = anchors.map((anchor) => anchor.getAttribute("data-print-reference"));
  for (const anchor of anchors) {
    const href = anchor.href;
    let number = numbered.get(href);
    if (number === undefined) {
      links.push({ href, label: anchor.textContent?.replace(/↗/g, "").trim() || href });
      number = links.length;
      numbered.set(href, number);
    }
    anchor.setAttribute("data-print-reference", ` [${number}]`);
  }
  return {
    links,
    restore() {
      details.forEach((detail, index) => { detail.open = previouslyOpen[index] ?? false; });
      anchors.forEach((anchor, index) => {
        const previous = previousReferences[index];
        if (previous == null) anchor.removeAttribute("data-print-reference");
        else anchor.setAttribute("data-print-reference", previous);
      });
    },
  };
}