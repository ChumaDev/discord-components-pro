/**
 * EmojiPicker Component
 * Emoji picker using emoji-mart
 */

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useState } from 'react';
import { cn } from '../../utils/cn';
import styles from './EmojiPicker.module.css';

export interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  theme?: 'light' | 'dark';
  className?: string;
}

export function EmojiPicker({ onSelect, theme = 'dark', className }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: { native: string }) => {
    onSelect(emoji.native);
    setIsOpen(false);
  };

  return (
    <div className={cn(styles.emojiPicker, className)}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Pick emoji"
      >
        😀
      </button>

      {isOpen && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Close emoji picker"
          />
          <div className={styles.popover}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme={theme} />
          </div>
        </>
      )}
    </div>
  );
}
