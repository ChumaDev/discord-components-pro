/**
 * Memoized Value Hook
 * Cache expensive calculations
 */

import { useRef } from 'react';
import { depsEqual } from './utils';

export function useMemoizedValue<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ value: T; deps: React.DependencyList } | undefined>(undefined);

  if (!ref.current || !depsEqual(ref.current.deps, deps)) {
    ref.current = {
      value: factory(),
      deps,
    };
  }

  return ref.current.value;
}
