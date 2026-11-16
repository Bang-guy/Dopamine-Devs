import { useTranslation } from 'react-i18next';

interface Props {
  onNext: (enabled: boolean) => void;
  onBack: () => void;
}

export default function Step7Alerts({ onNext, onBack }: Props) {
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <button onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text)', alignSelf: 'flex-start', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        ← {t('back')}
      </button>

      <div style={{ textAlign: 'center', paddingTop: '24px' }}>
        <span style={{ fontSize: '56px' }}>🔔</span>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', textAlign: 'center' }}>{t('settings.alerts')}</h1>

      <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
        {t('alertsPrompt')}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', marginTop: '8px' }}>
        <button
          onClick={() => onNext(true)}
          style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}
        >
          {t('yes')} — {t('settings.alerts')}
        </button>
        <button
          onClick={() => onNext(false)}
          style={{ background: 'transparent', color: 'var(--color-text)', border: 'var(--border)', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)' }}
        >
          {t('no')}, not now
        </button>
      </div>
    </div>
  );
}
