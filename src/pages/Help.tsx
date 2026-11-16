import { useTranslation } from 'react-i18next';

export default function Help() {
  const { t } = useTranslation();

  const steps = [
    t('help.checklist.step1'),
    t('help.checklist.step2'),
    t('help.checklist.step3'),
    t('help.checklist.step4'),
    t('help.checklist.step5'),
  ];

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1>{t('help.checklist.title')}</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {steps.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '12px', background: 'var(--color-surface, #fff)', border: 'var(--border)', borderRadius: 'var(--radius)', padding: '14px 16px' }}>
            <span style={{ fontWeight: 700, color: 'var(--color-primary)', minWidth: '24px' }}>{i + 1}.</span>
            <p>{step}</p>
          </div>
        ))}
      </div>
      <a href="tel:1930" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-danger)', color: '#fff', borderRadius: 'var(--radius)', padding: '16px', fontWeight: 700, fontSize: 'var(--text-lg)', textDecoration: 'none', minHeight: 'var(--btn-height)' }}>
        📞 Call 1930
      </a>
    </div>
  );
}
