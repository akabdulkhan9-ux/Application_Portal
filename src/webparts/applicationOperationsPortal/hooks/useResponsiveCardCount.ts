import { useEffect, useState } from 'react';

interface IResizeObserverLike {
  observe(target: Element): void;
  disconnect(): void;
}

interface IWindowWithResizeObserver {
  ResizeObserver?: new (callback: () => void) => IResizeObserverLike;
}

/**
 * Resolves how many carousel cards to show from the real panel width
 * and viewport: 3 on desktop, 2 on iPad/narrow panels, 1 on phones.
 */
export const resolveCardCount = (containerWidth: number, viewportWidth: number): number => {
  if (viewportWidth <= 640 || containerWidth < 360) {
    return 1;
  }
  if (viewportWidth <= 1024 || containerWidth < 580) {
    return 2;
  }
  return 3;
};

export const useResponsiveCardCount = (
  element: HTMLElement | undefined,
  fallback: number = 3
): number => {
  const [count, setCount] = useState<number>(fallback);

  useEffect(() => {
    if (!element) {
      return;
    }

    const apply = (): void => {
      const width = element.clientWidth;
      if (width <= 0) {
        return;
      }
      const next = resolveCardCount(width, window.innerWidth);
      setCount((prev) => (prev === next ? prev : next));
    };

    apply();

    const onResize = (): void => apply();
    window.addEventListener('resize', onResize);

    const ObserverCtor = (window as IWindowWithResizeObserver).ResizeObserver;
    if (!ObserverCtor) {
      return () => window.removeEventListener('resize', onResize);
    }

    const observer = new ObserverCtor(() => apply());
    observer.observe(element);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
    };
  }, [element, fallback]);

  return count;
};
