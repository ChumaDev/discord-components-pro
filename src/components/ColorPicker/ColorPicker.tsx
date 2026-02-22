/**
 * ColorPicker Component
 * Simple color picker for Discord accent colors
 */

import { useState } from 'react';
import { cn } from '../../utils/cn';
import { DeleteIcon } from '../Icon';
import styles from './ColorPicker.module.css';

export interface ColorPickerProps {
  value?: string | null;
  onChange: (color: string | null) => void;
  className?: string;
}

const PRESET_COLORS = [
  '#5865F2', // Blurple
  '#57F287', // Green
  '#FEE75C', // Yellow
  '#ED4245', // Red
  '#EB459E', // Fuchsia
  '#3BA55D', // Dark Green
  '#FAA81A', // Orange
  '#9B59B6', // Purple
  '#E91E63', // Pink
  '#00AFF4', // Cyan
  '#99AAB5', // Gray
  '#2C2F33', // Dark Gray
];

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [customColor, setCustomColor] = useState(value || '#5865F2');

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onChange(color);
  };

  return (
    <div className={cn(styles.colorPicker, className)}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        style={{ backgroundColor: value || 'transparent' }}
        aria-label="Pick color"
      >
        {!value && <span className={styles.placeholder}>Pick color</span>}
      </button>

      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => onChange(null)}
          aria-label="Clear color"
        >
          <DeleteIcon />
        </button>
      )}

      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close color picker"
          />
          <div className={styles.popover}>
            <div className={styles.presets}>
              {PRESET_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(styles.preset, value === color && styles.active)}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  aria-label={`Select ${color}`}
                />
              ))}
            </div>
            <div className={styles.custom}>
              <label htmlFor="custom-color">Custom:</label>
              <input
                id="custom-color"
                type="color"
                value={customColor}
                onChange={handleCustomColorChange}
                className={styles.customInput}
              />
              <input
                type="text"
                value={customColor}
                onChange={(e) => {
                  setCustomColor(e.target.value);
                  if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
                    onChange(e.target.value);
                  }
                }}
                className={styles.hexInput}
                placeholder="#5865F2"
                maxLength={7}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
