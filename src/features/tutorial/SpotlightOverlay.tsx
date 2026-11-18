import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { tutorialSteps } from './tutorialSteps';
import { speak, stopSpeech } from '../../services/speech';

interface Props {
  onFinish: () => void;
}

interface TargetRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const SPOTLIGHT_PADDING = 12;
const GLOW_SPREAD = 8;

export default function SpotlightOverlay({ onFinish }: Props) {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<TargetRect | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasVoice, setHasVoice] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const step = tutorialSteps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === tutorialSteps.length - 1;

  // Check if speech synthesis has a voice for the current language
  useEffect(() => {
    if (!window.speechSynthesis) {
      setHasVoice(false);
      return;
    }
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const lang = i18n.language.slice(0, 2);
      const found = voices.some(v => v.lang.startsWith(lang));
      setHasVoice(found || voices.length === 0); // show if no voices loaded yet
    };
    checkVoices();
    window.speechSynthesis.onvoiceschanged = checkVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, [i18n.language]);

  // Measure target element
  const measureTarget = useCallback(() => {
    if (!step) return;
    const el = document.getElementById(step.targetId);
    if (!el) {
      setTargetRect(null);
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Wait for scroll to settle
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      setTargetRect({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    });
  }, [step]);

  useEffect(() => {
    measureTarget();
    const handleResize = () => measureTarget();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize, true);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize, true);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [measureTarget, currentStep]);

  // Keyboard handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleNext = () => {
    stopSpeech();
    setIsSpeaking(false);
    if (isLast) {
      onFinish();
    } else {
      // Skip missing targets
      let next = currentStep + 1;
      while (next < tutorialSteps.length) {
        const el = document.getElementById(tutorialSteps[next].targetId);
        if (el) break;
        next++;
      }
      if (next >= tutorialSteps.length) {
        onFinish();
      } else {
        setCurrentStep(next);
      }
    }
  };

  const handleBack = () => {
    stopSpeech();
    setIsSpeaking(false);
    if (!isFirst) {
      let prev = currentStep - 1;
      while (prev >= 0) {
        const el = document.getElementById(tutorialSteps[prev].targetId);
        if (el) break;
        prev--;
      }
      if (prev >= 0) setCurrentStep(prev);
    }
  };

  const handleSkip = () => {
    stopSpeech();
    setIsSpeaking(false);
    onFinish();
  };

  const handleListen = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const text = t(step.textKey);
      speak(text, i18n.language.slice(0, 2) as 'en' | 'hi' | 'mr');
      setIsSpeaking(true);
      // Reset speaking state when speech ends
      if (window.speechSynthesis) {
        const checkEnd = setInterval(() => {
          if (!window.speechSynthesis.speaking) {
            setIsSpeaking(false);
            clearInterval(checkEnd);
          }
        }, 200);
      }
    }
  };

  // Determine card placement: above or below target
  const cardAbove = targetRect ? targetRect.top > window.innerHeight / 2 : false;

  // Build the SVG clip path for the spotlight cutout
  const renderBackdrop = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (!targetRect) {
      return (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(30, 58, 138, 0.70)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 9998,
          }}
        />
      );
    }

    const sx = targetRect.left - SPOTLIGHT_PADDING;
    const sy = targetRect.top - SPOTLIGHT_PADDING;
    const sw = targetRect.width + SPOTLIGHT_PADDING * 2;
    const sh = targetRect.height + SPOTLIGHT_PADDING * 2;
    const r = 16;

    return (
      <svg
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9998, pointerEvents: 'none' }}
        viewBox={`0 0 ${vw} ${vh}`}
        preserveAspectRatio="none"
      >
        <defs>
          <mask id="spotlight-mask">
            <rect x="0" y="0" width={vw} height={vh} fill="white" />
            <rect x={sx} y={sy} width={sw} height={sh} rx={r} ry={r} fill="black" />
          </mask>
          {!prefersReducedMotion.current && (
            <filter id="spotlight-glow">
              <feDropShadow dx="0" dy="0" stdDeviation={GLOW_SPREAD} floodColor="#38BDF8" floodOpacity="0.6" />
            </filter>
          )}
        </defs>
        {/* Dark overlay with cutout */}
        <rect
          x="0" y="0" width={vw} height={vh}
          fill="rgba(30, 58, 138, 0.70)"
          mask="url(#spotlight-mask)"
          style={{ backdropFilter: 'blur(4px)' }}
        />
        {/* Glow border around spotlight */}
        <rect
          x={sx} y={sy} width={sw} height={sh} rx={r} ry={r}
          fill="none"
          stroke="#38BDF8"
          strokeWidth="2"
          filter={!prefersReducedMotion.current ? 'url(#spotlight-glow)' : undefined}
        />
      </svg>
    );
  };

  // Arrow SVG pointing from card to target
  const renderArrow = () => {
    if (!targetRect) return null;
    const arrowSize = 20;
    const cx = targetRect.left + targetRect.width / 2;

    if (cardAbove) {
      // Arrow points down from card to target
      const ay = targetRect.top - SPOTLIGHT_PADDING - 8;
      return (
        <svg
          style={{ position: 'fixed', left: cx - arrowSize / 2, top: ay - arrowSize, zIndex: 10001, pointerEvents: 'none' }}
          width={arrowSize} height={arrowSize} viewBox="0 0 20 20"
        >
          <path d="M10 20 L0 4 L20 4 Z" fill="var(--color-text, #1e293b)" />
        </svg>
      );
    } else {
      // Arrow points up from card to target
      const ay = targetRect.top + targetRect.height + SPOTLIGHT_PADDING + 8;
      return (
        <svg
          style={{ position: 'fixed', left: cx - arrowSize / 2, top: ay, zIndex: 10001, pointerEvents: 'none' }}
          width={arrowSize} height={arrowSize} viewBox="0 0 20 20"
        >
          <path d="M10 0 L20 16 L0 16 Z" fill="var(--color-text, #1e293b)" />
        </svg>
      );
    }
  };

  return (
    <div ref={overlayRef}>
      {/* Backdrop */}
      {renderBackdrop()}

      {/* Click blocker on the overlay area (not the spotlight) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top controls: Back and Next */}
        <div
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '16px',
            zIndex: 10002,
          }}
        >
          {/* Back button */}
          <button
            type="button"
            onClick={handleBack}
            disabled={isFirst}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '56px',
              padding: '0 20px',
              borderRadius: '28px',
              background: isFirst ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.9)',
              color: isFirst ? 'rgba(255,255,255,0.5)' : 'var(--color-text, #1e293b)',
              border: 'none',
              fontSize: '18px',
              fontWeight: 600,
              cursor: isFirst ? 'default' : 'pointer',
              opacity: isFirst ? 0.5 : 1,
            }}
            aria-label={t('back')}
          >
            <ArrowLeft size={20} />
            {t('back')}
          </button>

          {/* Next / Finish button */}
          <button
            type="button"
            onClick={handleNext}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: '56px',
              padding: '0 24px',
              borderRadius: '28px',
              background: 'var(--color-primary, #1E3A8A)',
              color: '#fff',
              border: 'none',
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              outline: 'none',
              boxShadow: '0 0 0 3px rgba(59,130,246,0.4)',
            }}
            aria-label={isLast ? t('finish', 'Finish') : t('next')}
          >
            {isLast ? t('finish', 'Finish') : t('next')}
            <ArrowRight size={20} />
          </button>
        </div>

        {/* Arrow pointer */}
        {renderArrow()}

        {/* Instruction card */}
        {targetRect && (
          <div
            style={{
              position: 'fixed',
              left: '16px',
              right: '16px',
              ...(cardAbove
                ? { bottom: `${window.innerHeight - targetRect.top + SPOTLIGHT_PADDING + 32}px` }
                : { top: `${targetRect.top + targetRect.height + SPOTLIGHT_PADDING + 32}px` }
              ),
              background: 'var(--color-surface, #fff)',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              zIndex: 10001,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <p style={{
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: 1.5,
              margin: 0,
              color: 'var(--color-text, #1e293b)',
            }}>
              {t(step.textKey)}
            </p>

            {/* Listen button */}
            {hasVoice && (
              <button
                type="button"
                onClick={handleListen}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '56px',
                  width: '100%',
                  padding: '0 20px',
                  borderRadius: '28px',
                  background: '#fff',
                  border: '2px solid var(--color-border, #e2e8f0)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text, #1e293b)',
                  cursor: 'pointer',
                }}
                aria-label={t('tutorial.listenLabel', 'Listen to instructions')}
              >
                <Volume2 size={22} />
                {isSpeaking
                  ? t('tutorial.stopListening', 'Stop')
                  : t('tutorial.listenLabel', 'Listen to instructions')}
              </button>
            )}
          </div>
        )}

        {/* Skip tutorial link at the bottom */}
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            zIndex: 10002,
          }}
        >
          <button
            type="button"
            onClick={handleSkip}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.85)',
              fontSize: '18px',
              fontWeight: 500,
              textDecoration: 'underline',
              cursor: 'pointer',
              padding: '12px 24px',
            }}
          >
            {t('tutorial.skipTutorial', 'Skip tutorial')}
          </button>
        </div>

        {/* Step indicator dots */}
        <div
          style={{
            position: 'fixed',
            bottom: '120px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            zIndex: 10002,
          }}
        >
          {tutorialSteps.map((_, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i === currentStep ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: prefersReducedMotion.current ? 'none' : 'background 0.2s',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
