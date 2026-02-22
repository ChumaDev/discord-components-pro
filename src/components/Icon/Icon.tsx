/**
 * Icon Component
 * Accessible SVG icon wrapper
 */

import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  title?: string;
  children: React.ReactNode;
}

export function Icon({ title, children, ...props }: IconProps) {
  return (
    <svg {...props} role="img" aria-label={title}>
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

// Common icon components with accessibility
export function EditIcon({ title = 'Edit', ...props }: Omit<IconProps, 'children'>) {
  return (
    <Icon title={title} width="12" height="12" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M12.146.854a.5.5 0 0 1 .708 0l2.292 2.292a.5.5 0 0 1 0 .708l-10 10A.5.5 0 0 1 4.793 14H2.5a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l10-10zM11.207 2L2 11.207V13h1.793L13 3.793 11.207 2z" />
    </Icon>
  );
}

export function DeleteIcon({ title = 'Delete', ...props }: Omit<IconProps, 'children'>) {
  return (
    <Icon title={title} width="12" height="12" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M11.5 3.5L8 7l3.5 3.5L10 12 6.5 8.5 3 12 1.5 10.5 5 7 1.5 3.5 3 2l3.5 3.5L10 2l1.5 1.5z" />
    </Icon>
  );
}

export function CloseIcon({ title = 'Close', ...props }: Omit<IconProps, 'children'>) {
  return (
    <Icon title={title} width="16" height="16" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M11.5 3.5L8 7l3.5 3.5L10 12 6.5 8.5 3 12 1.5 10.5 5 7 1.5 3.5 3 2l3.5 3.5L10 2l1.5 1.5z" />
    </Icon>
  );
}

export function ChevronDownIcon({ title = 'Expand', ...props }: Omit<IconProps, 'children'>) {
  return (
    <Icon title={title} width="12" height="12" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M4.427 7.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 7H4.604a.25.25 0 00-.177.427z" />
    </Icon>
  );
}

export function CheckIcon({ title = 'Selected', ...props }: Omit<IconProps, 'children'>) {
  return (
    <Icon title={title} width="12" height="12" viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z" />
    </Icon>
  );
}
