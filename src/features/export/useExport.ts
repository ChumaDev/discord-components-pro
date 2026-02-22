/**
 * Export Hook
 */

import { useCallback, useState } from 'react';
import type { DiscordComponent } from '../../types/discord';
import type { DownloadOptions, ExportOptions, ExportResult } from './types';
import { copyToClipboard, downloadFile, exportComponents, generateFilename } from './utils';

export function useExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [lastExport, setLastExport] = useState<ExportResult | null>(null);

  const exportToFormat = useCallback(
    (components: DiscordComponent[], options: ExportOptions): ExportResult => {
      setIsExporting(true);
      try {
        const result = exportComponents(components, options);
        setLastExport(result);
        return result;
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  const downloadAsFile = useCallback(
    (components: DiscordComponent[], options: DownloadOptions): void => {
      const result = exportToFormat(components, options);
      const filename = options.filename || generateFilename(options.format);
      downloadFile(result.content, filename);
    },
    [exportToFormat]
  );

  const copyToClipboardAction = useCallback(
    async (components: DiscordComponent[], options: ExportOptions): Promise<boolean> => {
      const result = exportToFormat(components, options);
      return await copyToClipboard(result.content);
    },
    [exportToFormat]
  );

  return {
    exportToFormat,
    downloadAsFile,
    copyToClipboard: copyToClipboardAction,
    isExporting,
    lastExport,
  };
}
