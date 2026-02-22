/**
 * Lazy Load Hook
 * Load components when they enter viewport
 */

import { useEffect, useState } from 'react';
import type { LazyLoadOptions } from './types';

export function useLazyLoad(
  ref: React.RefObject<HTMLElement>,
  options: LazyLoadOptions = {}
): boolean {
  const { threshold = 0.1, rootMargin, root } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, threshold, rootMargin, root]);

  return isVisible;
}
