/**
 * Render Time Hook
 * Measure component render performance
 */

import { useEffect, useRef } from 'react';
import type { PerformanceMetrics, RenderTimeOptions } from './types';
import { logPerformance } from './utils';

export function useRenderTime(
  componentName: string,
  options: RenderTimeOptions = {}
): PerformanceMetrics | null {
  const { enabled = false, logToConsole = true, onRender } = options;

  const renderCount = useRef(0);
  const startTime = useRef(0);
  const metricsRef = useRef<PerformanceMetrics | null>(null);

  if (enabled) {
    renderCount.current += 1;
    startTime.current = performance.now();
  }

  useEffect(() => {
    if (enabled) {
      const endTime = performance.now();
      const renderTime = endTime - startTime.current;

      const metrics: PerformanceMetrics = {
        componentName,
        renderCount: renderCount.current,
        renderTime,
        timestamp: Date.now(),
      };

      metricsRef.current = metrics;

      if (logToConsole) {
        logPerformance(componentName, renderCount.current, renderTime);
      }

      if (onRender) {
        onRender(metrics);
      }
    }
  });

  return enabled ? metricsRef.current : null;
}
