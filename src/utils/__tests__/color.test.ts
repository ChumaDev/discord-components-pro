import { describe, expect, it } from 'vitest';
import { hexToRgb, isValidColor, normalizeColor, rgbToHex } from '../color';

describe('color utilities', () => {
  describe('isValidColor', () => {
    it('should validate hex colors', () => {
      expect(isValidColor('#5865F2')).toBe(true);
      expect(isValidColor('#fff')).toBe(true);
      expect(isValidColor('#000000')).toBe(true);
    });

    it('should reject invalid hex colors', () => {
      expect(isValidColor('#gggggg')).toBe(false);
      expect(isValidColor('5865F2')).toBe(false);
      expect(isValidColor('#12')).toBe(false);
    });

    it('should validate rgb colors', () => {
      expect(isValidColor('rgb(88, 101, 242)')).toBe(true);
      expect(isValidColor('rgb(0, 0, 0)')).toBe(true);
      expect(isValidColor('rgb(255, 255, 255)')).toBe(true);
    });

    it('should reject invalid rgb colors', () => {
      expect(isValidColor('rgb(256, 0, 0)')).toBe(false);
      expect(isValidColor('rgb(-1, 0, 0)')).toBe(false);
      expect(isValidColor('rgb(0, 0)')).toBe(false);
    });
  });

  describe('normalizeColor', () => {
    it('should normalize 3-digit hex to 6-digit', () => {
      expect(normalizeColor('#fff')).toBe('#ffffff');
      expect(normalizeColor('#000')).toBe('#000000');
      expect(normalizeColor('#abc')).toBe('#aabbcc');
    });

    it('should keep 6-digit hex unchanged', () => {
      expect(normalizeColor('#5865F2')).toBe('#5865f2');
      expect(normalizeColor('#000000')).toBe('#000000');
    });

    it('should convert to lowercase', () => {
      expect(normalizeColor('#FFFFFF')).toBe('#ffffff');
      expect(normalizeColor('#ABC123')).toBe('#abc123');
    });
  });

  describe('hexToRgb', () => {
    it('should convert hex to rgb', () => {
      expect(hexToRgb('#5865F2')).toEqual({ r: 88, g: 101, b: 242 });
      expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should handle 3-digit hex', () => {
      expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb('#000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull();
      expect(hexToRgb('#gg')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('should convert rgb to hex', () => {
      expect(rgbToHex(88, 101, 242)).toBe('#5865f2');
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });

    it('should handle single digit values', () => {
      expect(rgbToHex(1, 2, 3)).toBe('#010203');
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
    });

    it('should clamp values to valid range', () => {
      expect(rgbToHex(256, 0, 0)).toBe('#ff0000');
      expect(rgbToHex(-1, 0, 0)).toBe('#000000');
    });
  });
});
