import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ButtonStyle } from '../../types/discord';
import { Button } from '../Button';
import { SortableItem } from './SortableItem';

const meta = {
  title: 'Components/SortableItem',
  component: SortableItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SortableItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'item-1',
    children: <div style={{ padding: '1rem', background: '#2c2f33' }}>Drag me!</div>,
  },
};

export const Disabled: Story = {
  args: {
    id: 'item-1',
    disabled: true,
    children: <div style={{ padding: '1rem', background: '#2c2f33' }}>Cannot drag</div>,
  },
};

export const SortableList: Story = {
  args: {
    id: 'item-1',
    children: <div>Item</div>,
  },
  render: () => {
    const [items, setItems] = useState(['item-1', 'item-2', 'item-3', 'item-4']);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    };

    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((id, index) => (
              <SortableItem key={id} id={id}>
                <div
                  style={{
                    padding: '1rem',
                    background: '#2c2f33',
                    borderRadius: '4px',
                    cursor: 'grab',
                  }}
                >
                  Item {index + 1}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  },
};

export const SortableButtons: Story = {
  args: {
    id: 'btn-1',
    children: <Button style={ButtonStyle.Primary} label="Button" />,
  },
  render: () => {
    const [items, setItems] = useState(['btn-1', 'btn-2', 'btn-3']);

    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    const handleDragEnd = (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.indexOf(active.id as string);
          const newIndex = items.indexOf(over.id as string);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    };

    const buttonStyles: ButtonStyle[] = [
      ButtonStyle.Primary,
      ButtonStyle.Secondary,
      ButtonStyle.Success,
    ];

    return (
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {items.map((id, index) => (
              <SortableItem key={id} id={id}>
                <Button
                  style={buttonStyles[index] || ButtonStyle.Primary}
                  label={`Button ${index + 1}`}
                />
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  },
};
