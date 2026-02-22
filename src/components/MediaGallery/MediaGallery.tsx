/**
 * MediaGallery Component
 * Display multiple images/videos
 */

import { useState } from 'react';
import type { MediaGalleryProps } from '../../types/components';
import { cn } from '../../utils/cn';
import { DeleteIcon, EditIcon } from '../Icon';
import styles from './MediaGallery.module.css';

export function MediaGallery({
  items,
  onEdit,
  onDelete,
  editable = false,
  className,
}: MediaGalleryProps) {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());

  const handleReveal = (index: number) => {
    setRevealedItems((prev) => new Set(prev).add(index));
  };

  const galleryContent = (
    <div className={cn(styles.gallery, className)}>
      {items.length === 0 ? (
        <div className={styles.empty}>No media items</div>
      ) : (
        items.map((item, index) => {
          const isRevealed = revealedItems.has(index);
          const showSpoiler = item.spoiler && !isRevealed;

          return (
            <div
              key={`${item.url}-${index}`}
              className={styles.item}
              onClick={() => showSpoiler && handleReveal(index)}
              onKeyDown={(e) => {
                if (showSpoiler && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleReveal(index);
                }
              }}
              role={showSpoiler ? 'button' : undefined}
              tabIndex={showSpoiler ? 0 : undefined}
            >
              <img
                src={item.url}
                alt={item.description || `Media ${index + 1}`}
                className={cn(styles.image, showSpoiler && styles.spoiler)}
              />
              {showSpoiler && (
                <div className={styles.spoilerOverlay}>
                  <span>SPOILER - Click to reveal</span>
                </div>
              )}
              {item.description && !showSpoiler && (
                <div className={styles.description}>{item.description}</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );

  if (!editable) {
    return galleryContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {galleryContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit media gallery"
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
            aria-label="Delete media gallery"
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
}
