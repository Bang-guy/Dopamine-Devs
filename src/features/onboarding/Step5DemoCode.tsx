import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNext: (code: string) => void;
  onBack: () => void;
}

export default function Step5DemoCode({ onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function submit() {
    if (code.replace(/\D/g, '').length !== 4) {
      setError('Please enter any 4-digit code.');
      return;
    }
    onNext(code);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <button onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text)', alignSelf: 'flex-start', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        ← {t('back')}
      </button>

      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', background: '#FEF3C7', color: '#92400E', borderRadius: '6px', padding: '4px 10px', fontSize: '14px', fontWeight: 700 }}>
        {t('demo').toUpperCase()}
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('onboarding.demoCodeLabel')}</h1>

      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-body)' }}>
        {t('onboarding.demoCodeNote')}
      </p>

      <input
        type="tel"
        value={code}
        onChange={(e) => { setCode(e.target.value.replace(/\D/g, '').slice(0, 4)); setError(''); }}
        placeholder="e.g. 1234"
        maxLength={4}
        inputMode="numeric"
        autoFocus
        style={{ fontSize: 'var(--text-2xl)', padding: '16px', letterSpacing: '8px', textAlign: 'center' }}
      />

      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <button onClick={submit} style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        Next →
      </button>
    </div>
  );
}
