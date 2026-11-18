import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSettings, saveSettings } from '../services/storage';

interface ScreenshotSlotProps {
  src: string;
  alt: string;
  caption: string;
}

function ScreenshotSlot({ src, alt, caption }: ScreenshotSlotProps) {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        minWidth: '220px',
        flex: '1 1 220px',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '9 / 16',
          borderRadius: 'var(--radius)',
          border: 'var(--border)',
          overflow: 'hidden',
          background: '#E5E7EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {!hasError ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            onError={() => setHasError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: 600,
            }}
          >
            {t('landing.screenshotPlaceholder', 'Screenshot to be added')}
          </div>
        )}
      </div>
      <p
        style={{
          margin: 0,
          fontSize: 'var(--text-sm, 16px)',
          fontWeight: 600,
          textAlign: 'center',
          color: 'var(--color-text)',
        }}
      >
        {caption}
      </p>
    </div>
  );
}

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.slice(0, 2) as 'en' | 'hi' | 'mr') || 'en';

  const handleLanguageChange = (lang: 'en' | 'hi' | 'mr') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('dsc_lang', lang);
    const settings = getSettings();
    saveSettings({ ...settings, language: lang });
  };

  const screenshotItems = [
    {
      src: '/screenshots/01-language.png',
      alt: t('landing.screenshots.slot1', 'Choose your language'),
      caption: t('landing.screenshots.slot1', 'Choose your language'),
    },
    {
      src: '/screenshots/02-home.png',
      alt: t('landing.screenshots.slot2', 'Home with safety tips'),
      caption: t('landing.screenshots.slot2', 'Home with safety tips'),
    },
    {
      src: '/screenshots/03-practise.png',
      alt: t('landing.screenshots.slot3', 'Practice a scam safely'),
      caption: t('landing.screenshots.slot3', 'Practice a scam safely'),
    },
    {
      src: '/screenshots/04-checker.png',
      alt: t('landing.screenshots.slot4', 'Check a message'),
      caption: t('landing.screenshots.slot4', 'Check a message'),
    },
    {
      src: '/screenshots/05-help.png',
      alt: t('landing.screenshots.slot5', 'Step-by-step help after a scam'),
      caption: t('landing.screenshots.slot5', 'Step-by-step help after a scam'),
    },
    {
      src: '/screenshots/06-learn.png',
      alt: t('landing.screenshots.slot6', 'Short lessons with voice'),
      caption: t('landing.screenshots.slot6', 'Short lessons with voice'),
    },
  ];

  const landingFaqs = [
    {
      q: 'What is Satark?',
      a: 'Satark is a voice-guided, senior-friendly cyber safety assistant designed to help senior citizens in India recognize and respond to online financial fraud.',
    },
    {
      q: 'Which languages are supported?',
      a: 'Read aloud in Hindi, Marathi and English, when your phone has the voice installed.',
    },
    {
      q: 'Does Satark require an internet connection or send my data anywhere?',
      a: 'In this prototype, your messages and personal details stay on your phone. Nothing is sent to our servers.',
    },
    {
      q: 'What should I do if I have been scammed?',
      a: 'Tap the fixed red emergency bar inside the app or dial 1930 immediately to connect with the National Cybercrime Reporting Helpline.',
    },
    {
      q: 'Can family members check on their parents safely?',
      a: "Yes. With the senior's explicit consent, caregivers can link and view learning progress without ever seeing personal messages, OTPs, or financial transactions.",
    },
  ];

  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hero Section */}
      <header
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          padding: '24px 20px 48px 20px',
          position: 'relative',
        }}
      >
        <div
          style={{
            maxWidth: '1080px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Top Row: Language Switcher */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '8px',
            }}
            aria-label="Language selector"
          >
            {[
              { code: 'en' as const, label: 'English' },
              { code: 'hi' as const, label: 'हिन्दी' },
              { code: 'mr' as const, label: 'मराठी' },
            ].map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleLanguageChange(lang.code)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius)',
                    fontSize: '15px',
                    fontWeight: 700,
                    background: isSelected ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
                    color: '#fff',
                    border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255, 255, 255, 0.4)',
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                  aria-pressed={isSelected}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>

          {/* Hero Content Grid: Left Text, Right Photo (Desktop) / Column (Mobile) */}
          <div
            className="hero-grid"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
            }}
          >
            {/* Hero Text Column */}
            <div
              style={{
                flex: '1 1 480px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              <h1
                style={{
                  fontSize: 'clamp(32px, 5vw, 44px)',
                  margin: 0,
                  color: '#fff',
                  fontWeight: 800,
                  lineHeight: 1.15,
                }}
              >
                Satark
              </h1>
              <p
                style={{
                  fontSize: 'var(--text-xl)',
                  color: '#DBEAFE',
                  margin: 0,
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                {t('appSubtitle', 'Digital Literacy and Cyber Fraud Awareness Assistant for Senior Citizens')}
              </p>
              <p
                style={{
                  fontSize: 'var(--text-body)',
                  color: '#BFDBFE',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                Read aloud in Hindi, Marathi and English, when your phone has the voice installed. Works without internet after the first visit.
              </p>

              {/* Mobile Hero Photo Slot (visible on narrow screens) */}
              <div
                className="hero-photo-mobile"
                style={{
                  display: 'none',
                  justifyContent: 'center',
                  margin: '8px 0',
                }}
              >
                <img
                  src="/images/hero-senior.jpg"
                  alt="A senior citizen holding a phone and smiling."
                  loading="lazy"
                  style={{
                    maxWidth: '300px',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '16px',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                    maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                  }}
                />
              </div>

              {/* Action Buttons: "Start setup" first (highlighted), then "Open the app" */}
              <div
                style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <Link
                  to="/onboarding"
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--color-primary)',
                    minHeight: '56px',
                    padding: '0 32px',
                    borderRadius: 'var(--radius)',
                    fontWeight: 800,
                    fontSize: 'var(--text-lg)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  }}
                >
                  Start setup
                </Link>
                <Link
                  to="/app/home"
                  style={{
                    background: 'transparent',
                    color: '#FFFFFF',
                    border: '2px solid #FFFFFF',
                    minHeight: '56px',
                    padding: '0 28px',
                    borderRadius: 'var(--radius)',
                    fontWeight: 700,
                    fontSize: 'var(--text-lg)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Open the app
                </Link>
              </div>
            </div>

            {/* Desktop Hero Photo Column */}
            <div
              className="hero-photo-desktop"
              style={{
                flex: '0 1 420px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img
                src="/images/hero-senior.jpg"
                alt="A senior citizen holding a phone and smiling."
                loading="lazy"
                style={{
                  width: '100%',
                  maxWidth: '420px',
                  height: 'auto',
                  borderRadius: '20px',
                  WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                  maskImage: 'radial-gradient(circle at center, black 65%, transparent 100%)',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Styles for Hero Photo */}
      <style>{`
        @media (max-width: 768px) {
          .hero-photo-desktop {
            display: none !important;
          }
          .hero-photo-mobile {
            display: flex !important;
          }
        }
      `}</style>

      {/* Main Content */}
      <main
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '40px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Feature Cards */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              fontSize: '26px',
              margin: 0,
              textAlign: 'center',
              color: 'var(--color-primary)',
            }}
          >
            Designed for Senior Citizens
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            <div
              style={{
                background: 'var(--color-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--border)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  margin: '0 0 8px 0',
                  color: 'var(--color-primary)',
                }}
              >
                Simulated Safety Training
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                Interactive practice scenarios such as fake UPI cashbacks with red flash alerts, electricity bill cutoff SMS, and a mock banking payment simulator. Works without internet after the first visit.
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--border)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  margin: '0 0 8px 0',
                  color: 'var(--color-primary)',
                }}
              >
                Offline Message Checker
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                Paste suspicious SMS, WhatsApp forwards, or links. Our transparent, deterministic rule engine evaluates risks instantly without cloud calls.
              </p>
            </div>

            <div
              style={{
                background: 'var(--color-surface)',
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: 'var(--border)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  margin: '0 0 8px 0',
                  color: 'var(--color-primary)',
                }}
              >
                1930 Emergency Helpline
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 'var(--text-body)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.5,
                }}
              >
                A persistent red panic bar with direct 1930 dialing, 5 golden steps to freeze accounts within the golden hour, and an official cybercrime portal link.
              </p>
            </div>
          </div>
        </section>

        {/* See the App (Screenshots Section) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              fontSize: '26px',
              margin: 0,
              textAlign: 'center',
              color: 'var(--color-primary)',
            }}
          >
            {t('landing.seeTheApp', 'See the app')}
          </h2>

          <div
            style={{
              display: 'flex',
              gap: '16px',
              overflowX: 'auto',
              paddingBottom: '12px',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {screenshotItems.map((slot, index) => (
              <ScreenshotSlot
                key={index}
                src={slot.src}
                alt={slot.alt}
                caption={slot.caption}
              />
            ))}
          </div>
        </section>

        {/* 5 Landing FAQs */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2
            style={{
              fontSize: '26px',
              margin: 0,
              textAlign: 'center',
              color: 'var(--color-primary)',
            }}
          >
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {landingFaqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-surface)',
                  border: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '20px',
                }}
              >
                <h3
                  style={{
                    fontSize: 'var(--text-lg)',
                    margin: '0 0 8px 0',
                    color: 'var(--color-primary)',
                  }}
                >
                  {faq.q}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'var(--text-body)',
                    color: 'var(--color-text)',
                    lineHeight: 1.5,
                  }}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: 'var(--color-surface)',
          borderTop: 'var(--border)',
          padding: '40px 24px 90px 24px',
          color: 'var(--color-text)',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px',
            textAlign: 'left',
          }}
        >
          {/* Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--color-primary)' }}>
              Satark
            </div>
            <p style={{ margin: 0, fontSize: 'var(--text-sm, 16px)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              A student prototype for HackKumbh 2026, YCCE Nagpur.
            </p>
          </div>

          {/* Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: 'var(--text-body)', fontWeight: 700 }}>Quick Links</div>
            <Link to="/app/about" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}>
              About
            </Link>
            <Link to="/app/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}>
              Privacy policy
            </Link>
            <Link to="/app/terms" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}>
              Terms
            </Link>
            <Link to="/app/faq" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}>
              FAQ
            </Link>
            <a
              href="mailto:support@satark-safety.app?subject=Satark%20Contact"
              style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}
            >
              Contact
            </a>
          </div>

          {/* Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: 'var(--text-body)', fontWeight: 700 }}>Theme & Emergency</div>
            <p style={{ margin: 0, fontSize: '16px', color: 'var(--color-text-muted)' }}>
              Theme: Tech for Humanity
            </p>
            <p style={{ margin: 0, fontSize: '16px', color: 'var(--color-text-muted)' }}>
              Helplines: 1930 (cybercrime), 112 (emergency)
            </p>
          </div>
        </div>

        <div
          style={{
            maxWidth: '900px',
            margin: '24px auto 0 auto',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center',
            fontSize: '14px',
            color: 'var(--color-text-muted)',
          }}
        >
          Prototype version 0.1. Not for public use until legal review is complete.
        </div>
      </footer>

      {/* Sticky Mobile Bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'var(--color-surface)',
          borderTop: '2px solid var(--color-primary)',
          padding: '12px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          boxShadow: '0 -2px 10px rgba(0,0,0,0.08)',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 'var(--text-body)', color: 'var(--color-primary)' }}>
          {t('appName')}
        </div>
        <Link
          to="/app/home"
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            padding: '10px 24px',
            borderRadius: 'var(--radius)',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            textDecoration: 'none',
          }}
        >
          Open App
        </Link>
      </div>
    </div>
  );
}
