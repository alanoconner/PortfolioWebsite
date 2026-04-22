import React, { useEffect, useState } from 'react';

interface BottomSheetProps {
  isActive: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION_MS = 450;

const BottomSheet: React.FC<BottomSheetProps> = ({ isActive, onClose, children }) => {
  const [isRendered, setIsRendered] = useState(isActive);
  const [isVisible, setIsVisible] = useState(isActive);

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
            className="absolute right-4 top-4 z-10 border border-terminal-cyan/40 bg-black px-3 py-2 font-mono text-sm text-terminal-cyan transition-colors hover:bg-terminal-cyan hover:text-black sm:right-6 sm:top-5"
            onClick={onClose}
            type="button"
          >
            X
          </button>

          <div className="h-full overflow-y-auto px-4 pb-6 pt-16 sm:px-6 sm:pb-8 sm:pt-[4.5rem]">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BottomSheet;
