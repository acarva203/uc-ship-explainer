# UC SHIP, made clear — interactive UC Davis guide

## Goal
A single-page, visual, independent guide to UC Davis UC SHIP for the 2026–27 plan year (current year as of Nov 2026, to be confirmed against official pages), built in the order: research, organize, visual system, build, test.

## 1. Research (first, before any content)
- Fetch and read: shcs.ucdavis.edu/insurance, /uc-ship-waiver-information, /waiver-criteria, myucship.org/uc-davis/ (+ dental, vision), and the linked Benefits Overview, SBC and Benefit Booklet PDFs.
- Confirm plan year on each source; never mix years or campuses.
- Extract into one typed data file with a source URL per fact: premiums by category and term (checking table captions), copays/coinsurance, deductible, medical OOP max, dental annual max, vision allowances, referral rules and exceptions, network names (Anthem PPO / UC Select etc. as stated), coverage dates per term, waiver deadlines and late fees, contacts.
- Anything unverifiable is marked "Not verified — see official source" in the UI.

## 2. Visual system
- White background, charcoal text, muted gray secondary, hairline dividers, ~1040px container, prose max ~65ch, diagrams full width.
- One accent: muted UC Davis blue; gold only for highlights (e.g. "today" marker, deductible segment). Shapes/labels always accompany color.
- Sans font pair (e.g. Geist-like: "Inter Tight" avoided; use "Geist" or "Manrope" + system body). Small confident headings, 16–17px body.
- Five custom inline-SVG line icons (medical, mental health, prescriptions, dental, vision) with matching stroke style; small service icons for the cost table.
- Reduced-motion respected; subtle fades only.

## 3. Page sections (one route, `/`, with in-page anchors)
1. Opening: title, subtitle, plan-year + "Independent student guide" labels, SVG hub diagram (center symbol linked to five benefit labels, each an anchor link), three start buttons (I need care / costs / already insured). Persistent emergency line.
2. Care navigator: five illustrated radio-style options; reveals connected step path (Start at SHCS → Referral when required → Confirm network → Book care), with exception branches (emergency, mental health/urgent/dental/vision rules per verified sources), cost example and official link. No symptom triage.
3. Coverage index: five distinct rows (icon, description, verified example, network/referral note, expandable "Details and limits", source link). Dental annual max explicitly contrasted with medical OOP max.
4. Costs: Premium vs Care costs explainer; category selector (Undergrad / Grad / Law-Vet) updating per-term + annual premiums with correct quarter/semester label and labeled horizontal bars; visit-cost table with icons and settings; interactive cost-sharing slider (hypothetical allowed amount, deductible, coinsurance, OOP cap) labeled "Illustration only — not a bill estimate", hypothetical values labeled as such if plan terms insufficient.
5. Waiver: four-step checklist, quarter/semester selector, accessible timeline with exact dates and computed Upcoming/Passed from today; annual renewal, local access, international criteria, late waiver + fees, losing other coverage. Links to official portal only.
6. Coverage calendar: horizontal term bands (Fall / Winter / Spring-Summer; semester variant) with exact dates as text and summer inclusion explained.
7. Terms (accordion: Premium, Copay, Deductible, Coinsurance, Referral, EOB) and contact directory with working tel:/mailto:/external links. Footer with "Sources checked" date and independence disclaimer.

## 4. Testing
- Vitest for cost-illustration math and deadline upcoming/passed logic.
- Playwright screenshots at 375, 768, 1280 widths; click every selector, disclosure, and link; check no horizontal overflow and keyboard focus.
- Final report lists anything not verified.

## Technical details
- TanStack route `src/routes/index.tsx` with full head() metadata; components under `src/components/ship/`; facts in `src/data/ucship.ts`; pure helpers in `src/lib/ship-math.ts`.
- Tokens in `src/styles.css` (oklch), fonts via `<link>` in `__root.tsx`; shadcn Accordion/RadioGroup-style semantics with native buttons/details where simpler.
- No backend, no data collection.
