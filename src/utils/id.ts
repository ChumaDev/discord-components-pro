/**
 * ID Generation Utilities
 */

/**
 * Generates a unique ID for components
 */
export function generateId(prefix = 'component'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Generates a short ID (8 characters)
 */
export function generateShortId(): string {
  return Math.random().toString(36).substring(2, 10);
}

/**
 * Generates a custom ID for Discord components
 */
export function generateCustomId(componentType: string): string {
  return `${componentType}-${generateShortId()}`;
}
