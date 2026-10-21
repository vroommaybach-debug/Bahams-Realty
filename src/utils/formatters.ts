/**
 * Formatting helpers for Bahams Realty
 */

/**
 * Formats a number as Nigerian Naira (₦) with standard thousands separators.
 * If isRent is true, appends '/yr'.
 */
export function formatNaira(amount: number, isRent: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₦0';
  }
  const formatted = amount.toLocaleString('en-NG', {
    maximumFractionDigits: 0,
  });
  return `₦${formatted}${isRent ? '/yr' : ''}`;
}

/**
 * Compact Naira formatting for pills or quick stats (e.g., ₦85M, ₦450K, ₦1.2B)
 */
export function formatCompactNaira(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₦0';
  }
  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(amount % 1_000_000_000 === 0 ? 0 : 1);
    return `₦${val}B`;
  }
  if (amount >= 1_000_000) {
    const val = (amount / 1_000_000).toFixed(amount % 1_000_000 === 0 ? 0 : 1);
    return `₦${val}M`;
  }
  if (amount >= 1_000) {
    const val = (amount / 1_000).toFixed(amount % 1_000 === 0 ? 0 : 0);
    return `₦${val}K`;
  }
  return `₦${amount}`;
}

export function formatBeds(count: number): string {
  if (count === 0) return 'Studio';
  return `${count} ${count === 1 ? 'Bed' : 'Beds'}`;
}

export function formatBaths(count: number): string {
  return `${count} ${count === 1 ? 'Bath' : 'Baths'}`;
}

export function formatSqm(sqm: number): string {
  if (!sqm) return 'N/A';
  return `${sqm.toLocaleString('en-NG')} sqm`;
}
