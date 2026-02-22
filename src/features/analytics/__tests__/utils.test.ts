/**
 * Analytics Utilities Tests
 */

import { describe, expect, it } from 'vitest';
import { ComponentType } from '../../../types/discord';
import type { AnalyticsEvent } from '../types';
import {
  calculateStats,
  exportAnalyticsData,
  filterEventsByComponentType,
  filterEventsByType,
  formatDuration,
  getEventsInTimeRange,
} from '../utils';

describe('calculateStats', () => {
  it('should calculate stats from empty events', () => {
    const stats = calculateStats([]);
    expect(stats.totalActions).toBe(0);
    expect(stats.undoRedoCount).toBe(0);
    expect(stats.exportCount).toBe(0);
    expect(stats.importCount).toBe(0);
    expect(stats.mostUsedComponent).toBeNull();
  });

  it('should count component types', () => {
    const events: AnalyticsEvent[] = [
      { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
      { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
      { type: 'create', componentType: ComponentType.TextDisplay, timestamp: Date.now() },
    ];

    const stats = calculateStats(events);
    expect(stats.totalActions).toBe(3);
    expect(stats.componentCounts[ComponentType.Button]).toBe(2);
    expect(stats.componentCounts[ComponentType.TextDisplay]).toBe(1);
  });

  it('should find most used component', () => {
    const events: AnalyticsEvent[] = [
      { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
      { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
      { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
      { type: 'create', componentType: ComponentType.TextDisplay, timestamp: Date.now() },
    ];

    const stats = calculateStats(events);
    expect(stats.mostUsedComponent).toBe(ComponentType.Button);
  });

  it('should count undo/redo actions', () => {
    const events: AnalyticsEvent[] = [
      { type: 'undo', timestamp: Date.now() },
      { type: 'redo', timestamp: Date.now() },
      { type: 'undo', timestamp: Date.now() },
    ];

    const stats = calculateStats(events);
    expect(stats.undoRedoCount).toBe(3);
  });

  it('should count export actions', () => {
    const events: AnalyticsEvent[] = [
      { type: 'export', timestamp: Date.now() },
      { type: 'export', timestamp: Date.now() },
    ];

    const stats = calculateStats(events);
    expect(stats.exportCount).toBe(2);
  });

  it('should count import actions', () => {
    const events: AnalyticsEvent[] = [
      { type: 'import', timestamp: Date.now() },
      { type: 'import', timestamp: Date.now() },
      { type: 'import', timestamp: Date.now() },
    ];

    const stats = calculateStats(events);
    expect(stats.importCount).toBe(3);
  });
});

describe('formatDuration', () => {
  it('should format seconds', () => {
    expect(formatDuration(5000)).toBe('5s');
    expect(formatDuration(30000)).toBe('30s');
    expect(formatDuration(59000)).toBe('59s');
  });

  it('should format minutes and seconds', () => {
    expect(formatDuration(60000)).toBe('1m 0s');
    expect(formatDuration(90000)).toBe('1m 30s');
    expect(formatDuration(3599000)).toBe('59m 59s');
  });

  it('should format hours and minutes', () => {
    expect(formatDuration(3600000)).toBe('1h 0m');
    expect(formatDuration(5400000)).toBe('1h 30m');
    expect(formatDuration(7200000)).toBe('2h 0m');
  });

  it('should handle zero duration', () => {
    expect(formatDuration(0)).toBe('0s');
  });
});

describe('exportAnalyticsData', () => {
  it('should export analytics data to JSON', () => {
    const data = {
      events: [],
      sessionStart: Date.now(),
      sessionDuration: 1000,
      componentCounts: {} as Record<ComponentType, number>,
      mostUsedComponent: null,
      totalActions: 0,
      undoRedoCount: 0,
      exportCount: 0,
      importCount: 0,
    };

    const json = exportAnalyticsData(data);
    expect(json).toBeTruthy();
    expect(() => JSON.parse(json)).not.toThrow();
  });

  it('should format JSON with indentation', () => {
    const data = {
      events: [],
      sessionStart: Date.now(),
      sessionDuration: 1000,
      componentCounts: {} as Record<ComponentType, number>,
      mostUsedComponent: null,
      totalActions: 0,
      undoRedoCount: 0,
      exportCount: 0,
      importCount: 0,
    };

    const json = exportAnalyticsData(data);
    expect(json).toContain('\n');
    expect(json).toContain('  ');
  });
});

describe('filterEventsByType', () => {
  const events: AnalyticsEvent[] = [
    { type: 'create', timestamp: Date.now() },
    { type: 'update', timestamp: Date.now() },
    { type: 'delete', timestamp: Date.now() },
    { type: 'create', timestamp: Date.now() },
  ];

  it('should filter events by type', () => {
    const filtered = filterEventsByType(events, 'create');
    expect(filtered).toHaveLength(2);
    expect(filtered.every((e) => e.type === 'create')).toBe(true);
  });

  it('should return empty array for non-existent type', () => {
    const filtered = filterEventsByType(events, 'export');
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty events array', () => {
    const filtered = filterEventsByType([], 'create');
    expect(filtered).toHaveLength(0);
  });
});

describe('filterEventsByComponentType', () => {
  const events: AnalyticsEvent[] = [
    { type: 'create', componentType: ComponentType.Button, timestamp: Date.now() },
    { type: 'create', componentType: ComponentType.TextDisplay, timestamp: Date.now() },
    { type: 'update', componentType: ComponentType.Button, timestamp: Date.now() },
    { type: 'delete', timestamp: Date.now() },
  ];

  it('should filter events by component type', () => {
    const filtered = filterEventsByComponentType(events, ComponentType.Button);
    expect(filtered).toHaveLength(2);
    expect(filtered.every((e) => e.componentType === ComponentType.Button)).toBe(true);
  });

  it('should return empty array for non-existent component type', () => {
    const filtered = filterEventsByComponentType(events, ComponentType.Container);
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty events array', () => {
    const filtered = filterEventsByComponentType([], ComponentType.Button);
    expect(filtered).toHaveLength(0);
  });
});

describe('getEventsInTimeRange', () => {
  const now = Date.now();
  const events: AnalyticsEvent[] = [
    { type: 'create', timestamp: now - 3000 },
    { type: 'update', timestamp: now - 2000 },
    { type: 'delete', timestamp: now - 1000 },
    { type: 'create', timestamp: now },
  ];

  it('should get events in time range', () => {
    const filtered = getEventsInTimeRange(events, now - 2500, now - 500);
    expect(filtered).toHaveLength(2);
  });

  it('should include boundary events', () => {
    const filtered = getEventsInTimeRange(events, now - 2000, now - 1000);
    expect(filtered).toHaveLength(2);
  });

  it('should return empty array for range with no events', () => {
    const filtered = getEventsInTimeRange(events, now + 1000, now + 2000);
    expect(filtered).toHaveLength(0);
  });

  it('should handle empty events array', () => {
    const filtered = getEventsInTimeRange([], now - 1000, now);
    expect(filtered).toHaveLength(0);
  });
});
