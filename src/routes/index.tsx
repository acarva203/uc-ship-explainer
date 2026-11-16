import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/ship/Hero";
import { Navigator } from "@/components/ship/Navigator";
import { Coverage } from "@/components/ship/Coverage";
import { Costs } from "@/components/ship/Costs";
import { Calendar, Waiver } from "@/components/ship/Waiver";
import { Help } from "@/components/ship/Help";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "UC SHIP, made clear — UC Davis student health insurance guide" },
      { name: "description", content: "Independent visual guide to UC Davis UC SHIP 2026–27: where to get care, referrals, premiums, costs and waiver deadlines." },
      { property: "og:title", content: "UC SHIP, made clear" },
      { property: "og:description", content: "Where to go, what you pay, and how to waive UC Davis student health insurance, 2026–27." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [["#navigator", "Get care"], ["#coverage", "Coverage"], ["#costs", "Costs"], ["#waiver", "Waiver"], ["#calendar", "Dates"], ["#help", "Help"]];

function Index() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2">Skip to content</a>
      <div className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[1040px] items-center justify-between gap-4 px-5">
          <a href="#top" className="whitespace-nowrap text-sm font-semibold">UC SHIP<span className="hidden sm:inline">, made clear</span></a>
          <nav aria-label="Sections" className="-mr-2 flex overflow-x-auto text-sm">
            {NAV.map(([h, l]) => <a key={h} href={h} className="whitespace-nowrap rounded px-2 py-2 text-muted-foreground hover:text-foreground">{l}</a>)}
          </nav>
        </div>
      </div>
      <main id="main" className="mx-auto max-w-[1040px] px-5" >
        <div id="top" />
        <Hero />
        <Navigator />
        <Coverage />
        <Costs />
        <Waiver />
        <Calendar />
        <Help />
      </main>
    </div>
  );
}
