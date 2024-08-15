import { useEffect, useRef, useCallback } from 'react';

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = (
  callback: IntersectionObserverCallback,
  { root = null, rootMargin = '0px', threshold = 0.1 }: UseIntersectionObserverOptions = {}
) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);

  const observe = useCallback(
    (node: HTMLDivElement | null) => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }

      if (node) {
        intersectionObserverRef.current = new IntersectionObserver(callback, {
          root,
          rootMargin,
          threshold,
        });
        intersectionObserverRef.current.observe(node);
      }

      observerRef.current = node;
    },
    [callback, root, rootMargin, threshold]
  );

  useEffect(() => {
    return () => intersectionObserverRef.current?.disconnect();
  }, []);

  return observe;
};
