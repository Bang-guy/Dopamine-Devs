import { useTranslation } from 'react-i18next';

export default function Practise() {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '24px 0' }}>
      <h1>{t('nav.practise')}</h1>
      <p style={{ marginTop: '16px', color: 'var(--color-text-muted)' }}>Practice scenarios coming in Phase 3.</p>
    </div>
  );
}
