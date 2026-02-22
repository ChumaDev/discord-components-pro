/**
 * Separator Component
 * Visual separator with configurable spacing
 */

import type { SeparatorProps } from '../../types/components';
import { SeparatorSpacing } from '../../types/discord';
import { cn } from '../../utils/cn';
import { DeleteIcon, EditIcon } from '../Icon';
import styles from './Separator.module.css';

const spacingClassMap = {
  [SeparatorSpacing.None]: styles['spacing-none'],
  [SeparatorSpacing.Small]: styles['spacing-small'],
  [SeparatorSpacing.Large]: styles['spacing-large'],
};

export function Separator({
  spacing = SeparatorSpacing.Small,
  divider = true,
  onEdit,
  onDelete,
  editable = false,
  className,
}: SeparatorProps) {
  const separatorContent = (
    <div
      className={cn(
        styles.separator,
        spacingClassMap[spacing],
        divider ? styles.divider : styles.noDivider,
        className
      )}
      role="separator"
      aria-orientation="horizontal"
      tabIndex={0}
    />
  );

  if (!editable) {
    return separatorContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {separatorContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit separator"
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
            aria-label="Delete separator"
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
}
