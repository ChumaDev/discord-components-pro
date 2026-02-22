/**
 * Markdown Parser Utilities
 * Discord markdown parsing logic
 */

import type { MarkdownParserOptions, MarkdownRule } from './types';

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Discord markdown rules
 */
export const MARKDOWN_RULES: MarkdownRule[] = [
  // Bold: **text** or __text__
  { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
  { pattern: /__(.+?)__/g, replacement: '<strong>$1</strong>' },

  // Italic: *text* or _text_
  { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
  { pattern: /_(.+?)_/g, replacement: '<em>$1</em>' },

  // Strikethrough: ~~text~~
  { pattern: /~~(.+?)~~/g, replacement: '<del>$1</del>' },

  // Underline: __text__
  { pattern: /__(.+?)__/g, replacement: '<u>$1</u>' },

  // Code: `code`
  { pattern: /`(.+?)`/g, replacement: '<code>$1</code>' },

  // Code block: ```code```
  { pattern: /```(.+?)```/gs, replacement: '<pre><code>$1</code></pre>' },

  // Spoiler: ||text||
  { pattern: /\|\|(.+?)\|\|/g, replacement: '<span class="spoiler">$1</span>' },

  // Quote: > text
  { pattern: /^&gt; (.+)$/gm, replacement: '<blockquote>$1</blockquote>' },

  // Links: [text](url)
  {
    pattern: /\[(.+?)\]\((.+?)\)/g,
    replacement: '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
  },

  // Mentions: @username
  { pattern: /@(\w+)/g, replacement: '<span class="mention">@$1</span>' },

  // Channels: #channel
  { pattern: /#(\w+)/g, replacement: '<span class="channel">#$1</span>' },

  // Emojis: :emoji:
  { pattern: /:(\w+):/g, replacement: '<span class="emoji">:$1:</span>' },
];

/**
 * Apply markdown rules to text
 */
export function applyMarkdownRules(text: string, rules: MarkdownRule[]): string {
  let result = text;

  for (const rule of rules) {
    if (typeof rule.replacement === 'string') {
      result = result.replace(rule.pattern, rule.replacement);
    } else {
      result = result.replace(rule.pattern, rule.replacement);
    }
  }

  return result;
}

/**
 * Parse Discord markdown to HTML
 */
export function parseDiscordMarkdown(text: string, options: MarkdownParserOptions = {}): string {
  const {
    enableSpoilers = true,
    enableMentions = true,
    enableChannels = true,
    enableEmojis = true,
    enableCodeBlocks = true,
  } = options;

  // Escape HTML first
  let html = escapeHtml(text);

  // Filter rules based on options
  const rules = MARKDOWN_RULES.filter((rule) => {
    const pattern = rule.pattern.source;
    if (!enableSpoilers && pattern.includes('\\|\\|')) return false;
    if (!enableMentions && pattern.includes('@')) return false;
    if (!enableChannels && pattern.includes('#')) return false;
    if (!enableEmojis && pattern.includes(':')) return false;
    if (!enableCodeBlocks && pattern.includes('```')) return false;
    return true;
  });

  // Apply markdown rules
  html = applyMarkdownRules(html, rules);

  // Line breaks
  html = html.replace(/\n/g, '<br>');

  return html;
}

/**
 * Extract mentions from text
 */
export function extractMentions(text: string): string[] {
  const mentions: string[] = [];
  const regex = /@(\w+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      mentions.push(match[1]);
    }
  }

  return mentions;
}

/**
 * Extract channels from text
 */
export function extractChannels(text: string): string[] {
  const channels: string[] = [];
  const regex = /#(\w+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      channels.push(match[1]);
    }
  }

  return channels;
}

/**
 * Extract emojis from text
 */
export function extractEmojis(text: string): string[] {
  const emojis: string[] = [];
  const regex = /:(\w+):/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      emojis.push(match[1]);
    }
  }

  return emojis;
}
