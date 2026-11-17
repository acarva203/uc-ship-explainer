# UC SHIP, Made Clear

Build a polished, interactive **UC Davis UC SHIP explainer** that makes student health insurance easy to understand.

Use **read.cv’s minimalist sensibility**, but make this a visual learning experience—not a long résumé page or wall of text. Combine restrained typography and whitespace with purposeful diagrams, illustrations, comparisons, and interactive examples.

The previous attempts were too decorative, then too text-heavy. This version should feel simple, visual, and genuinely useful.

**Work in this order:** research official sources → organize the information → define the visual system → build → test desktop and mobile. Complete the website, not just a proposal.

## Audience and purpose

Serve UC Davis undergraduate, graduate, law, and veterinary students who want to know:

- What am I enrolled in?
- Where do I go for care?
- When do I need a referral?
- What will I pay?
- Can I waive UC SHIP?
- Who can help me?

Use plain language and progressive disclosure. Explain the essentials first; reveal qualifications and detailed rules nearby.

## Visual direction

Borrow from read.cv:

- White background, charcoal text, muted gray supporting text.
- Precise alignment, generous whitespace, light dividers.
- Small, confident sans-serif headings and readable body text.
- Quiet controls and restrained hover states.
- A human, approachable tone.

Add visual richness through the content:

- Consistent custom line illustrations for medical care, mental health, prescriptions, dental, and vision.
- Interactive diagrams built with HTML/SVG.
- Clear visual comparisons and timelines.
- One restrained accent color, such as muted UC Davis blue; small touches of gold where meaningful.
- Subtle transitions that clarify changes.

Use a roughly 1040px overall layout, with text kept around 60–70 characters per line. Let diagrams span wider than prose.

Avoid oversized marketing headlines, gradients, glass effects, giant colored panels, repetitive card grids, stock photos of doctors, fake dashboards, ornamental charts, and excessive animation. Do not make the whole page tiny or low-contrast.

## Page structure and visual experiences

### 1. Opening: understand the plan in 20 seconds

Title: **“UC SHIP, made clear.”**

Supporting text: “Your UC Davis health insurance—what’s covered, where to go, and what you pay.”

Show the applicable plan year and a visible “Independent student guide” label.

Pair the introduction with a custom **coverage illustration**: a central student-health symbol connected to five labeled benefits:

Medical · Mental health · Prescriptions · Dental · Vision

Make each label a working link to its coverage explanation. The illustration must communicate the plan’s scope without requiring animation.

Below the intro, provide three clear starting points:

- I need care
- I want to understand costs
- I already have insurance

### 2. Interactive care navigator

Ask: **“What do you need help with?”**

Use accessible illustrated options:

Doctor’s visit · Mental health · Urgent care · Dental · Vision

Selecting an option reveals a short visual path with:

- Where to start.
- Whether an SHCS referral is needed.
- Which provider network to check.
- A verified cost example, where appropriate.
- A link to the official next step.

For routine outside medical care, show the sequence:

**Start at SHCS → Get a referral when required → Confirm the network → Book care**

Use connected steps with short labels and explanatory text. Show exception paths clearly. Never imply every type of care requires a referral.

Keep emergency guidance immediately visible: “For an emergency, call 911 or go to the nearest emergency room. No referral needed.”

This navigator explains insurance procedures; it must not diagnose symptoms or determine urgency.

### 3. Coverage, explained visually

Create an illustrated benefits index with five distinct rows, rather than five identical cards.

Each row includes:

- One small, consistent illustration.
- A plain-language description.
- A useful verified benefit example.
- A concise network or referral note.
- An expandable “Details and limits” section.
- A source link.

Keep medical, mental health, pharmacy, dental, and vision benefit rules distinct. Clearly distinguish a dental annual benefit maximum from a medical out-of-pocket maximum.

### 4. Costs: separate having insurance from using it

Introduce two clearly labeled concepts:

**Premium — what you pay to have the plan.**  
**Care costs — what you may pay when you use it.**

Add a student-category selector:

Undergraduate · Graduate · Law / Veterinary

Update the verified per-term and annual premiums, including the correct quarter or semester label.

Use a compact visual premium comparison with directly labeled bars. Avoid oversized number tiles.

