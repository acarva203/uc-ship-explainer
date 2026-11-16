# UC SHIP UI polish

## Audit
The guide needs a focused polish, not a redesign. Keep its content, features, section order, UC Davis colors, and useful insurance diagrams.

- Phone navigation cuts off destinations instead of offering a complete menu.
- Three equally framed opening links compete for attention and push most of the coverage diagram below the phone screen.
- Rounded labels and referral-exception pills add unnecessary framing.
- Repeated uppercase section labels duplicate several headings.
- All section headings are blue, competing with selected controls and key figures.
- Premium and cost-sharing bars use broad transitions that animate layout changes.

## Direction
**Product:** Help UC Davis students find care, understand costs, and check waiver requirements.

**Character:** Calm, precise, approachable.

**World:** A student health reference sheet, using white, charcoal, UC Davis blue and gold.

**Moments:** The five-benefit coverage diagram and the deductible/coinsurance comparison carry the strongest color.

**Signature:** Consistent connected lines explain relationships and the steps to care; they never serve as background decoration.

## Changes
1. Tighten spacing around the opening so more of the coverage diagram is visible on phones.
2. Keep blue and gold identity, but make section headings and supporting controls quieter.
3. Preserve the custom health icons; align icon boxes and labels consistently within each control group.
4. Keep all facts and cautions; shorten opening action labels and remove periods from headings.
5. Keep the chosen Geist typography. Use sentence-case section labels and zero letter spacing.
6. Replace the three opening cards with one primary care link and two quieter links. Add a complete phone menu with keyboard focus, Escape dismissal and visible selected destination.
7. Replace decorative pill framing with plain text where no state is being conveyed. Keep referral status and warning labels meaningful.
8. Preserve and improve the existing diagrams rather than adding unrelated imagery.
9. Restrict motion to short color/opacity feedback; stop animating bar width.

## Verification
Check desktop and phone layouts, every section link, phone menu keyboard behavior, care choices, premium selectors, cost slider, and expandable details. Run existing cost and navigation tests. Keep every insurance figure and source link unchanged.

## Technical details
Changes stay in the existing presentation files and semantic color tokens. No new data storage or services. Record the mobile navigation structure in the project's architecture notes.

The antislop-ui core companion was unavailable; apply its supplied UI checklist alongside the unslop audit and verification steps.