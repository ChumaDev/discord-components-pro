/**
 * Import Hook
 */

import { useCallback, useState } from 'react';
import { useComponentStore } from '../../store/componentStore';
import { parseDiscordJS, parseFile, parseJSON } from './parsers';
import type { ImportOptions, ImportResult } from './types';
import { validateComponents } from './validation';

export function useImport() {
  const addComponent = useComponentStore((state) => state.addComponent);
  const setComponents = useComponentStore((state) => state.setComponents);
  const [isImporting, setIsImporting] = useState(false);

  const processImport = useCallback(
    (components: unknown[], options: ImportOptions = {}): ImportResult => {
      const { replace = false, validate = true, skipInvalid = true } = options;

      if (validate) {
        const validation = validateComponents(components);

        if (validation.invalid.length > 0 && !skipInvalid) {
          return {
            success: false,
            components: [],
            error: `Found ${validation.invalid.length} invalid components`,
            warnings: validation.warnings,
          };
        }

        const validComponents = validation.valid;

        if (replace) {
          setComponents(validComponents);
        } else {
          for (const component of validComponents) {
            addComponent(component);
          }
        }

        return {
          success: true,
          components: validComponents,
          warnings: validation.warnings,
        };
      }

      // No validation
      const comps = components as any[];
      if (replace) {
        setComponents(comps);
      } else {
        for (const component of comps) {
          addComponent(component);
        }
      }

      return {
        success: true,
        components: comps,
      };
    },
    [addComponent, setComponents]
  );

  const importJSON = useCallback(
    (json: string, options?: ImportOptions): ImportResult => {
      setIsImporting(true);
      try {
        const components = parseJSON(json);
        return processImport(components, options);
      } catch (error) {
        return {
          success: false,
          components: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      } finally {
        setIsImporting(false);
      }
    },
    [processImport]
  );

  const importDiscordJS = useCallback(
    (code: string, options?: ImportOptions): ImportResult => {
      setIsImporting(true);
      try {
        const components = parseDiscordJS(code);
        return processImport(components, options);
      } catch (error) {
        return {
          success: false,
          components: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      } finally {
        setIsImporting(false);
      }
    },
    [processImport]
  );

  const importFile = useCallback(
    async (file: File, options?: ImportOptions): Promise<ImportResult> => {
      setIsImporting(true);
      try {
        const components = await parseFile(file);
        return processImport(components, options);
      } catch (error) {
        return {
          success: false,
          components: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      } finally {
        setIsImporting(false);
      }
    },
    [processImport]
  );

  return {
    importJSON,
    importDiscordJS,
    importFile,
    isImporting,
  };
}
