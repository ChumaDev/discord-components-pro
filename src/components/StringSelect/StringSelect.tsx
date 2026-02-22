/**
 * StringSelect Component
 * Dropdown select menu with Radix UI
 */

import * as Select from '@radix-ui/react-select';
import type { StringSelectProps } from '../../types/components';
import { cn } from '../../utils/cn';
import { CheckIcon, ChevronDownIcon, DeleteIcon, EditIcon } from '../Icon';
import styles from './StringSelect.module.css';

export function StringSelect({
  options,
  placeholder = 'Select an option',
  disabled = false,
  onEdit,
  onDelete,
  editable = false,
  className,
  onChange,
  value,
}: StringSelectProps) {
  const selectContent = (
    <Select.Root value={value} onValueChange={onChange} disabled={disabled}>
      <Select.Trigger className={cn(styles.trigger, className)} aria-label={placeholder}>
        <Select.Value placeholder={placeholder} />
        <Select.Icon className={styles.icon}>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content} position="popper" sideOffset={5}>
          <Select.Viewport className={styles.viewport}>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className={styles.item}
                disabled={option.default}
              >
                <Select.ItemText>
                  {option.emoji && (
                    <span className={styles.emoji}>
                      {typeof option.emoji === 'string' ? option.emoji : option.emoji.name}
                    </span>
                  )}
                  <span className={styles.label}>{option.label}</span>
                  {option.description && (
                    <span className={styles.description}>{option.description}</span>
                  )}
                </Select.ItemText>
                <Select.ItemIndicator className={styles.indicator}>
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );

  if (!editable) {
    return selectContent;
  }

  return (
    <div className={cn(styles.wrapper, editable && styles.editable)}>
      {selectContent}

      <div className={styles.controls}>
        {onEdit && (
          <button
            type="button"
            className={cn(styles.controlButton, styles.edit)}
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            aria-label="Edit select menu"
          >
            <EditIcon title="Edit" />
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
            aria-label="Delete select menu"
          >
            <DeleteIcon title="Delete" />
          </button>
        )}
      </div>
    </div>
  );
}
