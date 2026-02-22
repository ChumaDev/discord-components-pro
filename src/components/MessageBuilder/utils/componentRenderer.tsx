/**
 * Component Renderer
 * Renders Discord components based on type
 */

import type { ReactElement } from 'react';
import type {
  ActionRowComponent,
  ButtonComponent,
  ContainerComponent,
  DiscordComponent,
  SeparatorComponent,
  StringSelectComponent,
  TextDisplayComponent,
} from '../../../types/discord';
import { ComponentType } from '../../../types/discord';
import { ActionRow } from '../../ActionRow';
import { Button } from '../../Button';
import { Container } from '../../Container';
import { Separator } from '../../Separator';
import { StringSelect } from '../../StringSelect';
import { TextDisplay } from '../../TextDisplay';

export function renderComponent(component: DiscordComponent, editable: boolean): ReactElement {
  const key = component.id;

  switch (component.type) {
    case ComponentType.TextDisplay:
      return (
        <TextDisplay
          key={key}
          content={(component as TextDisplayComponent).content}
          editable={editable}
          id={component.id}
        />
      );

    case ComponentType.Button:
      return (
        <Button
          key={key}
          style={(component as ButtonComponent).style}
          label={(component as ButtonComponent).label}
          customId={(component as ButtonComponent).custom_id}
          url={(component as ButtonComponent).url}
          disabled={(component as ButtonComponent).disabled}
          editable={editable}
          id={component.id}
        />
      );

    case ComponentType.StringSelect:
      return (
        <StringSelect
          key={key}
          customId={(component as StringSelectComponent).custom_id}
          placeholder={(component as StringSelectComponent).placeholder}
          options={(component as StringSelectComponent).options}
          minValues={(component as StringSelectComponent).min_values}
          maxValues={(component as StringSelectComponent).max_values}
          disabled={(component as StringSelectComponent).disabled}
          editable={editable}
          id={component.id}
        />
      );

    case ComponentType.Container:
      return (
        <Container
          key={key}
          accent={(component as ContainerComponent).accent}
          spoiler={(component as ContainerComponent).spoiler}
          editable={editable}
          id={component.id}
        >
          {(component as ContainerComponent).components?.map((child) =>
            renderComponent(child, editable)
          )}
        </Container>
      );

    case ComponentType.ActionRow:
      return (
        <ActionRow key={key} editable={editable} id={component.id}>
          {(component as ActionRowComponent).components?.map((child) =>
            renderComponent(child, editable)
          )}
        </ActionRow>
      );

    case ComponentType.Separator:
      return (
        <Separator
          key={key}
          spacing={(component as SeparatorComponent).spacing}
          divider={(component as SeparatorComponent).divider}
          editable={editable}
        />
      );

    default:
      return (
        <div
          key={key}
          style={{
            padding: '12px',
            background: '#f23f43',
            color: 'white',
            borderRadius: '8px',
            margin: '8px 0',
            fontWeight: 600,
          }}
        >
          Unknown component type: {component.type} ({ComponentType[component.type] || 'undefined'})
        </div>
      );
  }
}
