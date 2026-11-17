import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();

  const landingFaqs = [
    {
      q: "What is Satark?",
      a: "Satark is a voice-guided, senior-friendly cyber safety assistant designed to help senior citizens in India recognize and respond to online financial fraud."
    },
    {
      q: "Which languages are supported?",
      a: "Satark is fully localized in English, Hindi (हिन्दी), and Marathi (मराठी) with native-level text and speech capabilities."
    },
    {
      q: "Does Satark require an internet connection or send my data anywhere?",
      a: "No. Satark runs 100% locally on your phone as an offline Progressive Web App (PWA). Your messages, contacts, and personal data never leave your device."
    },
    {
      q: "What should I do if I have been scammed?",
      a: "Tap the fixed red emergency bar inside the app or dial 1930 immediately to connect with the National Cybercrime Reporting Helpline."
    },
    {
      q: "Can family members check on their parents safely?",
      a: "Yes. With the senior's explicit consent, caregivers can link and view learning progress without ever seeing personal messages, OTPs, or financial transactions."
    }
  ];

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg)', color: 'var(--color-text)', display: 'flex', flexDirection: 'column' }}>
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
        <span style={{ background: '#3B82F6', color: '#fff', padding: '4px 12px', borderRadius: '16px', fontSize: '14px', fontWeight: 700 }}>
          HackKumbh 2026 - YCCE Nagpur
        </span>
        <h1 style={{ fontSize: '36px', margin: 0, color: '#fff', fontWeight: 800 }}>
          Satark
        </h1>
        <p style={{ fontSize: 'var(--text-xl)', color: '#DBEAFE', maxWidth: '580px', margin: 0, lineHeight: 1.4 }}>
          Digital Literacy & Cyber Fraud Awareness Assistant for Senior Citizens
        </p>
        <p style={{ fontSize: 'var(--text-body)', color: '#BFDBFE', maxWidth: '500px', margin: 0 }}>
          Available in English, हिन्दी, and मराठी. Practice scam scenarios safely, check suspicious messages offline, and get immediate 1930 emergency steps.
        </p>

        {/* Above the fold CTA */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
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

      {/* Main Feature Pillars */}
      <main style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', display: 'flex', flexDirection: 'column', gap: '48px', width: '100%', boxSizing: 'border-box' }}>
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '26px', margin: 0, textAlign: 'center', color: 'var(--color-primary)' }}>
            Designed for Senior Citizens
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 8px 0', color: 'var(--color-primary)' }}>Simulated Safety Training</h3>
              <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Interactive practice scenarios such as fake UPI cashbacks with red flash alerts, electricity bill cutoff SMS, and a mock banking payment simulator.
              </p>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 8px 0', color: 'var(--color-primary)' }}>Offline Message Checker</h3>
              <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                Paste suspicious SMS, WhatsApp forwards, or links. Our transparent, deterministic rule engine evaluates risks instantly without cloud calls.
              </p>
            </div>

            <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', border: 'var(--border)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 8px 0', color: 'var(--color-primary)' }}>1930 Emergency Helpline</h3>
              <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                A persistent red panic bar with direct 1930 dialing, 5 golden steps to freeze accounts within the golden hour, and an official cybercrime portal link.
              </p>
            </div>
          </div>
        </section>

        {/* 5 Landing FAQs */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2 style={{ fontSize: '26px', margin: 0, textAlign: 'center', color: 'var(--color-primary)' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {landingFaqs.map((faq, idx) => (
              <div key={idx} style={{ background: 'var(--color-surface)', border: 'var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
                <h3 style={{ fontSize: 'var(--text-lg)', margin: '0 0 8px 0', color: 'var(--color-primary)' }}>{faq.q}</h3>
                <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text)', lineHeight: 1.5 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '26px', margin: 0, color: 'var(--color-primary)' }}>
            Built by Dopamine Devs
          </h2>
          <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', maxWidth: '540px' }}>
            Proudly engineered for HackKumbh 2026 at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur, in collaboration with IEEE Maharashtra and IEEE Computer Society.
          </p>
          <img
            src="/team.svg"
            alt="Dopamine Devs Team"
            style={{ maxWidth: '420px', width: '100%', borderRadius: '12px', border: 'var(--border)' }}
          />
        </section>
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--color-surface)', borderTop: 'var(--border)', padding: '32px 24px 80px 24px', textAlign: 'center', fontSize: '14px', color: 'var(--color-text-muted)' }}>
        <p style={{ margin: 0 }}>
          Satark &middot; Digital Safety Companion &middot; Theme: Tech for Humanity
        </p>
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
