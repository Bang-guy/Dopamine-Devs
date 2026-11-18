import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { UserProfile } from '../../services/storage';

interface Props {
  onNext: (ageRange: UserProfile['ageRange']) => void;
  onBack: () => void;
}

const AGE_RANGES: Array<{ value: UserProfile['ageRange']; key: string }> = [
  { value: 'under40', key: 'age.under40' },
  { value: '40to49', key: 'age.40to49' },
  { value: '50to59', key: 'age.50to59' },
  { value: '60to69', key: 'age.60to69' },
  { value: '70plus', key: 'age.70plus' },
];

export default function Step3Age({ onNext, onBack }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<UserProfile['ageRange'] | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <button onClick={onBack} style={{ background: 'transparent', color: 'var(--color-text)', alignSelf: 'flex-start', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        ← {t('back')}
      </button>

      <h1 style={{ fontSize: 'var(--text-2xl)' }}>{t('onboarding.agePlaceholder')}</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {AGE_RANGES.map((range) => (
          <label
            key={range.value}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              border: selected === range.value ? '2px solid var(--color-primary)' : 'var(--border)',
              borderRadius: 'var(--radius)', padding: '16px 20px', cursor: 'pointer',
              background: selected === range.value ? '#EFF6FF' : 'transparent',
              minHeight: 'var(--btn-height)',
            }}
          >
            <input type="radio" name="age" value={range.value} checked={selected === range.value} onChange={() => setSelected(range.value)} style={{ width: '24px', height: '24px', accentColor: 'var(--color-primary)' }} />
            <span style={{ fontSize: 'var(--text-lg)', fontWeight: 600 }}>{t(range.key)}</span>
          </label>
        ))}
      </div>

      <button onClick={() => selected && onNext(selected)} disabled={!selected} style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
        Next →
      </button>
    </div>
  );
}
