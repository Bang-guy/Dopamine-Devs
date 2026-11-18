import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import tipsData from '../data/tips.json';
import ListenButton from './ListenButton';

interface Tip {
  id: number;
  en: string;
  hi: string;
  mr: string;
}

export default function TipBox() {
  const { t, i18n } = useTranslation();
  const tips: Tip[] = tipsData;
  const lang = (i18n.language.slice(0, 2) as 'en' | 'hi' | 'mr') || 'en';

  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const getTipText = (tip: Tip): string => {
    return tip[lang] || tip.en;
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % tips.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + tips.length) % tips.length);
  };

  return (
    <section
      aria-label={t('tips.title', 'Safety tips')}
      style={{
        background: 'var(--color-surface)',
        border: 'var(--border)',
        borderRadius: 'var(--radius-lg, 16px)',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <span
          style={{
            fontSize: 'var(--text-body)',
            fontWeight: 700,
            color: 'var(--color-primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {t('tips.title', 'Safety tips')}
        </span>
        <span
          style={{
            fontSize: 'var(--text-sm, 14px)',
            color: 'var(--color-text-muted)',
            fontWeight: 500,
          }}
        >
          {t('tips.tapToRead', 'Tap to read full tip')}
        </span>
      </div>

      {prefersReducedMotion ? (
        /* Reduced motion mode: stepped cards with Next and Prev buttons (56px) */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div
            role="button"
            tabIndex={0}
            onClick={() => setSelectedTip(tips[currentIndex])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedTip(tips[currentIndex]);
              }
            }}
            style={{
              padding: '14px',
              background: 'var(--color-bg)',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-body)',
              cursor: 'pointer',
              lineHeight: 1.4,
              border: '1px solid var(--color-border)',
            }}
          >
            <strong>Tip {currentIndex + 1} of {tips.length}:</strong>{' '}
            {getTipText(tips[currentIndex])}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={handlePrev}
              type="button"
              style={{
                flex: 1,
                minHeight: '56px',
                fontSize: 'var(--text-body)',
                fontWeight: 600,
                background: 'var(--color-surface)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
              }}
            >
              {t('tips.previous', 'Previous tip')}
            </button>
            <button
              onClick={handleNext}
              type="button"
              style={{
                flex: 1,
                minHeight: '56px',
                fontSize: 'var(--text-body)',
                fontWeight: 600,
                background: 'var(--color-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
              }}
            >
              {t('tips.next', 'Next tip')}
            </button>
          </div>
        </div>
      ) : (
        /* Scrolling marquee mode: continuous slow horizontal ticker */
        <div
          role="region"
          aria-label={t('tips.title', 'Safety tips')}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          style={{
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          }}
        >
          <style>{`
            @keyframes marqueeScroll {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .tips-ticker-track {
              display: flex;
              width: max-content;
              animation: marqueeScroll 90s linear infinite;
            }
            .tips-ticker-track.paused {
              animation-play-state: paused;
            }
          `}</style>
          <div className={`tips-ticker-track ${isPaused ? 'paused' : ''}`}>
            {/* Render 2 copies of all tips to achieve seamless loop */}
            {[...tips, ...tips].map((tip, idx) => (
              <button
                key={`${tip.id}-${idx}`}
                type="button"
                onClick={() => setSelectedTip(tip)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 16px',
                  marginRight: '12px',
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                />
                <span>{getTipText(tip)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Selected Tip Modal / Detail Card */}
      {selectedTip && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="tip-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            zIndex: 300,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedTip(null);
          }}
        >
          <div
            ref={modalRef}
            style={{
              background: 'var(--color-surface)',
              borderRadius: 'var(--radius-lg, 16px)',
              padding: '24px',
              maxWidth: '480px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              border: 'var(--border)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 id="tip-modal-title" style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--color-primary)' }}>
                {t('tips.title', 'Safety tips')}
              </h2>
              <ListenButton text={getTipText(selectedTip)} />
            </div>

            <p
              style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 1.5,
                margin: 0,
                color: 'var(--color-text)',
              }}
            >
              {getTipText(selectedTip)}
            </p>

            <button
              type="button"
              onClick={() => setSelectedTip(null)}
              style={{
                minHeight: '56px',
                background: 'var(--color-primary)',
                color: '#fff',
                fontSize: 'var(--text-body)',
                fontWeight: 700,
                borderRadius: 'var(--radius)',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {t('tips.close', 'Close')}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
