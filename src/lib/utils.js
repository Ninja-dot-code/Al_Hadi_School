import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely with tailwind-merge and clsx.
 * @param {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as percentage with fixed decimals.
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatPercentage(value, decimals = 1) {
  if (value === null || value === undefined || isNaN(value)) return "0.0%";
  return `${Number(value).toFixed(decimals)}%`;
}
