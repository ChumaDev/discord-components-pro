/**
 * Markdown Parser Tests
 */

import { describe, expect, it } from 'vitest';
import {
  applyMarkdownRules,
  escapeHtml,
  extractChannels,
  extractEmojis,
  extractMentions,
  parseDiscordMarkdown,
} from '../parser';

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<div>Test</div>')).toBe('&lt;div&gt;Test&lt;/div&gt;');
    expect(escapeHtml('A & B')).toBe('A &amp; B');
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
  });

  it('should handle empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('should handle text without special characters', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world');
  });
});

describe('applyMarkdownRules', () => {
  it('should apply bold rule', () => {
    const rules = [{ pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' }];
    expect(applyMarkdownRules('**bold**', rules)).toBe('<strong>bold</strong>');
  });

  it('should apply multiple rules', () => {
    const rules = [
      { pattern: /\*\*(.+?)\*\*/g, replacement: '<strong>$1</strong>' },
      { pattern: /\*(.+?)\*/g, replacement: '<em>$1</em>' },
    ];
    expect(applyMarkdownRules('**bold** and *italic*', rules)).toBe(
      '<strong>bold</strong> and <em>italic</em>'
    );
  });

  it('should handle empty rules array', () => {
    expect(applyMarkdownRules('text', [])).toBe('text');
  });
});

describe('parseDiscordMarkdown', () => {
  it('should parse bold text', () => {
    expect(parseDiscordMarkdown('**bold**')).toContain('<strong>bold</strong>');
  });

  it('should parse italic text', () => {
    expect(parseDiscordMarkdown('*italic*')).toContain('<em>italic</em>');
  });

  it('should parse strikethrough text', () => {
    expect(parseDiscordMarkdown('~~strike~~')).toContain('<del>strike</del>');
  });

  it('should parse inline code', () => {
    expect(parseDiscordMarkdown('`code`')).toContain('<code>code</code>');
  });

  it('should parse spoilers', () => {
    expect(parseDiscordMarkdown('||spoiler||')).toContain('<span class="spoiler">spoiler</span>');
  });

  it('should parse mentions', () => {
    expect(parseDiscordMarkdown('@username')).toContain('<span class="mention">@username</span>');
  });

  it('should parse channels', () => {
    expect(parseDiscordMarkdown('#general')).toContain('<span class="channel">#general</span>');
  });

  it('should parse emojis', () => {
    expect(parseDiscordMarkdown(':smile:')).toContain('<span class="emoji">:smile:</span>');
  });

  it('should handle line breaks', () => {
    expect(parseDiscordMarkdown('line1\nline2')).toContain('line1<br>line2');
  });

  it('should respect enableSpoilers option', () => {
    const result = parseDiscordMarkdown('||spoiler||', { enableSpoilers: false });
    expect(result).not.toContain('<span class="spoiler">');
  });

  it('should respect enableMentions option', () => {
    const result = parseDiscordMarkdown('@username', { enableMentions: false });
    expect(result).not.toContain('<span class="mention">');
  });

  it('should respect enableChannels option', () => {
    const result = parseDiscordMarkdown('#general', { enableChannels: false });
    expect(result).not.toContain('<span class="channel">');
  });

  it('should respect enableEmojis option', () => {
    const result = parseDiscordMarkdown(':smile:', { enableEmojis: false });
    expect(result).not.toContain('<span class="emoji">');
  });

  it('should escape HTML before parsing', () => {
    const result = parseDiscordMarkdown('<script>alert("xss")</script>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).not.toContain('<script>');
  });
});

describe('extractMentions', () => {
  it('should extract single mention', () => {
    expect(extractMentions('@username')).toEqual(['username']);
  });

  it('should extract multiple mentions', () => {
    expect(extractMentions('@user1 and @user2')).toEqual(['user1', 'user2']);
  });

  it('should return empty array for no mentions', () => {
    expect(extractMentions('no mentions here')).toEqual([]);
  });

  it('should handle empty string', () => {
    expect(extractMentions('')).toEqual([]);
  });
});

describe('extractChannels', () => {
  it('should extract single channel', () => {
    expect(extractChannels('#general')).toEqual(['general']);
  });

  it('should extract multiple channels', () => {
    expect(extractChannels('#general and #random')).toEqual(['general', 'random']);
  });

  it('should return empty array for no channels', () => {
    expect(extractChannels('no channels here')).toEqual([]);
  });

  it('should handle empty string', () => {
    expect(extractChannels('')).toEqual([]);
  });
});

describe('extractEmojis', () => {
  it('should extract single emoji', () => {
    expect(extractEmojis(':smile:')).toEqual(['smile']);
  });

  it('should extract multiple emojis', () => {
    expect(extractEmojis(':smile: and :heart:')).toEqual(['smile', 'heart']);
  });

  it('should return empty array for no emojis', () => {
    expect(extractEmojis('no emojis here')).toEqual([]);
  });

  it('should handle empty string', () => {
    expect(extractEmojis('')).toEqual([]);
  });
});
