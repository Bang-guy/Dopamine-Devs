import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNext: (name: string) => void;
  onBack: () => void;
}

export default function Step2Name({ onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function submit() {
    if (name.trim().length < 2) {
      setError(t('errors.minLength', { min: 2 }));
      return;
    }
    onNext(name.trim());
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <button onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text)', alignSelf: 'flex-start', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        ← {t('back')}
      </button>

      <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('onboarding.nameLabel')}</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => { setName(e.target.value); setError(''); }}
        placeholder="e.g. Rajan"
        autoFocus
        style={{ fontSize: 'var(--text-xl)', padding: '16px' }}
      />

      {error && <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-body)' }}>{error}</p>}

      <button onClick={submit} style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        Next →
      </button>
    </div>
  );
}
