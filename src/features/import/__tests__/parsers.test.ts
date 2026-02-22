/**
 * Import Parsers Tests
 */

import { describe, expect, it } from 'vitest';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import { parseJSON } from '../parsers/json';

describe('parseJSON', () => {
  it('should parse Discord message format', () => {
    const json = JSON.stringify({
      components: [
        {
          type: ComponentType.Button,
          style: ButtonStyle.Primary,
          label: 'Test',
          custom_id: 'test',
        },
      ],
      flags: 128,
    });

    const components = parseJSON(json);

    expect(components).toHaveLength(1);
    expect(components[0]?.type).toBe(ComponentType.Button);
  });

  it('should parse array of components', () => {
    const json = JSON.stringify([
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'Button 1',
        custom_id: 'btn1',
      },
      {
        type: ComponentType.Button,
        style: ButtonStyle.Secondary,
        label: 'Button 2',
        custom_id: 'btn2',
      },
    ]);

    const components = parseJSON(json);

    expect(components).toHaveLength(2);
    expect(components[0]?.type).toBe(ComponentType.Button);
    expect(components[1]?.type).toBe(ComponentType.Button);
  });

  it('should throw error for invalid JSON syntax', () => {
    const invalidJSON = '{ invalid json }';

    expect(() => parseJSON(invalidJSON)).toThrow('Invalid JSON syntax');
  });

  it('should throw error for invalid format', () => {
    const json = JSON.stringify({ invalid: 'format' });

    expect(() => parseJSON(json)).toThrow(
      'Invalid JSON format. Expected components array or Discord message object.'
    );
  });

  it('should handle empty components array', () => {
    const json = JSON.stringify({ components: [] });

    const components = parseJSON(json);

    expect(components).toHaveLength(0);
  });

  it('should handle empty array', () => {
    const json = JSON.stringify([]);

    const components = parseJSON(json);

    expect(components).toHaveLength(0);
  });

  it('should preserve component properties', () => {
    const original = {
      type: ComponentType.Button,
      style: ButtonStyle.Primary,
      label: 'Test Button',
      custom_id: 'test_btn',
      disabled: false,
    };

    const json = JSON.stringify([original]);
    const components = parseJSON(json);

    expect(components[0]).toEqual(original);
  });

  it('should handle nested components', () => {
    const json = JSON.stringify({
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.Button,
              style: ButtonStyle.Primary,
              label: 'Nested',
              custom_id: 'nested',
            },
          ],
        },
      ],
    });

    const components = parseJSON(json);

    expect(components).toHaveLength(1);
    expect(components[0]?.type).toBe(ComponentType.ActionRow);
  });

  it('should throw error for null', () => {
    const json = 'null';

    expect(() => parseJSON(json)).toThrow();
  });

  it('should throw error for primitive values', () => {
    expect(() => parseJSON('"string"')).toThrow();
    expect(() => parseJSON('123')).toThrow();
    expect(() => parseJSON('true')).toThrow();
  });

  it('should handle complex component structures', () => {
    const json = JSON.stringify({
      components: [
        {
          type: ComponentType.StringSelect,
          custom_id: 'select',
          options: [
            { label: 'Option 1', value: 'opt1' },
            { label: 'Option 2', value: 'opt2' },
          ],
          placeholder: 'Choose an option',
        },
      ],
    });

    const components = parseJSON(json);

    expect(components).toHaveLength(1);
    expect(components[0]?.type).toBe(ComponentType.StringSelect);
  });
});
