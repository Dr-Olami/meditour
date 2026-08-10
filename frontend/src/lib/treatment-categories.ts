/**
 * Category → hue map for treatment hero glow tinting.
 *
 * Each treatment category gets a pair of Tailwind color tokens used for the
 * hero band's ambient glow blobs. The hero stays ink-dark; only the glow
 * color changes per category, giving each treatment page a subtle visual
 * identity without breaking the monochrome editorial discipline.
 *
 * Colors are chosen from Tailwind's default palette to stay within the
 * existing token system — no new CSS custom properties needed.
 */
export interface CategoryHue {
  /** Primary glow color — Tailwind class fragment, e.g. "violet-600" */
  primary: string;
  /** Secondary glow color — Tailwind class fragment, e.g. "indigo-600" */
  secondary: string;
}

/** Fallback hue for uncategorized or unknown categories. */
const DEFAULT_HUE: CategoryHue = {
  primary: 'violet-600',
  secondary: 'indigo-600',
};

/**
 * Map of treatment category → hue pair.
 *
 * Categories are matched case-insensitively. If a category isn't found,
 * the default violet/indigo hue is used.
 */
const CATEGORY_HUE_MAP: Record<string, CategoryHue> = {
  // Heart — warm rose/red tint
  heart: { primary: 'rose-600', secondary: 'pink-600' },
  // Oncology — deep amber/orange tint
  oncology: { primary: 'amber-600', secondary: 'orange-600' },
  // Neurosurgery / Neurology — cool cyan/sky tint
  neurosurgery: { primary: 'cyan-600', secondary: 'sky-600' },
  neurology: { primary: 'cyan-600', secondary: 'sky-600' },
  // Orthopaedics — emerald/teal tint
  orthopaedics: { primary: 'emerald-600', secondary: 'teal-600' },
  // Surgery — violet/indigo (default brand)
  surgery: { primary: 'violet-600', secondary: 'indigo-600' },
  // ENT — blue/indigo tint
  ent: { primary: 'blue-600', secondary: 'indigo-600' },
  // Gastroenterology — lime/green tint
  gastroenterology: { primary: 'lime-600', secondary: 'green-600' },
  // Fertility — pink/rose tint
  fertility: { primary: 'pink-600', secondary: 'rose-600' },
  // Nephrology — teal/cyan tint
  nephrology: { primary: 'teal-600', secondary: 'cyan-600' },
  // Eye — sky/blue tint
  eye: { primary: 'sky-600', secondary: 'blue-600' },
  // Transplant — purple/fuchsia tint
  transplant: { primary: 'fuchsia-600', secondary: 'purple-600' },
  // Aesthetic — rose/purple tint
  aesthetic: { primary: 'rose-500', secondary: 'purple-600' },
  // Paediatric Neurology — cyan/sky tint (shares neuro family)
  'paediatric neurology': { primary: 'cyan-600', secondary: 'sky-600' },
  // Regenerative — emerald/green tint
  regenerative: { primary: 'emerald-600', secondary: 'green-600' },
  // Urology — blue/cyan tint
  urology: { primary: 'blue-600', secondary: 'cyan-600' },
};

/**
 * Resolve a treatment category to its hue pair.
 *
 * @param category - The treatment category string from frontmatter
 * @returns The hue pair for the hero glow, or the default violet/indigo
 */
export function getCategoryHue(category?: string): CategoryHue {
  if (!category) return DEFAULT_HUE;
  const key = category.toLowerCase().trim();
  return CATEGORY_HUE_MAP[key] ?? DEFAULT_HUE;
}
