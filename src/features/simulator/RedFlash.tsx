import { useState, useEffect, useCallback } from 'react';

interface RedFlashProps {
  trigger: boolean;
  onDone: () => void;
}

export default function RedFlash({ trigger, onDone }: RedFlashProps) {
  const [visible, setVisible] = useState(false);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const flash = useCallback(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
      onDone();
    }, prefersReducedMotion ? 100 : 600);
  }, [onDone, prefersReducedMotion]);

  useEffect(() => {
    if (trigger) {
      flash();
    }
  }, [trigger, flash]);

  if (!visible) return null;

  // Reduced-motion fallback: red border instead of full-screen flash
  if (prefersReducedMotion) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          border: '8px solid var(--color-danger)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(185, 28, 28, 0.85)',
        zIndex: 9999,
        pointerEvents: 'none',
        animation: 'redFlash 0.6s ease-out forwards',
      }}
      aria-hidden="true"
    >
      <style>{`
        @keyframes redFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
