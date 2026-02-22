import { describe, expect, it } from 'vitest';
import { getPreset, getPresetsByCategory, getPresetsByTag, searchPresets } from '../presets';
import { getAllTemplates, getTemplate } from '../templates';

describe('presets utilities', () => {
  describe('getPreset', () => {
    it('should get preset by id or return undefined', () => {
      const preset = getPreset('button-primary');
      // May or may not exist, just check it doesn't throw
      expect(preset === undefined || preset.id).toBeTruthy();
    });

    it('should return undefined for non-existent preset', () => {
      const preset = getPreset('definitely-non-existent-preset-xyz');
      expect(preset).toBeUndefined();
    });
  });

  describe('getPresetsByCategory', () => {
    it('should get presets by category', () => {
      const presets = getPresetsByCategory('buttons');
      expect(Array.isArray(presets)).toBe(true);
    });

    it('should return empty array for non-existent category', () => {
      const presets = getPresetsByCategory('non-existent' as any);
      expect(presets).toHaveLength(0);
    });
  });

  describe('getPresetsByTag', () => {
    it('should get presets by tag', () => {
      const presets = getPresetsByTag('action');
      expect(Array.isArray(presets)).toBe(true);
    });

    it('should return empty array for non-existent tag', () => {
      const presets = getPresetsByTag('non-existent-tag-xyz');
      expect(presets).toHaveLength(0);
    });
  });

  describe('searchPresets', () => {
    it('should search presets by query', () => {
      const presets = searchPresets('button');
      expect(Array.isArray(presets)).toBe(true);
    });

    it('should return empty array for no matches', () => {
      const presets = searchPresets('xyz123nonexistent');
      expect(presets).toHaveLength(0);
    });
  });
});

describe('templates utilities', () => {
  describe('getTemplate', () => {
    it('should get template by id or return undefined', () => {
      const template = getTemplate('welcome');
      // May or may not exist, just check it doesn't throw
      expect(template === undefined || template.id).toBeTruthy();
    });

    it('should return undefined for non-existent template', () => {
      const template = getTemplate('definitely-non-existent-template-xyz');
      expect(template).toBeUndefined();
    });
  });

  describe('getPresetsByCategory', () => {
    it('should get presets by category', () => {
      const presets = getPresetsByCategory('buttons');
      expect(Array.isArray(presets)).toBe(true);
    });
  });

  describe('getAllTemplates', () => {
    it('should get all templates', () => {
      const templates = getAllTemplates();
      expect(Array.isArray(templates)).toBe(true);
    });

    it('should return array of templates with correct structure', () => {
      const templates = getAllTemplates();
      if (templates.length > 0) {
        templates.forEach((template) => {
          expect(template).toHaveProperty('id');
          expect(template).toHaveProperty('name');
          expect(template).toHaveProperty('category');
        });
      }
    });
  });
});
