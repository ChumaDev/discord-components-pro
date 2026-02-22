/**
 * Container Component
 * Groups components with optional accent color and spoiler
 */

import { useState } from 'react';
import type { ContainerProps } from '../../types/components';
import { ContainerAccent } from '../../types/discord';
import { cn } from '../../utils/cn';
import { DeleteIcon, EditIcon } from '../Icon';
import styles from './Container.module.css';

const accentClassMap = {
  [ContainerAccent.None]: styles['accent-none'],
  [ContainerAccent.Primary]: styles['accent-primary'],
  [ContainerAccent.Secondary]: styles['accent-secondary'],
  [ContainerAccent.Success]: styles['accent-success'],
  [ContainerAccent.Danger]: styles['accent-danger'],
};

export function Container({
  children,
  accent = ContainerAccent.None,
  spoiler = false,
  onEdit,
  onDelete,
  editable = false,
  className,
}: ContainerProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleSpoilerClick = () => {
    if (spoiler && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const containerContent = (
    <div
      className={cn(
        styles.container,
        accentClassMap[accent],
        spoiler && styles.spoiler,
        isRevealed && styles.revealed,
        className
      )}
      onClick={handleSpoilerClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSpoilerClick();
        }
      }}
      role={spoiler ? 'button' : undefined}
      tabIndex={spoiler ? 0 : undefined}
    >
      {spoiler && !isRevealed && <div className={styles.spoilerOverlay}>Click to reveal</div>}

      <div className={styles.children}>
        {children || <div className={styles.empty}>Empty container</div>}
      </div>
    </div>
  );

  if (!editable) {
    return containerContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {containerContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit container"
          >
            <EditIcon title="Edit container" />
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
            aria-label="Delete container"
          >
            <DeleteIcon title="Delete container" />
          </button>
        )}
      </div>
    </div>
  );
}
