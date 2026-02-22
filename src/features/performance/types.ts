/**
 * Performance Feature Types
 */

export interface PerformanceMetrics {
  renderTime: number;
  renderCount: number;
  componentName: string;
  timestamp: number;
}

export interface LazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export interface RenderTimeOptions {
  enabled?: boolean;
  logToConsole?: boolean;
  onRender?: (metrics: PerformanceMetrics) => void;
}
