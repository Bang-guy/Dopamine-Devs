import { useTranslation } from 'react-i18next';

export default function Caregiver() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1>{t('settings.caregiver')}</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>{t('caregiver.addLabel')}</p>
      <div style={{ background: 'var(--color-surface, #fff)', border: 'var(--border)', borderRadius: 'var(--radius)', padding: '20px' }}>
        <p style={{ color: 'var(--color-text-muted)' }}>Caregiver linking coming in Phase 4.</p>
      </div>
    </div>
  );
}
