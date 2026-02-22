/**
 * Markdown Feature Types
 */

export interface MarkdownRule {
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
}

export interface MarkdownParserOptions {
  enableSpoilers?: boolean;
  enableMentions?: boolean;
  enableChannels?: boolean;
  enableEmojis?: boolean;
  enableCodeBlocks?: boolean;
}

export interface ParsedMarkdown {
  html: string;
  mentions: string[];
  channels: string[];
  emojis: string[];
}
