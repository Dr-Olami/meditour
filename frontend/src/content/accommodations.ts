export interface AccommodationOption {
  value: string;
  label: string;
  cost: number;
  description?: string;
}

/**
 * Placeholder accommodation tiers used by the cost estimator.
 * Per-stay cost is a rough estimate until the operations team provides
 * real per-night rates for each tier.
 */
export const ACCOMMODATIONS: AccommodationOption[] = [
  {
    value: 'budget',
    label: 'Budget guesthouse',
    cost: 280,
    description: 'Clean, basic lodging near the hospital.',
  },
  {
    value: 'mid',
    label: '3-star hotel',
    cost: 560,
    description: 'Comfortable stay with standard amenities.',
  },
  {
    value: 'premium',
    label: '5-star hotel',
    cost: 1260,
    description: 'Premium stay with concierge support.',
  },
];
