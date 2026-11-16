import { LanguageProvider } from "@/lib/guide-language";
import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/ship/Hero";
import { Navigator } from "@/components/ship/Navigator";
import { Coverage } from "@/components/ship/Coverage";
import { Costs } from "@/components/ship/Costs";
import { Calendar, Waiver } from "@/components/ship/Waiver";
import { Help } from "@/components/ship/Help";
import { Navigation } from "@/components/ship/Navigation";

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

function Index() {
  return (
    <LanguageProvider><div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-3 focus:py-2">Skip to content</a>
      <Navigation />
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
    </div></LanguageProvider>
  );
}
