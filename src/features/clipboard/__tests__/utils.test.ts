import { describe, expect, it } from 'vitest';
import { mockButton, mockComponents, mockTextDisplay } from '../../../test/utils';
import type { ButtonComponent, TextDisplayComponent } from '../../../types/discord';
import { cloneComponents, regenerateComponentIds } from '../utils';

describe('clipboard utils', () => {
  describe('regenerateComponentIds', () => {
    it('should regenerate ids for components', () => {
      const components = mockComponents();
      const originalIds = components.map((c) => c.id);

      const result = regenerateComponentIds(components);
      const newIds = result.map((c) => c.id);

      expect(result).toHaveLength(components.length);
      expect(newIds).not.toEqual(originalIds);
      for (const id of newIds) {
        expect(id).toBeTruthy();
        expect(originalIds).not.toContain(id);
      }
    });

    it('should preserve component data except ids', () => {
      const component = mockTextDisplay() as TextDisplayComponent;
      const result = regenerateComponentIds([component]);

      expect(result).toHaveLength(1);
      const first = result[0] as TextDisplayComponent;
      expect(first.type).toBe(component.type);
      expect(first.content).toBe(component.content);
      expect(first.id).not.toBe(component.id);
    });

    it('should handle empty array', () => {
      const result = regenerateComponentIds([]);
      expect(result).toHaveLength(0);
    });
  });

  describe('cloneComponents', () => {
    it('should clone components', () => {
      const components = [mockTextDisplay(), mockButton()];
      const result = cloneComponents(components);

      expect(result).toHaveLength(2);
      expect(result).not.toBe(components);
      expect(result[0]).not.toBe(components[0]);
    });

    it('should handle empty array', () => {
      const result = cloneComponents([]);
      expect(result).toHaveLength(0);
    });

    it('should preserve all component properties', () => {
      const component = mockButton() as ButtonComponent;
      const result = cloneComponents([component]);

      expect(result).toHaveLength(1);
      const first = result[0] as ButtonComponent;
      expect(first.id).toBe(component.id);
      expect(first.type).toBe(component.type);
      expect(first.label).toBe(component.label);
    });
  });
});