Next, show common visit costs in a readable comparison table with small service illustrations. Label each example’s provider setting and applicable qualifications.

Add an interactive **illustrative cost-sharing example** to explain deductible and coinsurance:

- Use a hypothetical covered allowed amount.
- Show how an applicable deductible and coinsurance divide the cost.
- Clearly label it “Illustration only—not a bill estimate.”
- Explain that many services waive the deductible and that actual costs depend on coverage and network rules.
- Make the math internally consistent.
- Do not mix premiums into the out-of-pocket limit.
- If verified plan rules are insufficient for a reliable example, use clearly labeled hypothetical percentages instead of presenting them as UC SHIP terms.

### 5. Waiver guide and deadline timeline

Title: **“Already insured? Check before you waive.”**

Explain that having another plan does not automatically remove UC SHIP.

Build a simple four-step checklist:

Review criteria → Gather documents → Submit through the official portal → Check approval

Use a quarter/semester selector to display the relevant official deadlines on an accessible timeline. Show exact dates and plan year. Calculate “upcoming” and “passed” labels from the current date.

Include:

- Annual waiver renewal.
- Local access requirements.
- Additional international-student criteria.
- Late-waiver instructions and fees.
- What to do if other coverage ends.

Do not create a fake application form or declare a student eligible. Link to the official waiver portal and full criteria.

### 6. Coverage calendar

Show coverage periods as horizontal term bands:

Fall · Winter · Spring / Summer

Adapt appropriately for semester programs.

Visually explain when summer coverage is included. Include the exact start and end dates as text; never make visitors infer dates from bar widths.

### 7. Useful terms and real help

Add short expandable definitions:

Premium · Copay · Deductible · Coinsurance · Referral · Explanation of benefits

Finish with a compact contact directory for:

- SHCS appointments and advice.
- Insurance and waiver questions.
- Anthem member services.
- Insurance ID/app information.
- Official plan documents.

Make phone, email, and external links functional.

## Research and content requirements

Use official UC Davis sources and the UC Davis-specific UC SHIP pages:

- https://shcs.ucdavis.edu/insurance
- https://shcs.ucdavis.edu/uc-ship-waiver-information
- https://shcs.ucdavis.edu/waiver-criteria
- https://myucship.org/uc-davis/
- https://myucship.org/uc-davis/coverage/dental/
- https://myucship.org/uc-davis/coverage/vision/

Find the applicable benefits overview, Summary of Benefits and Coverage, and full benefit booklet through these sources.

The earlier research concerned **2026–27**. Verify the intended academic year before using any figures. Do not silently replace one year’s information with another’s or mix rules from different campuses.

Check table captions carefully when extracting premiums. Verify referral exceptions, network names, copays, coverage dates, and waiver deadlines.

Every numerical or eligibility claim needs a nearby source link. Display an honest “Sources checked” date. If a fact cannot be verified, say so and link to the official source rather than inventing it.

Keep the site clearly independent. Do not use an official seal or suggest UC Davis endorsement.

## Interaction and accessibility

- Build responsive, working components rather than static mockups.
- Use semantic HTML, keyboard navigation, visible focus, and sufficient contrast.
- Give diagrams text equivalents and label every chart directly.
- Never rely on color alone.
- Keep important information available without hovering.
- Respect reduced-motion preferences.
- Use comfortable mobile tap targets.
- Stack diagrams logically on small screens without horizontal page overflow.
- Do not require accounts or collect personal health information.
- No backend is needed for this informational guide.

## Completion criteria

Before finishing:

1. Verify every source-backed figure and deadline.
2. Test every selector, disclosure, internal link, and external action.
3. Check the cost illustration’s arithmetic and labels.
4. Inspect the page at mobile, tablet, and desktop widths.
5. Confirm the first screen explains what this is and where to start.
6. Ensure each major section includes a useful visual—not decoration.
7. Remove repeated copy and unnecessary containers.
8. Clearly report anything that could not be verified.

The finished result should feel like **a thoughtfully designed interactive guide: the restraint of read.cv, with enough visual explanation to make insurance understandable.**
feel free to adapt the visuals beyond read.cv aesthetics if an infographic sytle would be more helpful

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8d62386e-224e-4611-9b18-70e52245fe8c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
