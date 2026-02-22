import { describe, expect, it } from 'vitest';
import { generateCustomId, generateId, generateShortId } from '../id';

describe('id utilities', () => {
  describe('generateId', () => {
    it('should generate a unique id', () => {
      const id1 = generateId();
      const id2 = generateId();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should generate id with correct format', () => {
      const id = generateId();
      expect(id).toMatch(/^component-[a-z0-9-]+$/);
    });

    it('should generate id with reasonable length', () => {
      const id = generateId();
      expect(id.length).toBeGreaterThan(10);
      expect(id.length).toBeLessThan(50);
    });

    it('should accept custom prefix', () => {
      const id = generateId('custom');
      expect(id).toMatch(/^custom-[a-z0-9-]+$/);
    });
  });

  describe('generateShortId', () => {
    it('should generate short unique ids', () => {
      const id1 = generateShortId();
      const id2 = generateShortId();

      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
      expect(id1).not.toBe(id2);
    });

    it('should generate shorter ids than generateId', () => {
      const shortId = generateShortId();
      const longId = generateId();

      expect(shortId.length).toBeLessThan(longId.length);
    });
  });

  describe('generateCustomId', () => {
    it('should generate id with component type', () => {
      const id = generateCustomId('button');
      expect(id).toMatch(/^button-[a-z0-9]+$/);
    });

    it('should generate unique ids for same type', () => {
      const id1 = generateCustomId('text');
      const id2 = generateCustomId('text');

      expect(id1).not.toBe(id2);
    });
  });
});
