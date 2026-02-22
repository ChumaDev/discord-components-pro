/**
 * Button Component
 * Discord-style button with multiple styles and custom emoji support
 */

import { useComponentValidation } from '../../features/validation';
import type { ButtonProps } from '../../types/components';
import { type ButtonComponent, ButtonStyle, ComponentType } from '../../types/discord';
import { cn } from '../../utils/cn';
import { DeleteIcon, EditIcon } from '../Icon';
import styles from './Button.module.css';

const styleClassMap = {
  [ButtonStyle.Primary]: styles.primary,
  [ButtonStyle.Secondary]: styles.secondary,
  [ButtonStyle.Success]: styles.success,
  [ButtonStyle.Danger]: styles.danger,
  [ButtonStyle.Link]: styles.link,
};

/**
 * Render emoji - supports both string (Unicode) and Discord custom emoji object
 */
function renderEmoji(emoji: string | { name?: string; id?: string; animated?: boolean }) {
  // String emoji (Unicode like "👍" or ":smile:")
  if (typeof emoji === 'string') {
    return <span className={styles.emoji}>{emoji}</span>;
  }

  // Discord custom emoji with ID
  if (emoji.id) {
    const extension = emoji.animated ? 'gif' : 'png';
    return (
      <img
        src={`https://cdn.discordapp.com/emojis/${emoji.id}.${extension}`}
        alt={emoji.name || 'emoji'}
        className={styles.customEmoji}
        loading="lazy"
      />
    );
  }

  // Emoji object with only name (fallback to Unicode)
  if (emoji.name) {
    return <span className={styles.emoji}>{emoji.name}</span>;
  }

  return null;
}

export function Button({
  style,
  label,
  customId,
  url,
  disabled = false,
  emoji,
  onClick,
  onEdit,
  onDelete,
  editable = false,
  className,
  id,
}: ButtonProps) {
  const component: ButtonComponent = {
    type: ComponentType.Button,
    style,
    label,
    custom_id: customId,
    url,
    disabled,
    emoji: typeof emoji === 'string' ? { name: emoji } : emoji,
    id,
  };

  const { isValid, errors } = useComponentValidation(component);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && onClick) {
      onClick();
    }
  };

  const buttonContent = (
    <button
      type="button"
      className={cn(styles.button, styleClassMap[style], !isValid && styles.error, className)}
      disabled={disabled}
      onClick={handleClick}
      aria-label={label}
    >
      {emoji && renderEmoji(emoji)}
      <span>{label}</span>
    </button>
  );

  if (!editable) {
    return buttonContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {buttonContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit button"
          >
            <EditIcon />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.delete)}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete button"
          >
            <DeleteIcon />
          </button>
        )}
      </div>

      {!isValid && errors.length > 0 && (
        <div className={styles.errorMessage}>{errors[0]?.message}</div>
      )}
    </div>
  );
}
