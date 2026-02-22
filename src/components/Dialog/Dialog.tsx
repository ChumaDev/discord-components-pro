/**
 * Dialog Component
 * Modal dialog with Radix UI
 */

import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { CloseIcon } from '../Icon';
import styles from './Dialog.module.css';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  className,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>}

      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={styles.overlay} />
        <DialogPrimitive.Content className={cn(styles.content, className)}>
          <div className={styles.header}>
            <DialogPrimitive.Title className={styles.title}>{title}</DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className={styles.description}>
                {description}
              </DialogPrimitive.Description>
            )}
          </div>

          <div className={styles.body}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}

          <DialogPrimitive.Close className={styles.close} aria-label="Close">
            <CloseIcon />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

// Export sub-components for advanced usage
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogOverlay = DialogPrimitive.Overlay;
export const DialogContent = DialogPrimitive.Content;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
