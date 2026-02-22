/**
 * Import Validation Tests
 */

import { describe, expect, it } from 'vitest';
import type { ButtonComponent, DiscordComponent } from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import { isValidComponent, normalizeComponent, validateComponents } from '../validation';

describe('isValidComponent', () => {
  it('should validate valid button component', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test',
      custom_id: 'test',
    };

    expect(isValidComponent(component)).toBe(true);
  });

  it('should validate component with ID', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test',
      custom_id: 'test',
      id: 'btn1',
    };

    expect(isValidComponent(component)).toBe(true);
  });

  it('should reject null', () => {
    expect(isValidComponent(null)).toBe(false);
  });

  it('should reject undefined', () => {
    expect(isValidComponent(undefined)).toBe(false);
  });

  it('should reject non-object', () => {
    expect(isValidComponent('string')).toBe(false);
    expect(isValidComponent(123)).toBe(false);
    expect(isValidComponent(true)).toBe(false);
  });

  it('should reject object without type', () => {
    const invalid = { label: 'Test' };
    expect(isValidComponent(invalid)).toBe(false);
  });

  it('should reject object with invalid type', () => {
    const invalid = { type: 999, label: 'Test' };
    expect(isValidComponent(invalid)).toBe(false);
  });

  it('should accept all valid component types', () => {
    const validTypes = [
      ComponentType.ActionRow,
      ComponentType.Button,
      ComponentType.StringSelect,
      ComponentType.TextDisplay,
      ComponentType.Container,
    ];

    validTypes.forEach((type) => {
      expect(isValidComponent({ type })).toBe(true);
    });
  });
});

describe('normalizeComponent', () => {
  it('should preserve existing ID', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test',
      custom_id: 'test',
      id: 'existing_id',
    };

    const normalized = normalizeComponent(component);
    expect(normalized.id).toBe('existing_id');
  });

  it('should generate ID if missing', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test',
      custom_id: 'test',
    };

    const normalized = normalizeComponent(component);
    expect(normalized.id).toBeTruthy();
    expect(typeof normalized.id).toBe('string');
  });

  it('should preserve all component properties', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test Button',
      custom_id: 'test_btn',
    };

    const normalized = normalizeComponent(component);
    expect(normalized.type).toBe(component.type);
    expect((normalized as ButtonComponent).style).toBe(component.style);
    expect((normalized as ButtonComponent).label).toBe(component.label);
    expect((normalized as ButtonComponent).custom_id).toBe(component.custom_id);
  });

  it('should not mutate original component', () => {
    const component: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test',
      custom_id: 'test',
    };

    const original = { ...component };
    normalizeComponent(component);

    expect(component).toEqual(original);
  });
});

describe('validateComponents', () => {
  it('should validate all valid components', () => {
    const components: DiscordComponent[] = [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'Button 1',
        custom_id: 'btn1',
      } as ButtonComponent,
      {
        type: ComponentType.Button,
        style: ButtonStyle.Secondary,
        label: 'Button 2',
        custom_id: 'btn2',
      } as ButtonComponent,
    ];

    const result = validateComponents(components);

    expect(result.valid).toHaveLength(2);
    expect(result.invalid).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should filter out invalid components', () => {
    const components = [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'Valid',
        custom_id: 'valid',
      },
      { invalid: 'component' },
      null,
      'string',
    ];

    const result = validateComponents(components);

    expect(result.valid).toHaveLength(1);
    expect(result.invalid).toHaveLength(3);
    expect(result.warnings).toHaveLength(3);
  });

  it('should generate warnings for invalid components', () => {
    const components = [{ type: ComponentType.Button, label: 'Valid' }, { invalid: 'component' }];

    const result = validateComponents(components);

    expect(result.warnings).toContain('Component at index 1 is invalid and was skipped');
  });

  it('should normalize all valid components', () => {
    const components: DiscordComponent[] = [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'Button',
        custom_id: 'btn',
      } as ButtonComponent,
    ];

    const result = validateComponents(components);

    expect(result.valid[0]?.id).toBeTruthy();
  });

  it('should handle empty array', () => {
    const result = validateComponents([]);

    expect(result.valid).toHaveLength(0);
    expect(result.invalid).toHaveLength(0);
    expect(result.warnings).toHaveLength(0);
  });

  it('should handle all invalid components', () => {
    const components = [null, undefined, 'string', 123, {}];

    const result = validateComponents(components);

    expect(result.valid).toHaveLength(0);
    expect(result.invalid).toHaveLength(5);
    expect(result.warnings).toHaveLength(5);
  });

  it('should preserve order of valid components', () => {
    const components: DiscordComponent[] = [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'First',
        custom_id: 'first',
      } as ButtonComponent,
      {
        type: ComponentType.Button,
        style: ButtonStyle.Secondary,
        label: 'Second',
        custom_id: 'second',
      } as ButtonComponent,
    ];

    const result = validateComponents(components);

    expect((result.valid[0] as ButtonComponent).label).toBe('First');
    expect((result.valid[1] as ButtonComponent).label).toBe('Second');
  });
});
