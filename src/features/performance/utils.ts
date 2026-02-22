/**
 * Performance Utilities
 */

/**
 * Compare dependency arrays for equality
 */
export function depsEqual(a: React.DependencyList, b: React.DependencyList): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, index) => Object.is(item, b[index]));
}

/**
 * Format render time for display
 */
export function formatRenderTime(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(2)}μs`;
  }
  if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Log performance metrics
 */
export function logPerformance(
  componentName: string,
  renderCount: number,
  renderTime: number
): void {
  console.log(
    `[Performance] ${componentName} render #${renderCount}: ${formatRenderTime(renderTime)}`
  );
}
