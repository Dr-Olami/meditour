/**
 * US price comparison ranges and cost breakdown percentages for the cost
 * calculator. Breakdown percentages are approximate shares of the India
 * package total and are used to split the India range into line items.
 *
 * Reason: keeps the content collection clean while giving the calculator
 * enough data for a meaningful comparison and breakdown.
 */

export interface UsPriceRange {
  from: string;
  to: string;
}

export interface CostBreakdownItem {
  label: string;
  /** Percentage of the India package range (0–100). */
  percent: number;
}

export interface TreatmentCostData {
  usRange: UsPriceRange;
  savings: string;
  breakdown: CostBreakdownItem[];
}

/** Lookup keyed by treatment slug. */
export const TREATMENT_COST_DATA: Record<string, TreatmentCostData> = {
  'cardiology': {
    usRange: { from: '$40,000', to: '$150,000' },
    savings: '~85–90%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'cancer-treatment': {
    usRange: { from: '$20,000', to: '$200,000' },
    savings: '~80–85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 40 },
      { label: 'Oncologist & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 20 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'orthopedics-surgery': {
    usRange: { from: '$35,000', to: '$60,000' },
    savings: '~85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Implants & consumables', percent: 15 },
    ],
  },
  'infertility-treatment': {
    usRange: { from: '$12,000', to: '$25,000' },
    savings: '~80%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 30 },
      { label: 'Hospital stay', percent: 18 },
      { label: 'Consumables & medications', percent: 7 },
    ],
  },
  'organ-treatment': {
    usRange: { from: '$300,000', to: '$575,000' },
    savings: '~85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 40 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 20 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'neuro-and-spine-surgery': {
    usRange: { from: '$80,000', to: '$150,000' },
    savings: '~90%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Implants & consumables', percent: 15 },
    ],
  },
  'neurology': {
    usRange: { from: '$20,000', to: '$100,000' },
    savings: '~85–88%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'cosmetic-surgery': {
    usRange: { from: '$8,000', to: '$30,000' },
    savings: '~65–75%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 40 },
      { label: 'Surgeon & anesthesia fees', percent: 35 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Consumables & medications', percent: 10 },
    ],
  },
  'gastroenterology-gi-surgery': {
    usRange: { from: '$25,000', to: '$80,000' },
    savings: '~80–85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 18 },
      { label: 'Consumables & medications', percent: 12 },
    ],
  },
  'nephrology-kidney-care': {
    usRange: { from: '$30,000', to: '$200,000' },
    savings: '~85–88%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 40 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 20 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'urology': {
    usRange: { from: '$10,000', to: '$40,000' },
    savings: '~80–85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 18 },
      { label: 'Consumables & medications', percent: 12 },
    ],
  },
  'ophthalmology': {
    usRange: { from: '$5,000', to: '$15,000' },
    savings: '~75–80%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 50 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 10 },
      { label: 'Consumables & medications', percent: 15 },
    ],
  },
  'ear-nose-throat': {
    usRange: { from: '$8,000', to: '$30,000' },
    savings: '~80–85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 30 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Consumables & medications', percent: 10 },
    ],
  },
  'bariatric-weight-loss': {
    usRange: { from: '$15,000', to: '$30,000' },
    savings: '~65–70%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 30 },
      { label: 'Hospital stay', percent: 15 },
      { label: 'Consumables & medications', percent: 10 },
    ],
  },
  'paediatric-neurology': {
    usRange: { from: '$15,000', to: '$100,000' },
    savings: '~85%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Surgeon & anesthesia fees', percent: 25 },
      { label: 'Hospital stay', percent: 18 },
      { label: 'Consumables & medications', percent: 12 },
    ],
  },
  'stem-cell-treatment': {
    usRange: { from: '$25,000', to: '$80,000' },
    savings: '~75–80%',
    breakdown: [
      { label: 'Hospital / OT package', percent: 45 },
      { label: 'Specialist fees', percent: 25 },
      { label: 'Hospital stay', percent: 18 },
      { label: 'Consumables & medications', percent: 12 },
    ],
  },
};

/** Bengali labels for the cost breakdown line items. */
export const BREAKDOWN_LABELS_BN: Record<string, string> = {
  'Hospital / OT package': 'হাসপাতাল / OT প্যাকেজ',
  'Surgeon & anesthesia fees': 'সার্জন ও অ্যানেস্থেসিয়া ফি',
  'Oncologist & anesthesia fees': 'অনকোলজিস্ট ও অ্যানেস্থেসিয়া ফি',
  'Specialist fees': 'বিশেষজ্ঞ ফি',
  'Hospital stay': 'হাসপাতালে থাকা',
  'Consumables & medications': 'কনসিউমেবল ও ওষুধ',
  'Implants & consumables': 'ইমপ্লান্ট ও কনসিউমেবল',
};
