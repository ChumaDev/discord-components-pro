/**
 * MarkdownPreview Component
 * Preview Discord markdown formatting
 */

import { useMemo } from 'react';
import type { MarkdownParserOptions } from '../../features/markdown';
import { parseDiscordMarkdown } from '../../features/markdown';
import { cn } from '../../utils/cn';
import styles from './MarkdownPreview.module.css';

export interface MarkdownPreviewProps {
  content: string;
  className?: string;
  options?: MarkdownParserOptions;
}

export function MarkdownPreview({ content, className, options }: MarkdownPreviewProps) {
  const html = useMemo(() => parseDiscordMarkdown(content, options), [content, options]);

  return (
    <div
      className={cn(styles.preview, className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Sanitized markdown
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
