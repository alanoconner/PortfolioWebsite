import React, { useEffect, useRef, useState } from 'react';

interface BottomSheetProps {
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION_MS = 450;
const THUMB_SIZE_PX = 12;

const BottomSheet: React.FC<BottomSheetProps> = ({ isActive, onClose, children }) => {
  const [isRendered, setIsRendered] = useState(isActive);
  const [isVisible, setIsVisible] = useState(isActive);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [thumbOffset, setThumbOffset] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRendered) return;

    const updateScrollbar = () => {
      const scrollElement = scrollRef.current;
      const trackElement = trackRef.current;

      if (!scrollElement || !trackElement) return;

      const maxScroll = scrollElement.scrollHeight - scrollElement.clientHeight;
      const overflow = maxScroll > 1;

      setHasOverflow(overflow);

      if (!overflow) {
        setThumbOffset(0);
        return;
      }

      const progress = maxScroll === 0 ? 0 : scrollElement.scrollTop / maxScroll;
      const maxThumbOffset = Math.max(trackElement.clientHeight - THUMB_SIZE_PX, 0);
      setThumbOffset(progress * maxThumbOffset);
    };

    const scrollElement = scrollRef.current;
    const contentElement = contentRef.current;

    updateScrollbar();

    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', updateScrollbar, { passive: true });
    window.addEventListener('resize', updateScrollbar);

    const resizeObserver = new ResizeObserver(() => {
      updateScrollbar();
    });

    resizeObserver.observe(scrollElement);

    if (contentElement) {
      resizeObserver.observe(contentElement);
    }

    return () => {
      scrollElement.removeEventListener('scroll', updateScrollbar);
      window.removeEventListener('resize', updateScrollbar);
      resizeObserver.disconnect();
    };
  }, [children, isRendered]);

  useEffect(() => {
    if (isActive) {
      setIsRendered(true);
      const frame = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = window.setTimeout(() => {
      setIsRendered(false);
    }, ANIMATION_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isRendered) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRendered, onClose]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-30">
      <button
        aria-label="Close section"
        className="absolute inset-0 h-full w-full cursor-default bg-black/[0.01]"
        onClick={onClose}
        type="button"
      />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <section
          aria-modal="true"
          className="pointer-events-auto relative h-[80vh] w-full overflow-hidden border-t border-terminal-cyan/40 bg-black/95 backdrop-blur-sm"
          role="dialog"
        >
          <button
            aria-label="Close section"
            className="absolute right-4 top-4 z-10 border border-terminal-cyan/40 bg-black px-3 py-2 font-mono text-sm text-white transition-colors hover:bg-white hover:text-black sm:right-6 sm:top-5"
            onClick={onClose}
            type="button"
          >
            X
          </button>

          <div className="relative h-full">
            <div
              ref={scrollRef}
              className="sheet-scroll-area h-full overflow-y-auto px-4 pb-6 pr-10 pt-16 sm:px-6 sm:pb-8 sm:pr-14 sm:pt-[4.5rem]"
            >
              <div ref={contentRef}>
                {children}
              </div>
            </div>

            {hasOverflow && (
              <div
                ref={trackRef}
                aria-hidden="true"
                className="pointer-events-none absolute bottom-6 right-4 top-16 w-4 sm:bottom-8 sm:right-6 sm:top-[4.5rem]"
              >
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/80" />
                <div
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 bg-white"
                  style={{ top: `${thumbOffset}px` }}
                />
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BottomSheet;
