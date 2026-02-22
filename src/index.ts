/**
 * Discord Components SDK
 * Professional React library for building Discord Components v2
 */

export { ActionRow } from './components/ActionRow';
export { Button } from './components/Button';
export { ColorPicker } from './components/ColorPicker';
export { Container } from './components/Container';
export { Dialog, DialogClose, DialogTrigger } from './components/Dialog';
export { EmojiPicker } from './components/EmojiPicker';
export type { UploadedFile } from './components/FileUpload';
export { FileUpload } from './components/FileUpload';
export {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
  Icon,
} from './components/Icon';
export { MarkdownPreview } from './components/MarkdownPreview';
export type { MarkdownPreviewProps } from './components/MarkdownPreview/MarkdownPreview';
export { MediaGallery } from './components/MediaGallery';
// Composite Components
export { MessageBuilder } from './components/MessageBuilder';
export { Separator } from './components/Separator';
export { SortableItem } from './components/SortableItem';
export { StringSelect } from './components/StringSelect';
// Core Components
export { TextDisplay } from './components/TextDisplay';
export { Thumbnail } from './components/Thumbnail';
// Constants
export { DISCORD_LIMITS } from './constants/limits';
export { COMPONENT_TYPES } from './constants/types';
export type { AnalyticsData, AnalyticsEvent } from './features/analytics';
export { formatDuration, useAnalytics } from './features/analytics';
export type { BatchOperationResult } from './features/batch';
export { useBatchOperations } from './features/batch';
export type { ClipboardData } from './features/clipboard';
export { useClipboard } from './features/clipboard';
export type { DndCallbacks, DndConfig, DndState } from './features/dnd';
// Features - DnD
export {
  calculateNewIndex,
  closestCenter,
  DndContext,
  DragOverlay,
  extractComponentIds,
  horizontalListSortingStrategy,
  isValidDragEvent,
  SortableContext,
  useDndSensors,
  useDragAndDrop,
  verticalListSortingStrategy,
} from './features/dnd';
export type { DownloadOptions, ExportFormat, ExportOptions, ExportResult } from './features/export';
// Features - Export
export {
  downloadFile,
  exportComponents,
  formatDiscordJS,
  formatJSON,
  formatPython,
  formatTypeScript,
  generateFilename,
  getFileExtension,
  useExport,
} from './features/export';
export type { HistoryOptions, HistoryState, HistoryStats } from './features/history';
// Features - History
export {
  calculateHistoryStats,
  compressHistory,
  createInitialState,
  hasStateChanged,
  limitHistorySize,
  useHistory,
} from './features/history';
export type { ImportFormat, ImportOptions, ImportResult } from './features/import';
// Features - Import
export {
  isValidComponent,
  normalizeComponent,
  parseDiscordJS,
  parseFile,
  parseJSON,
  useImport,
  validateComponents as validateImportedComponents,
} from './features/import';
export type {
  KeyboardOptions,
  KeyboardShortcut,
  KeyboardShortcutGroup,
  KeyModifiers,
} from './features/keyboard';
// Features - Keyboard
export {
  COMMON_SHORTCUTS,
  createCopyShortcut,
  createDeleteShortcut,
  createPasteShortcut,
  createRedoShortcut,
  createUndoShortcut,
  formatShortcut,
  getShortcutDescription,
  isInputElement,
  matchesShortcut,
  shouldIgnoreShortcut,
  useKeyboardShortcuts,
} from './features/keyboard';
export type { MarkdownParserOptions, MarkdownRule, ParsedMarkdown } from './features/markdown';
export {
  applyMarkdownRules,
  escapeHtml,
  extractChannels,
  extractEmojis,
  extractMentions,
  MARKDOWN_RULES,
  parseDiscordMarkdown,
} from './features/markdown';
export type {
  LazyLoadOptions,
  PerformanceMetrics,
  RenderTimeOptions,
} from './features/performance';
// Features - Performance
export {
  depsEqual,
  formatRenderTime,
  logPerformance,
  useDebounce,
  useLazyLoad,
  useMemoizedValue,
  useRenderTime,
  useThrottle,
} from './features/performance';
export type { SearchOptions, SearchStats } from './features/search';
export { getComponentTypeName, useComponentSearch } from './features/search';
export type { CustomTheme } from './features/theme';
export {
  AMOLED_THEME,
  applyThemeToDOM,
  DEFAULT_DARK_THEME,
  DEFAULT_LIGHT_THEME,
  findTheme,
  isValidTheme,
  MIDNIGHT_THEME,
  PRESET_THEMES,
  useCustomTheme,
} from './features/theme';
export type {
  BatchValidationResult,
  ComponentValidation,
  ValidationError,
  ValidationResult,
} from './features/validation';
// Features - Validation
export {
  getValidationSummary,
  useComponentsValidation,
  useComponentValidation,
  validateButtonLabel,
  validateComponent,
  validateCustomId,
  validateTextContent,
  validateUrl,
} from './features/validation';
export { useComponents } from './hooks/useComponents';
export { useLocalStorage } from './hooks/useLocalStorage';
// Hooks
export { useTheme } from './hooks/useTheme';

// Store
export { useComponentStore } from './store/componentStore';
export type * from './types/components';
// Types
export type * from './types/discord';
// Utils
export { cn } from './utils/cn';
export { generateCustomId, generateId, generateShortId } from './utils/id';
export {
  debounce,
  getPerformanceMetrics,
  lazyWithRetry,
  memoize,
  preloadComponent,
  throttle,
} from './utils/performance';
export type { Preset } from './utils/presets';
export {
  allPresets,
  getPreset,
  getPresetCategories,
  getPresetsByCategory,
  getPresetsByTag,
  searchPresets,
} from './utils/presets';
export type { Template } from './utils/templates';
export { getAllTemplates, getTemplate, getTemplatesByCategory } from './utils/templates';
