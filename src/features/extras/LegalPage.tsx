import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface LegalPageProps {
  type: 'about' | 'privacy' | 'terms';
}

export default function LegalPage({ type }: LegalPageProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const titles = {
    about: t('settings.about'),
    privacy: t('settings.privacy'),
    terms: t('settings.terms'),
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '56px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('back')}
        </button>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {titles[type]}
      </h1>

      <div
        style={{
          padding: '16px',
          background: '#FEF9C3',
          border: '1px solid #FDE047',
          borderRadius: 'var(--radius)',
          color: '#713F12',
          fontSize: 'var(--text-body)',
          fontWeight: 600,
        }}
      >
        Draft for review. Final version will be published before public launch.
      </div>

      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          fontSize: 'var(--text-body)',
          lineHeight: 1.6,
          color: 'var(--color-text)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {type === 'about' && (
          <>
            <p style={{ margin: 0 }}>
              <strong>Satark (Digital Safety Companion)</strong> is an assistive cybersecurity application built for senior citizens and digitally vulnerable communities across India.
            </p>
            <p style={{ margin: 0 }}>
              Developed for HackKumbh 2026 under the theme "Tech for Humanity: Innovating for Health, Education and Rural Empowerment", Satark teaches seniors to identify online financial fraud, avoid phishing traps, and respond decisively during cyber attacks.
            </p>
            <p style={{ margin: 0 }}>
              Version: 0.1.0 (prototype)
            </p>
          </>
        )}

        {type === 'privacy' && (
          <>
            <p style={{ margin: 0 }}>
              <strong>Zero Server Storage & Zero Tracking:</strong> Satark runs entirely on your local device. We do not store or transmit pasted messages, bank numbers, profile names, or contact data to external servers.
            </p>
            <p style={{ margin: 0 }}>
              All simulated scenarios and message checker evaluations are performed client-side using deterministic offline rules. No third-party analytics, tracking pixels, or advertising scripts are ever loaded.
            </p>
          </>
        )}

        {type === 'terms' && (
          <>
            <p style={{ margin: 0 }}>
              <strong>Educational Simulation Disclaimer:</strong> Satark provides simulated digital fraud awareness and guidance. While our rule engine scans for common fraud patterns, it gives a warning, not a guarantee.
            </p>
            <p style={{ margin: 0 }}>
              Users must always verify critical banking actions directly with official financial institutions and report actual monetary losses immediately to the National Cybercrime Helpline (1930).
            </p>
          </>
        )}
      </div>
    </div>
  );
}
