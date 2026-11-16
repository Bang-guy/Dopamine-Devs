import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNext: (phone: string) => void;
  onBack: () => void;
}

export default function Step4Phone({ onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function submit() {
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 10) {
      setError(t('errors.phoneFormat'));
      return;
    }
    onNext(digits);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <button onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text)', alignSelf: 'flex-start', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        ← {t('back')}
      </button>

      <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('onboarding.phoneLabel')}</h1>

      <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-body)', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 'var(--radius)', padding: '14px 16px' }}>
        🔒 {t('onboarding.phoneExplain')}
      </p>

      <input
        type="tel"
        value={phone}
        onChange={(e) => { setPhone(e.target.value); setError(''); }}
        placeholder="10-digit number"
        maxLength={10}
        inputMode="numeric"
        autoFocus
        style={{ fontSize: 'var(--text-xl)', padding: '16px', letterSpacing: '2px' }}
      />

      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}

      <button onClick={submit} style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        Next →
      </button>
    </div>
  );
}
