import { useEffect, useRef } from 'react';

/**
 * Hook para gerenciar o scroll horizontal convertendo eventos de wheel vertical
 */
export const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      container.style.overflowX = 'scroll';
      container.style.overflowY = 'hidden';

      const scrollAmount = e.deltaY;
      const currentScroll = container.scrollLeft;
      const maxScroll = Math.max(0, container.scrollWidth - container.clientWidth);
      const newScroll = Math.max(0, Math.min(currentScroll + scrollAmount, maxScroll));

      container.scrollLeft = newScroll;
      container.scrollTo({ left: newScroll, behavior: 'auto' });
      container.scrollBy({ left: scrollAmount, behavior: 'auto' });

      void container.offsetHeight; // Force reflow
    };

    container.addEventListener('wheel', handleWheel, { passive: false, capture: true });

    return () => {
      container.removeEventListener('wheel', handleWheel, { capture: true });
    };
  }, []);

  return containerRef;
};

