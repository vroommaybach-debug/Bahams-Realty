const ADMIN_GATE_SECRET = 'BahamsRealty@2026';
export const ADMIN_SESSION_STORAGE_KEY = 'bahams_realty_admin_unlocked_v1';

/**
 * Validates the candidate password against the Bahams Realty executive gate password.
 * Never exposes or logs the password.
 */
export function verifyAdminGatePassword(input: string): boolean {
  if (typeof input !== 'string') return false;
  return input === ADMIN_GATE_SECRET || input.trim() === ADMIN_GATE_SECRET;
}

/**
 * Checks whether the current browser session has already unlocked the /admin gate.
 */
export function isAdminSessionUnlocked(): boolean {
  try {
    return sessionStorage.getItem(ADMIN_SESSION_STORAGE_KEY) === 'unlocked_true';
  } catch {
    return false;
  }
}

/**
 * Persists or clears the unlocked state in sessionStorage.
 */
export function setAdminSessionUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      sessionStorage.setItem(ADMIN_SESSION_STORAGE_KEY, 'unlocked_true');
    } else {
      sessionStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    }
  } catch {
    // ignore storage errors
  }
}
