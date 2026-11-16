# Accessibility audit

Scope: the UC Davis UC SHIP guide at `/`, including care selections, premiums, cost illustration, coverage disclosures, waiver dates, phone navigation, and all six language settings. Review followed **better-accessibility**.

## Findings and fixes

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH — fixed | `src/components/ship/ui.tsx:11`, `src/components/ship/Navigator.tsx:61` | Buttons declared radio roles without arrow-key selection. | Shared native radio inputs, associated labels, browser-native arrow-key selection and visible label focus outlines. | WCAG 2.1.1: keyboard users must be able to select care, student category and term system. |
| HIGH — fixed | `src/components/ship/Navigation.tsx:31` | At 320px with text enlarged to 200%, language and menu controls extended past the viewport. | Navigation and its controls wrap; header height grows with content. | WCAG 1.4.4 / 1.4.10: enlarged text must not hide controls. |
| MEDIUM — fixed | `src/components/ship/Navigation.tsx:55`, `src/routes/index.tsx:30` | Phone section selection did not move focus to the destination; skip target was not explicitly focusable. | Section links close the dialog and focus the destination heading; main accepts programmatic focus. | WCAG 2.4.3: focus must follow navigation predictably. |
| MEDIUM — fixed | `src/components/ship/Costs.tsx:53` | Wide costs table had no explicit keyboard-focusable scroll container. | Named, focusable table region; arrow keys scroll horizontally. | WCAG 2.1.1: narrow-screen keyboard users can reach the remaining columns. |
| MEDIUM — fixed | `src/components/ship/InsuranceText.tsx:17` | Pointer-opened definitions depended on trigger focus for Escape dismissal; vertical placement assumed a fixed definition height. | Escape works globally, outside taps dismiss, hover persists over the definition, and measured height determines placement. | WCAG 1.4.13: definitions must be dismissible and hoverable. |
| MEDIUM — fixed | `src/components/ship/ui.tsx:6`, `src/components/ship/Navigator.tsx:73` | Custom button accessible labels bypassed translation; changing care recreated its live region. | Custom button labels use the selected language; the care update region remains mounted and atomic. | WCAG 4.1.2 / 4.1.3: control names and changed content should remain available to assistive technology. |
| LOW — fixed | `src/components/ship/Costs.tsx:89`, `src/styles.css:133` | Slider exposed only a raw numeric amount; custom focus colors had no explicit forced-color override. | Slider exposes a dollar-valued description and references its result; focus uses system Highlight in forced colors. | Improves interpretation and visibility for assistive-technology users. |

## Verification

- 15 tests passed: selection state, live-date behavior, deadline/cost math, term deduplication, and routing.
- Chromium keyboard flows: skip link, native radio arrow selection, slider adjustment, all disclosures, table horizontal scrolling, phone-menu containment and Escape, trigger focus restoration, and destination focus.
- Mouse and touch definitions: opens on hover/focus/tap, stays visible while hovered, closes with Escape/outside tap, and fits the phone viewport.
- Automated axe WCAG A/AA checks: expanded desktop, all language settings, 320px phone, phone menu, and 200% text enlargement.
- Remaining axe `target-size` warnings only concern insurance-term buttons embedded in sentences. These qualify for WCAG 2.5.8's inline-text exception; increasing them independently would disrupt reading. They are not reported as AA failures.
- Rendered sRGB contrast measurements: foreground/background 16.48:1; muted text/background 6.02:1; muted text/muted surface 5.61:1; primary/background 14.71:1; primary button text/fill 14.34:1; accent text/fill 10.22:1; gold-note text/fill 8.79:1; charcoal/gold 9.78:1; focus ring/accent 12.69:1. All tested text pairs exceed 4.5:1 and the focus pair exceeds 3:1.
- 320px layout and 200% text screenshots reviewed; wrapping navigation stays available. Wide data tables scroll within their own region rather than the page.
- No page runtime errors during the checks. Latest preview build succeeded.
- Waiver clock tested in the UI across midnight: December 1, 2026 changed from Upcoming to Passed on December 2 without reloading. It also refreshes on tab focus and visibility changes.

## Not verified

- Actual spoken output in NVDA, VoiceOver or JAWS; automated accessible-name checks do not substitute for a real screen-reader pass.
- Physical-device keyboard, OS magnification, or Windows High Contrast rendering; forced-color fallback was inspected in source.
- Translation completeness and professional language accuracy remain pending, as already disclosed in the guide. English fallback may still need per-phrase language annotation when translations are completed.
- Deadline statuses update using the device's local clock. This does not fetch changes to official UC Davis deadline dates or add future plan years automatically.

**Verdict: Approve for the inspected coverage**, with the verification limits above; this is not a full WCAG conformance certification.