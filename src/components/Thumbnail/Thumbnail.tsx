/**
 * Thumbnail Component
 * Display a single thumbnail image
 */

import type { ThumbnailProps } from '../../types/components';
import { cn } from '../../utils/cn';
import { DeleteIcon, EditIcon } from '../Icon';
import styles from './Thumbnail.module.css';

export function Thumbnail({ url, onEdit, onDelete, editable = false, className }: ThumbnailProps) {
  const thumbnailContent = (
    <div className={cn(styles.thumbnail, className)}>
      {url ? (
        <img src={url} alt="Thumbnail" className={styles.image} />
      ) : (
        <div className={styles.placeholder}>No image</div>
      )}
    </div>
  );

  if (!editable) {
    return thumbnailContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {thumbnailContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit thumbnail"
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
            aria-label="Delete thumbnail"
          >
            <DeleteIcon />
          </button>
        )}
      </div>
    </div>
  );
}
