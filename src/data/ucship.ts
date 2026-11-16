// All facts for the 2026–27 UC Davis UC SHIP plan year. Each carries its official source.
export const SOURCES_CHECKED = "November 16, 2026";
export const PLAN_YEAR = "2026–27";

export const SRC = {
  insurance: "https://shcs.ucdavis.edu/insurance",
  waiver: "https://shcs.ucdavis.edu/uc-ship-waiver-information",
  criteria: "https://shcs.ucdavis.edu/waiver-criteria",
  home: "https://myucship.org/uc-davis/",
  medical: "https://myucship.org/uc-davis/coverage/medical/",
  mental: "https://myucship.org/uc-davis/coverage/mental-health/",
  rx: "https://myucship.org/uc-davis/coverage/prescription-drugs/",
  dental: "https://myucship.org/uc-davis/coverage/dental/",
  vision: "https://myucship.org/uc-davis/coverage/vision/",
  whereCare: "https://myucship.org/uc-davis/where-to-get-care/",
  contacts: "https://myucship.org/uc-davis/contacts/",
  apps: "https://myucship.org/uc-davis/mobile-apps/",
  portal: "https://www2.academichealthplans.com/school/7004.html",
  forms: "https://shcs.ucdavis.edu/insurance/uc-ship-forms",
  medicalBooklet: "https://myucship.org/uc-davis/wp-content/uploads/sites/2/2024/06/UCD-Anthem-Benefit-Book.pdf",
  rxBooklet: "https://myucship.org/uc-davis/wp-content/uploads/sites/2/2024/06/UCD-Prescription-Benefit-Book.pdf",
  dentalBooklet: "https://myucship.org/wp-content/uploads/2024/06/UCSHIP-Delta-Dental-Benefit-Booklet.pdf",
  visionSummary: "https://myucship.org/wp-content/uploads/2026/08/UCSHIP-Anthem-Vision-Summary.pdf",
  liveHealth: "https://myucship.org/wp-content/uploads/2024/06/UCSHIP-LH-Flyer.pdf",
  shcs: "https://shcs.ucdavis.edu/",
};

export type Category = "undergrad" | "grad" | "lawvet";
// From the table captioned "2026-27 Academic Year" on shcs.ucdavis.edu/insurance.
export const PREMIUMS: Record<Category, { label: string; term: "quarter" | "semester"; terms: number; perTerm: number; annual: number }> = {
  undergrad: { label: "Undergraduate", term: "quarter", terms: 3, perTerm: 1308, annual: 3924 },
  grad: { label: "Graduate", term: "quarter", terms: 3, perTerm: 2940, annual: 8820 },
  lawvet: { label: "Law / Veterinary", term: "semester", terms: 2, perTerm: 4410, annual: 8820 },
};

export type Deadline = { label: string; date: string; kind: "standard" | "late" };
export const DEADLINES: Record<"quarter" | "semester", Deadline[]> = {
  quarter: [
    { label: "Fall, Winter & Spring quarters", date: "2026-09-01", kind: "standard" },
    { label: "Late waiver — Fall", date: "2026-10-01", kind: "late" },
    { label: "Winter & Spring quarters only", date: "2026-12-01", kind: "standard" },
    { label: "Late waiver — Winter", date: "2027-01-01", kind: "late" },
    { label: "Spring quarter only", date: "2027-03-01", kind: "standard" },
    { label: "Late waiver — Spring", date: "2027-04-01", kind: "late" },
  ],
  semester: [
    { label: "Fall & Spring semesters", date: "2026-08-15", kind: "standard" },
    { label: "Late waiver — Fall", date: "2026-09-15", kind: "late" },
    { label: "Spring semester only", date: "2026-12-01", kind: "standard" },
    { label: "Late waiver — Spring", date: "2027-01-01", kind: "late" },
  ],
};

export type Term = { name: string; start: string; end: string; summer?: boolean };
export const COVERAGE: Record<"quarter" | "semester", Term[]> = {
  quarter: [
    { name: "Fall", start: "2026-09-14", end: "2027-01-03" },
    { name: "Winter", start: "2027-01-04", end: "2027-03-24" },
    { name: "Spring / Summer", start: "2027-03-25", end: "2027-09-12", summer: true },
  ],
  semester: [
    { name: "Fall", start: "2026-08-17", end: "2027-01-10" },
    { name: "Spring / Summer", start: "2027-01-11", end: "2027-08-15", summer: true },
  ],
};

// Anthem Blue Cross Prudent Buyer PPO network, deductible $250 individual; OOP max $4,500 individual (medical + pharmacy combined).
export const MEDICAL = { deductible: 250, oopMax: 4500, oonDeductible: 500, oonOopMax: 9000, inpatientCoinsurance: 0.2 };

export const VISITS = [
  { icon: "medical", service: "Office visit (primary or specialty)", shcs: "$0", network: "$25 copay, deductible waived", note: "Network visit needs an SHCS referral. Labs and X-rays are extra.", src: SRC.medical },
  { icon: "mental", service: "Mental health office visit", shcs: "$0", network: "$0, deductible waived", note: "Referral needed outside SHCS, except LiveHealth Online.", src: SRC.medical },
  { icon: "virtual", service: "LiveHealth Online virtual visit", shcs: "—", network: "$0, deductible waived", note: "No referral needed.", src: SRC.medical },
  { icon: "urgent", service: "Urgent care", shcs: "$0", network: "$45 copay, deductible waived", note: "No referral needed at urgent care clinics.", src: SRC.medical },
  { icon: "er", service: "Emergency room", shcs: "—", network: "$250 copay, waived if admitted", note: "No referral needed. Same $250 copay out of network.", src: SRC.medical },
  { icon: "rx", service: "Generic prescription (30 days)", shcs: "$5", network: "$5 copay", note: "SHCS Pharmacy or Optum Rx network (CVS, Walgreens).", src: SRC.rx },
] as const;
