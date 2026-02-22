/**
 * Export Utilities Tests
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { ButtonComponent, DiscordComponent } from '../../../types/discord';
import { ButtonStyle, ComponentType } from '../../../types/discord';
import type { ExportOptions } from '../types';
import {
  copyToClipboard,
  createDownloadBlob,
  downloadFile,
  exportComponents,
  generateFilename,
  getFileExtension,
} from '../utils';

const mockComponents: DiscordComponent[] = [
  {
    type: ComponentType.Button,
    style: ButtonStyle.Primary,
    label: 'Test Button',
    custom_id: 'test_btn',
    id: 'btn1',
  } as ButtonComponent,
];

describe('exportComponents', () => {
  it('should export to JSON format', () => {
    const options: ExportOptions = { format: 'json' };
    const result = exportComponents(mockComponents, options);

    expect(result.format).toBe('json');
    expect(result.content).toContain('components');
    expect(result.size).toBeGreaterThan(0);
  });

  it('should export to Discord.js format', () => {
    const options: ExportOptions = { format: 'discord.js' };
    const result = exportComponents(mockComponents, options);

    expect(result.format).toBe('discord.js');
    expect(result.content).toContain('ButtonBuilder');
    expect(result.size).toBeGreaterThan(0);
  });

  it('should export to TypeScript format', () => {
    const options: ExportOptions = { format: 'typescript' };
    const result = exportComponents(mockComponents, options);

    expect(result.format).toBe('typescript');
    expect(result.content).toContain('DiscordComponent');
    expect(result.size).toBeGreaterThan(0);
  });

  it('should export to Python format', () => {
    const options: ExportOptions = { format: 'python' };
    const result = exportComponents(mockComponents, options);

    expect(result.format).toBe('python');
    expect(result.content).toContain('components');
    expect(result.size).toBeGreaterThan(0);
  });

  it('should default to JSON for unknown format', () => {
    const options: ExportOptions = { format: 'unknown' as any };
    const result = exportComponents(mockComponents, options);

    expect(result.content).toContain('components');
  });

  it('should handle empty components array', () => {
    const options: ExportOptions = { format: 'json' };
    const result = exportComponents([], options);

    expect(result.content).toContain('components');
    expect(result.size).toBeGreaterThan(0);
  });

  it('should respect minify option', () => {
    const minified = exportComponents(mockComponents, { format: 'json', minify: true });
    const formatted = exportComponents(mockComponents, { format: 'json', minify: false });

    expect(minified.size).toBeLessThan(formatted.size);
  });
});

describe('createDownloadBlob', () => {
  it('should create blob from content', () => {
    const content = 'test content';
    const blob = createDownloadBlob(content);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('text/plain');
    expect(blob.size).toBeGreaterThan(0);
  });

  it('should handle empty content', () => {
    const blob = createDownloadBlob('');

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.size).toBe(0);
  });

  it('should handle large content', () => {
    const content = 'x'.repeat(10000);
    const blob = createDownloadBlob(content);

    expect(blob.size).toBe(10000);
  });
});

describe('getFileExtension', () => {
  it('should return correct extension for JSON', () => {
    expect(getFileExtension('json')).toBe('json');
  });

  it('should return correct extension for Discord.js', () => {
    expect(getFileExtension('discord.js')).toBe('js');
  });

  it('should return correct extension for TypeScript', () => {
    expect(getFileExtension('typescript')).toBe('ts');
  });

  it('should return correct extension for Python', () => {
    expect(getFileExtension('python')).toBe('py');
  });

  it('should return txt for unknown format', () => {
    expect(getFileExtension('unknown' as any)).toBe('txt');
  });
});

describe('generateFilename', () => {
  it('should generate filename with default prefix', () => {
    const filename = generateFilename('json');

    expect(filename).toMatch(/^components_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.json$/);
  });

  it('should generate filename with custom prefix', () => {
    const filename = generateFilename('json', 'my-export');

    expect(filename).toMatch(/^my-export_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.json$/);
  });

  it('should use correct extension for format', () => {
    expect(generateFilename('json')).toContain('.json');
    expect(generateFilename('discord.js')).toContain('.js');
    expect(generateFilename('typescript')).toContain('.ts');
    expect(generateFilename('python')).toContain('.py');
  });

  it('should include timestamp in filename', () => {
    const filename = generateFilename('json');

    // Should match pattern with timestamp
    expect(filename).toMatch(/^components_\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}\.json$/);

    // Should contain current year
    const currentYear = new Date().getFullYear();
    expect(filename).toContain(currentYear.toString());
  });
});

describe('downloadFile', () => {
  beforeEach(() => {
    // Mock DOM methods
    document.body.innerHTML = '';
    global.URL.createObjectURL = vi.fn(() => 'blob:mock-url');
    global.URL.revokeObjectURL = vi.fn();
  });

  it('should create and click download link', () => {
    const content = 'test content';
    const filename = 'test.txt';

    downloadFile(content, filename);

    // Link should be removed after click
    expect(document.body.children.length).toBe(0);
    expect(global.URL.createObjectURL).toHaveBeenCalled();
    expect(global.URL.revokeObjectURL).toHaveBeenCalled();
  });

  it('should set correct download attributes', () => {
    const clickSpy = vi.fn();
    const originalClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = clickSpy;

    downloadFile('content', 'test.txt');

    expect(clickSpy).toHaveBeenCalled();

    HTMLAnchorElement.prototype.click = originalClick;
  });
});

describe('copyToClipboard', () => {
  it('should copy content to clipboard', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('test content');

    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('test content');
  });

  it('should return false on error', async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error('Failed'));
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = await copyToClipboard('test content');

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it('should handle empty content', async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard('');

    expect(result).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('');
  });
});
