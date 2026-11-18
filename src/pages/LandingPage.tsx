import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      alt: t('landing.screenshots.slot3', 'Practise a scam safely'),
      caption: t('landing.screenshots.slot3', 'Practise a scam safely'),
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
          padding: '48px 24px 64px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <span
          style={{
            background: '#3B82F6',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '16px',
            fontSize: '14px',
            fontWeight: 700,
          }}
        >
          HackKumbh 2026: YCCE Nagpur
        </span>
        <h1 style={{ fontSize: '36px', margin: 0, color: '#fff', fontWeight: 800 }}>
          Satark
        </h1>
        <p
          style={{
            fontSize: 'var(--text-xl)',
            color: '#DBEAFE',
            maxWidth: '580px',
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          {t('appSubtitle', 'Digital Literacy and Cyber Fraud Awareness Assistant for Senior Citizens')}
        </p>
        <p style={{ fontSize: 'var(--text-body)', color: '#BFDBFE', maxWidth: '520px', margin: 0 }}>
          Read aloud in Hindi, Marathi and English, when your phone has the voice installed. Works without internet after the first visit.
        </p>

        {/* Above the fold CTA */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link
            to="/app/home"
            style={{
              background: '#fff',
              color: 'var(--color-primary)',
              minHeight: 'var(--btn-height)',
              padding: '0 32px',
              borderRadius: 'var(--radius)',
              fontWeight: 800,
              fontSize: 'var(--text-lg)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            Open the app
          </Link>
          <Link
            to="/onboarding"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              minHeight: 'var(--btn-height)',
              padding: '0 24px',
              borderRadius: 'var(--radius)',
              fontWeight: 700,
              fontSize: 'var(--text-lg)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Start Setup
          </Link>
        </div>
      </header>

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
