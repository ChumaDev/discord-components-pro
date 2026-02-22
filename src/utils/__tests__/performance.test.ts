import { describe, expect, it, vi } from 'vitest';
import { debounce } from '../performance';

describe('performance utilities', () => {
  describe('debounce', () => {
    it('should debounce function calls', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 100);

      debounced();
      debounced();
      debounced();

      expect(fn).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 150));

      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to debounced function', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);

      debounced('test', 123);

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(fn).toHaveBeenCalledWith('test', 123);
    });

    it('should use latest arguments', async () => {
      const fn = vi.fn();
      const debounced = debounce(fn, 50);

      debounced('first');
      debounced('second');
      debounced('third');

      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith('third');
    });
  });
});
