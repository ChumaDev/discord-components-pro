/**
 * MessageBuilder Component
 * Complete message builder with drag & drop and component management
 */

import { useMemo, useState } from 'react';
import {
  DndContext,
  SortableContext,
  useDragAndDrop,
  verticalListSortingStrategy,
} from '../../features/dnd';
import { useExport } from '../../features/export';
import { useKeyboardShortcuts } from '../../features/keyboard';
import { useComponents } from '../../hooks/useComponents';
import type { MessageBuilderProps } from '../../types/components';
import type { ComponentType } from '../../types/discord';
import { SortableItem } from '../SortableItem';
import styles from './MessageBuilder.module.css';
import { createDefaultComponent } from './utils/componentFactory';
import { renderComponent } from './utils/componentRenderer';
import { COMPONENT_MENU_ITEMS, type ComponentMenuItem } from './utils/constants';

export function MessageBuilder({ theme = 'dark', editable = true }: MessageBuilderProps) {
  const { components, addComponent, clearComponents, undo, redo, canUndo, canRedo } =
    useComponents();
  const { copyToClipboard } = useExport();
  const { sensors, handleDragStart, handleDragEnd, collisionDetection, componentIds } =
    useDragAndDrop();
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Keyboard shortcuts
  const shortcuts = useMemo(
    () => [
      { key: 'z', ctrl: true, action: undo, description: 'Undo' },
      { key: 'y', ctrl: true, action: redo, description: 'Redo' },
      { key: 'z', ctrl: true, shift: true, action: redo, description: 'Redo (alternative)' },
    ],
    [undo, redo]
  );

  useKeyboardShortcuts(shortcuts, { enabled: editable });

  const handleExport = async () => {
    const success = await copyToClipboard(components, { format: 'json' });
    if (success) {
      alert('Copied to clipboard!');
    }
  };

  const handleClear = () => {
    if (confirm('Clear all components?')) {
      clearComponents();
    }
  };

  const handleAddComponent = (type: ComponentType) => {
    const newComponent = createDefaultComponent(type);
    if (newComponent) {
      addComponent(newComponent);
      setShowAddMenu(false);
    }
  };

  const componentSize = useMemo(() => JSON.stringify(components).length, [components]);

  return (
    <div className={styles.builder} data-theme={theme}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Message Builder</h2>
        <div className={styles.actions}>
          {editable && (
            <>
              {/* Add Component Menu */}
              <div className={styles.addMenu}>
                <button
                  type="button"
                  className={styles.actionButton}
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  aria-label="Add component"
                  aria-expanded={showAddMenu}
                >
                  ➕ Add Component
                </button>
                {showAddMenu && (
                  <div className={styles.dropdown} role="menu">
                    {COMPONENT_MENU_ITEMS.map((item: ComponentMenuItem) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => handleAddComponent(item.type)}
                        role="menuitem"
                      >
                        {item.icon} {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Undo/Redo */}
              <button
                type="button"
                className={styles.actionButton}
                onClick={undo}
                disabled={!canUndo()}
                title="Undo (Ctrl+Z)"
                aria-label="Undo"
              >
                ↶ Undo
              </button>
              <button
                type="button"
                className={styles.actionButton}
                onClick={redo}
                disabled={!canRedo()}
                title="Redo (Ctrl+Y)"
                aria-label="Redo"
              >
                ↷ Redo
              </button>
            </>
          )}

          {/* Export/Clear */}
          <button
            type="button"
            className={styles.actionButton}
            onClick={handleExport}
            disabled={components.length === 0}
            aria-label="Export components"
          >
            📋 Export
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.danger}`}
            onClick={handleClear}
            disabled={components.length === 0}
            aria-label="Clear all components"
          >
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {components.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>📝</div>
            <div className={styles.emptyText}>No components yet</div>
            <div className={styles.emptyHint}>
              {editable
                ? 'Click "Add Component" to start building your message'
                : 'This message is empty'}
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetection}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={componentIds.filter((id): id is string => id !== undefined)}
              strategy={verticalListSortingStrategy}
            >
              <div className={styles.componentList}>
                {components.map((component) =>
                  component.id ? (
                    <SortableItem key={component.id} id={component.id} disabled={!editable}>
                      {renderComponent(component, editable)}
                    </SortableItem>
                  ) : null
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>Components:</span>
            <span className={styles.statValue}>{components.length}</span>
          </div>
          <div className={styles.stat}>
            <span>Size:</span>
            <span className={styles.statValue}>{componentSize} bytes</span>
          </div>
        </div>
        <div className={styles.mode}>{editable ? 'Editable' : 'Read-only'}</div>
      </div>
    </div>
  );
}
