import type { DiscordComponent } from '../../types/discord';
import { ButtonStyle, ComponentType } from '../../types/discord';
import { generateId } from '../../utils/id';

export function mockTextDisplay(): DiscordComponent {
  return {
    id: generateId('text'),
    type: ComponentType.TextDisplay,
    content: 'Test text',
  };
}

export function mockButton(): DiscordComponent {
  return {
    id: generateId('button'),
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: 'Test Button',
    custom_id: 'test',
  };
}

export function mockContainer(): DiscordComponent {
  return {
    id: generateId('container'),
    type: ComponentType.Container,
    components: [],
  };
}

export function mockActionRow(): DiscordComponent {
  return {
    id: generateId('action-row'),
    type: ComponentType.ActionRow,
    components: [],
  };
}

export function mockStringSelect(): DiscordComponent {
  return {
    id: generateId('select'),
    type: ComponentType.StringSelect,
    custom_id: 'test-select',
    options: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
    ],
  };
}

export function mockMediaGallery(): DiscordComponent {
  return {
    id: generateId('gallery'),
    type: ComponentType.MediaGallery,
    items: [{ url: 'https://example.com/image.png' }],
  };
}

export function mockComponents(): DiscordComponent[] {
  return [mockTextDisplay(), mockButton(), mockContainer()];
}

export function mockNestedComponents(): DiscordComponent[] {
  const container = mockContainer() as any;
  container.components = [mockTextDisplay(), mockButton()];

  const actionRow = mockActionRow() as any;
  actionRow.components = [mockButton(), mockButton()];

  return [container, actionRow];
}
