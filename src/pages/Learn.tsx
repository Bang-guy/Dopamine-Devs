import { useTranslation } from 'react-i18next';

export default function Learn() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '24px 0' }}>
      <h1>{t('home.askLearn')}</h1>
      <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>Learning modules coming in Phase 3.</p>
    </div>
  );
}
