/**
 * Export Utilities
 */

import type { DiscordComponent } from '../../types/discord';
import { formatDiscordJS } from './formatters/discordjs';
import { formatJSON } from './formatters/json';
import { formatPython } from './formatters/python';
import { formatTypeScript } from './formatters/typescript';
import type { ExportOptions, ExportResult } from './types';

/**
 * Export components to specified format
 */
export function exportComponents(
  components: DiscordComponent[],
  options: ExportOptions
): ExportResult {
  let content: string;

  switch (options.format) {
    case 'json':
      content = formatJSON(components, options);
      break;
    case 'discord.js':
      content = formatDiscordJS(components);
      break;
    case 'typescript':
      content = formatTypeScript(components);
      break;
    case 'python':
      content = formatPython(components);
      break;
    default:
      content = formatJSON(components, options);
  }

  return {
    content,
    format: options.format,
    size: new Blob([content]).size,
  };
}

/**
 * Create downloadable file
 */
export function createDownloadBlob(content: string): Blob {
  return new Blob([content], { type: 'text/plain' });
}

/**
 * Get file extension for format
 */
export function getFileExtension(format: ExportOptions['format']): string {
  const extensions: Record<ExportOptions['format'], string> = {
    json: 'json',
    'discord.js': 'js',
    typescript: 'ts',
    python: 'py',
  };

  return extensions[format] || 'txt';
}

/**
 * Generate filename with timestamp
 */
export function generateFilename(format: ExportOptions['format'], prefix = 'components'): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const extension = getFileExtension(format);
  return `${prefix}_${timestamp}.${extension}`;
}

/**
 * Download file to user's system
 */
export function downloadFile(content: string, filename: string): void {
  const blob = createDownloadBlob(content);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy content to clipboard
 */
export async function copyToClipboard(content: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
