/**
 * ActionRow Component
 * Container for interactive components (buttons, selects)
 */

import type { ActionRowProps } from '../../types/components';
import { cn } from '../../utils/cn';
import { DeleteIcon } from '../Icon';
import styles from './ActionRow.module.css';

export function ActionRow({ children, onDelete, editable = false, className }: ActionRowProps) {
  const actionRowContent = (
    <div className={cn(styles.actionRow, className)}>
      {children || <div className={styles.empty}>Add buttons or select menus</div>}
    </div>
  );

  if (!editable) {
    return actionRowContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {actionRowContent}

      <div className={styles.controls}>
        {onDelete && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.delete)}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete action row"
          >
            <DeleteIcon title="Delete action row" />
          </button>
        )}
      </div>
    </div>
  );
}
