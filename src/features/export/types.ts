/**
 * Export Feature Types
 */

export type ExportFormat = 'json' | 'discord.js' | 'python' | 'typescript';

export interface ExportOptions {
  format: ExportFormat;
  minify?: boolean;
  includeMetadata?: boolean;
}

export interface ExportResult {
  content: string;
  format: ExportFormat;
  size: number;
}

export interface DownloadOptions extends ExportOptions {
  filename?: string;
}
