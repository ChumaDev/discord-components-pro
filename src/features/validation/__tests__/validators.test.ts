/**
 * Validation Validators Tests
 */

import { describe, expect, it } from 'vitest';
import type {
  ButtonComponent,
  StringSelectComponent,
  TextDisplayComponent,
} from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import {
  validateButtonLabel,
  validateComponent,
  validateCustomId,
  validateTextContent,
  validateUrl,
} from '../validators';

describe('validateComponent', () => {
  it('should validate valid button component', () => {
    const button: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Click me',
      custom_id: 'button_1',
    };

    const result = validateComponent(button);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate valid string select component', () => {
    const select: StringSelectComponent = {
      type: ComponentType.StringSelect,
      custom_id: 'select_1',
      options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
      ],
    };

    const result = validateComponent(select);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate valid text display component', () => {
    const text: TextDisplayComponent = {
      type: ComponentType.TextDisplay,
      content: 'Hello world',
    };

    const result = validateComponent(text);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should return errors for invalid button', () => {
    const button: ButtonComponent = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'a'.repeat(100), // Too long
      custom_id: 'button_1',
    };

    const result = validateComponent(button);
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

describe('validateUrl', () => {
  it('should validate valid URLs', () => {
    expect(validateUrl('https://discord.com')).toBe(true);
    expect(validateUrl('https://example.com/path')).toBe(true);
    expect(validateUrl('https://example.com/path?query=value')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(validateUrl('not-a-url')).toBe(false);
    expect(validateUrl('')).toBe(false);
    expect(validateUrl('invalid')).toBe(false);
  });
});

describe('validateCustomId', () => {
  it('should validate valid custom IDs', () => {
    const result = validateCustomId('button_1');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty custom ID', () => {
    const result = validateCustomId('');
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe('required');
  });

  it('should reject too long custom ID', () => {
    const result = validateCustomId('a'.repeat(200));
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe('too_long');
  });
});

describe('validateButtonLabel', () => {
  it('should validate valid button labels', () => {
    const result = validateButtonLabel('Click me');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty label', () => {
    const result = validateButtonLabel('');
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe('required');
  });

  it('should reject too long label', () => {
    const result = validateButtonLabel('a'.repeat(100));
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe('too_long');
  });
});

describe('validateTextContent', () => {
  it('should validate valid text content', () => {
    const result = validateTextContent('Hello world');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should validate empty content', () => {
    const result = validateTextContent('');
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject too long content', () => {
    const result = validateTextContent('a'.repeat(5000));
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]?.code).toBe('too_long');
  });
});
