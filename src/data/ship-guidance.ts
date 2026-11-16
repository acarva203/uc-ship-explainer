import { MEDICAL, PREMIUMS, SRC, VISITS } from "./ucship";

export const SHIP_GUIDANCE = [
  { id: "doctor", title: "Doctor’s visit", text: "Start with SHCS for primary care. You usually need its referral before getting medical care off campus.", href: SRC.medical },
  { id: "referral", title: "Referral", text: "Approval from SHCS to get covered medical care elsewhere. Not needed for ER, urgent care, OB/GYN, pediatrics, LiveHealth Online, dental or vision.", href: SRC.medical },
  { id: "mental", title: "Mental health", text: "Counseling at SHCS and LiveHealth Online therapy need no referral. Other outside providers do.", href: SRC.mental },
  { id: "urgent", title: "Urgent care", text: "SHCS urgent care is $0. Off campus, choose an Anthem network urgent care clinic. You don’t need a referral.", href: SRC.whereCare },
  { id: "dental", title: "Dental", text: "Go straight to a dentist. Choose one in the Delta Dental PPO network to pay less.", href: SRC.dental },
  { id: "vision", title: "Vision", text: "Book an eye exam on campus or with an Anthem Blue View Vision Insight provider. No referral needed.", href: SRC.vision },
  { id: "rx", title: "Prescriptions", text: "Copays depend on drug type. Show your Anthem ID card at pharmacies outside SHCS.", href: SRC.rx },
  { id: "premium", title: "Premiums, 2026–27", text: "What you pay to have the plan. Billed each term to your student account.", href: SRC.insurance, facts: PREMIUMS },
  { id: "split", title: "How a deductible and coinsurance split a bill", text: "Many services waive the deductible and use a flat copay instead (office visits, urgent care, ER). Real costs depend on the service, network, referral and what you’ve already paid this year.", href: SRC.medical, facts: MEDICAL },
  ...VISITS.map((visit, index) => ({ id: `visit-${index}`, title: visit.service, text: visit.note, href: visit.src, cost: visit.network, campus: visit.shcs })),
  { id: "nurse", title: "SHCS appointments & advice", text: "First stop for care; 24/7 advice nurse and counseling", href: SRC.contacts, phone: "(530) 752-2349" },
] as const;

export const QUESTION_MAX_LENGTH = 1500;
export function selectedGuidance(ids: string[]) {
  return [...new Set(ids)].slice(0, 4).flatMap((id) => {
    const entry = SHIP_GUIDANCE.find((item) => item.id === id);
    return entry ? [entry] : [];
  });
}