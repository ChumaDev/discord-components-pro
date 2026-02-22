/**
 * Clipboard Hook
 * Copy/paste components with keyboard shortcuts
 */

import { useCallback, useState } from 'react';
import type { DiscordComponent } from '../../types/discord';
import type { ClipboardData, ClipboardOptions } from './types';
import { cloneComponents, copyToSystemClipboard, regenerateComponentIds } from './utils';

export function useClipboard() {
  const [clipboard, setClipboard] = useState<ClipboardData | null>(null);

  const copyComponents = useCallback(
    async (
      components: DiscordComponent[],
      options: ClipboardOptions = {}
    ): Promise<ClipboardData> => {
      const { copyToSystem = true } = options;

      const data: ClipboardData = {
        components: cloneComponents(components),
        timestamp: Date.now(),
      };

      setClipboard(data);

      if (copyToSystem) {
        await copyToSystemClipboard(components);
      }

      return data;
    },
    []
  );

  const pasteComponents = useCallback(
    (options: ClipboardOptions = {}): DiscordComponent[] | null => {
      if (!clipboard) return null;

      const { regenerateIds = true } = options;

      const cloned = cloneComponents(clipboard.components);
      return regenerateIds ? regenerateComponentIds(cloned) : cloned;
    },
    [clipboard]
  );

  const cutComponents = useCallback(
    async (components: DiscordComponent[], options?: ClipboardOptions): Promise<ClipboardData> => {
      return copyComponents(components, options);
    },
    [copyComponents]
  );

  const clearClipboard = useCallback(() => {
    setClipboard(null);
  }, []);

  const hasClipboard = clipboard !== null;
  const clipboardCount = clipboard?.components.length || 0;

  return {
    clipboard,
    copyComponents,
    pasteComponents,
    cutComponents,
    clearClipboard,
    hasClipboard,
    clipboardCount,
  };
}
