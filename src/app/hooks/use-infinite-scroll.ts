import { useEffect, useRef, useCallback } from 'react';
import { useIntersectionObserver } from '@/app/hooks/use-intersection-observer';

interface UseInfiniteScrollOptions {
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useInfiniteScroll = ({ onIntersect, rootMargin = '100px', threshold = 0.1 }: UseInfiniteScrollOptions) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const handleIntersection = useCallback<IntersectionObserverCallback>(
    ([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      }
    },
    [onIntersect]
  );

  const observe = useIntersectionObserver(handleIntersection, {
    rootMargin,
    threshold,
  });

  useEffect(() => {
    if (observerRef.current) {
      observe(observerRef.current);
    }
  }, [observe]);

  return observerRef;
};
