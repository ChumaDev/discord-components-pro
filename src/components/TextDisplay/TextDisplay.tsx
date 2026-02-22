/**
 * TextDisplay Component
 * Displays text content in Discord style
 */

import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useComponentValidation } from '../../features/validation';
import type { TextDisplayProps } from '../../types/components';
import { ComponentType, type TextDisplayComponent } from '../../types/discord';
import { cn } from '../../utils/cn';
import { DeleteIcon } from '../Icon';
import styles from './TextDisplay.module.css';

export function TextDisplay({
  content,
  onChange,
  editable = false,
  className,
  onDelete,
  draggable = false,
  id,
}: TextDisplayProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localContent, setLocalContent] = useState(content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const component: TextDisplayComponent = {
    type: ComponentType.TextDisplay,
    content: localContent,
    id,
  };

  const { isValid, errors } = useComponentValidation(component);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const handleClick = () => {
    if (editable && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (editable && !isEditing && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (onChange && localContent !== content) {
      onChange(localContent);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalContent(e.target.value);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setLocalContent(content);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={cn(
        styles.textDisplay,
        editable && styles.editable,
        isEditing && styles.editing,
        !isValid && styles.error,
        className
      )}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role={editable && !isEditing ? 'button' : undefined}
      tabIndex={editable && !isEditing ? 0 : undefined}
    >
      {draggable && (
        <div className={styles.dragHandle}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            role="img"
            aria-label="Drag handle"
          >
            <title>Drag handle</title>
            <path d="M5 3h2v2H5V3zm4 0h2v2H9V3zM5 7h2v2H5V7zm4 0h2v2H9V7zm-4 4h2v2H5v-2zm4 0h2v2H9v-2z" />
          </svg>
        </div>
      )}

      {isEditing ? (
        <TextareaAutosize
          ref={textareaRef}
          value={localContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleTextareaKeyDown}
          className={styles.textarea}
          minRows={1}
          maxRows={20}
        />
      ) : (
        <div>{localContent || 'Click to edit text...'}</div>
      )}

      {editable && !isEditing && (
        <div className={styles.controls}>
          {onDelete && (
            <button
              type="button"
              className={cn(styles.controlButton, styles.delete)}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Delete component"
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      )}

      {!isValid && errors.length > 0 && (
        <div className={styles.errorMessage}>{errors[0]?.message}</div>
      )}
    </div>
  );
}
