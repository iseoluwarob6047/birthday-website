export interface Profile {
  id: string;
  fullName: string;
  email: string;
  state: string;
  city: string;
  createdAt: number;
  allocation: number;
  onboardingComplete: boolean;
  paymentVerified: boolean;
}

export const STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

export const ALLOCATION_MIN = 500;
export const ALLOCATION_MAX = 3000;

/**
 * Picks a whole-dollar allocation inside the allowed band.
 * Pass the figures already in use to keep every user distinct; after 50
 * collisions it gives up and returns a plain pick rather than looping.
 */
export function randomAllocation(taken: number[] = []): number {
  const span = ALLOCATION_MAX - ALLOCATION_MIN + 1;
  const used = new Set(taken);
  for (let attempt = 0; attempt < 50; attempt++) {
    const value = ALLOCATION_MIN + Math.floor(Math.random() * span);
    if (!used.has(value)) return value;
  }
  return ALLOCATION_MIN + Math.floor(Math.random() * span);
}

export function money(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}