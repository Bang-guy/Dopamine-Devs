import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const { t } = useTranslation();
  return (
    <main style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--color-primary)', color: '#fff', textAlign: 'center', gap: '24px' }}>
      <h1 style={{ fontSize: 'var(--text-2xl)', color: '#fff' }}>{t('appName')}</h1>
      <p style={{ fontSize: 'var(--text-lg)', color: '#B3C6F5', maxWidth: '360px' }}>
        Digital safety education for seniors — in English, Hindi & Marathi
      </p>
      <Link to="/onboarding" style={{ background: '#fff', color: 'var(--color-primary)', padding: '16px 32px', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: 'var(--text-lg)', textDecoration: 'none', minHeight: 'var(--btn-height)', display: 'inline-flex', alignItems: 'center' }}>
        Get Started
      </Link>
      <Link to="/app/home" style={{ color: '#B3C6F5', fontSize: 'var(--text-body)' }}>
        Already have an account? Open App
      </Link>
    </main>
  );
}
