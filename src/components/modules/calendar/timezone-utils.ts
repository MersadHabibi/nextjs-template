/**
 * Timezone utility functions for handling Tehran timezone conversions
 * Tehran timezone is UTC+3:30 (3.5 hours ahead of UTC)
 */

const TEHRAN_OFFSET_HOURS = 3.5;
const TEHRAN_OFFSET_MS = TEHRAN_OFFSET_HOURS * 60 * 60 * 1000;

/**
 * Convert a UTC date string to Tehran timezone for display
 * @param utcDateString - UTC date string (ISO format)
 * @returns Formatted date string in Persian locale
 */
export function formatDateForTehranDisplay(utcDateString: string): string {
  if (!utcDateString) return "";

  try {
    const utcDate = new Date(utcDateString);

    // Add Tehran offset to convert UTC to Tehran time
    const tehranDate = new Date(utcDate.getTime() + TEHRAN_OFFSET_MS);

    return tehranDate.toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC", // Use UTC since we already converted the time
    });
  } catch {
    return utcDateString;
  }
}

/**
 * Convert a Tehran timezone date to UTC for API submission
 * @param tehranDateString - Date string in Tehran timezone
 * @returns UTC date string (ISO format)
 */
export function convertTehranToUTC(tehranDateString: string): string {
  if (!tehranDateString) return "";

  try {
    const tehranDate = new Date(tehranDateString);
    const utcDate = new Date(tehranDate.getTime() - TEHRAN_OFFSET_MS);
    return utcDate.toISOString();
  } catch {
    return tehranDateString;
  }
}

/**
 * Convert a UTC date string to Tehran timezone
 * @param utcDateString - UTC date string (ISO format)
 * @returns Date object in Tehran timezone
 */
export function convertUTCToTehran(utcDateString: string): Date | null {
  if (!utcDateString) return null;

  try {
    const utcDate = new Date(utcDateString);
    return new Date(utcDate.getTime() + TEHRAN_OFFSET_MS);
  } catch {
    return null;
  }
}

/**
 * Get current date and time in Tehran timezone as UTC string
 * @returns UTC string representing current Tehran time
 */
export function getCurrentTehranTimeAsUTC(): string {
  const now = new Date();
  const tehranTime = new Date(now.getTime() + TEHRAN_OFFSET_MS);
  return tehranTime.toISOString();
}

/**
 * Check if a date string is in the past (Tehran timezone)
 * @param dateString - Date string to check
 * @returns boolean indicating if the date is in the past
 */
export function isDateInPast(dateString: string): boolean {
  if (!dateString) return false;

  try {
    const inputDate = new Date(dateString);
    const now = new Date();
    return inputDate < now;
  } catch {
    return false;
  }
}
