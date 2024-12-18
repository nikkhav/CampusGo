import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates duration between two timestamps in a human-readable format.
 * @param {string | Date} startTime - The start time as a string or Date object.
 * @param {string | Date} endTime - The end time as a string or Date object.
 * @returns {string} - The formatted duration, e.g., "2 Std. 15 Min." or "45 Min."
 */
export const calculateDuration = (
  startTime: string | Date,
  endTime: string | Date,
): string => {
  // Convert inputs to Date objects if they are strings
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Calculate total minutes
  const totalMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);

  // Handle invalid time ranges
  if (totalMinutes < 0) {
    return "Ungültige Zeitangaben"; // "Invalid time inputs"
  }

  // Format the duration in hours and minutes
  return totalMinutes < 60
    ? `${totalMinutes} Min.`
    : `${Math.floor(totalMinutes / 60)} Std. ${
        totalMinutes % 60 > 0 ? `${totalMinutes % 60} Min.` : ""
      }`;
};
