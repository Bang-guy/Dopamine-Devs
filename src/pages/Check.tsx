import { useTranslation } from 'react-i18next';

export default function Check() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '24px 0' }}>
      <h1>{t('home.checkMessage')}</h1>
      <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>Message checker coming in Phase 2.</p>
    </div>
  );
}
