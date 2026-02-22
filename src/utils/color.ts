/**
 * Color utility functions
 */

/**
 * Validate if a color is valid hex or rgb
 */
export function isValidColor(color: string): boolean {
  if (!color) return false;

  // Check hex color
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) return true;

  // Check rgb color
  const rgbRegex = /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/;
  const match = color.match(rgbRegex);
  if (match?.[1] && match[2] && match[3]) {
    const red = Number.parseInt(match[1], 10);
    const green = Number.parseInt(match[2], 10);
    const blue = Number.parseInt(match[3], 10);
    return red >= 0 && red <= 255 && green >= 0 && green <= 255 && blue >= 0 && blue <= 255;
  }

  return false;
}

/**
 * Normalize color to lowercase 6-digit hex
 */
export function normalizeColor(color: string): string {
  if (!color.startsWith('#')) return color;

  const hex = color.slice(1);
  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`.toLowerCase();
  }
  return color.toLowerCase();
}

/**
 * Convert hex color to RGB
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = normalizeColor(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);

  if (!result || !result[1] || !result[2] || !result[3]) {
    return null;
  }

  return {
    r: Number.parseInt(result[1], 16),
    g: Number.parseInt(result[2], 16),
    b: Number.parseInt(result[3], 16),
  };
}

/**
 * Convert RGB to hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (num: number) => Math.max(0, Math.min(255, num));
  const toHex = (num: number) => clamp(num).toString(16).padStart(2, '0');

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
