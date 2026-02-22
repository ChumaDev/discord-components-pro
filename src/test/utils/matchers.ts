import type { DiscordComponent } from '../../types/discord';

/**
 * Custom matchers for testing
 */

export function expectComponentToHaveId(component: DiscordComponent, id: string) {
  if (component.id !== id) {
    throw new Error(`Expected component to have id "${id}", got "${component.id}"`);
  }
}

export function expectComponentToHaveType(
  component: DiscordComponent,
  type: DiscordComponent['type']
) {
  if (component.type !== type) {
    throw new Error(`Expected component to have type "${type}", got "${component.type}"`);
  }
}

export function expectComponentArrayToHaveLength(components: DiscordComponent[], length: number) {
  if (components.length !== length) {
    throw new Error(`Expected array to have length ${length}, got ${components.length}`);
  }
}

export function expectComponentToBeValid(component: DiscordComponent) {
  if (!component.id) {
    throw new Error('Component must have an id');
  }
  if (!component.type) {
    throw new Error('Component must have a type');
  }
}
