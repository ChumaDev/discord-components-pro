/**
 * Class name utility
 * Combines clsx for conditional classes
 */

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
