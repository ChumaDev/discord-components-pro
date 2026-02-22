/**
 * Analytics Hook
 * Track component usage and interactions
 */

import { useCallback, useRef, useState } from 'react';
import type { ComponentType } from '../../types/discord';
import type { AnalyticsData, AnalyticsEvent } from './types';
import { calculateStats, exportAnalyticsData } from './utils';

export function useAnalytics() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const sessionStart = useRef(Date.now());

  const trackEvent = useCallback((event: Omit<AnalyticsEvent, 'timestamp'>) => {
    const fullEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
    };
    setEvents((prev) => [...prev, fullEvent]);
  }, []);

  const trackComponentCreate = useCallback(
    (componentType: ComponentType, metadata?: Record<string, unknown>) => {
      trackEvent({ type: 'create', componentType, metadata });
    },
    [trackEvent]
  );

  const trackComponentUpdate = useCallback(
    (componentType: ComponentType, metadata?: Record<string, unknown>) => {
      trackEvent({ type: 'update', componentType, metadata });
    },
    [trackEvent]
  );

  const trackComponentDelete = useCallback(
    (componentType: ComponentType, metadata?: Record<string, unknown>) => {
      trackEvent({ type: 'delete', componentType, metadata });
    },
    [trackEvent]
  );

  const trackExport = useCallback(
    (format: string, componentCount: number) => {
      trackEvent({
        type: 'export',
        metadata: { format, componentCount },
      });
    },
    [trackEvent]
  );

  const trackImport = useCallback(
    (format: string, componentCount: number) => {
      trackEvent({
        type: 'import',
        metadata: { format, componentCount },
      });
    },
    [trackEvent]
  );

  const trackUndo = useCallback(() => {
    trackEvent({ type: 'undo' });
  }, [trackEvent]);

  const trackRedo = useCallback(() => {
    trackEvent({ type: 'redo' });
  }, [trackEvent]);

  const getAnalytics = useCallback((): AnalyticsData => {
    const stats = calculateStats(events);

    return {
      events,
      sessionStart: sessionStart.current,
      sessionDuration: Date.now() - sessionStart.current,
      ...stats,
    };
  }, [events]);

  const clearAnalytics = useCallback(() => {
    setEvents([]);
    sessionStart.current = Date.now();
  }, []);

  const exportAnalytics = useCallback(() => {
    const data = getAnalytics();
    return exportAnalyticsData(data);
  }, [getAnalytics]);

  return {
    trackEvent,
    trackComponentCreate,
    trackComponentUpdate,
    trackComponentDelete,
    trackExport,
    trackImport,
    trackUndo,
    trackRedo,
    getAnalytics,
    clearAnalytics,
    exportAnalytics,
    events,
  };
}
