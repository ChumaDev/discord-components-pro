/**
 * SortableItem Component
 * Wrapper for making components draggable
 */

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { ReactNode } from 'react';
import styles from './SortableItem.module.css';

export interface SortableItemProps {
  id: string;
  children: ReactNode;
  disabled?: boolean;
}

export function SortableItem({ id, children, disabled = false }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={styles.sortableItem}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
