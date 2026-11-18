import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListenButton from '../../components/ListenButton';
import type { UserProfile } from '../../services/storage';

interface Page1DetailsProps {
  initialValues?: {
    name?: string;
    ageRange?: UserProfile['ageRange'];
    gender?: UserProfile['gender'];
    city?: string;
  };
  onNext: (data: {
    name: string;
    ageRange: UserProfile['ageRange'];
    gender: UserProfile['gender'];
    city: string;
  }) => void;
  onBack?: () => void;
}

export default function Page1Details({ initialValues, onNext, onBack }: Page1DetailsProps) {
  const { t } = useTranslation();
  const [name, setName] = useState(initialValues?.name || '');
  const [ageRange, setAgeRange] = useState<UserProfile['ageRange']>(initialValues?.ageRange || '60to69');
  const [gender, setGender] = useState<UserProfile['gender']>(initialValues?.gender || 'woman');
  const [city, setCity] = useState(initialValues?.city || '');

  const ageOptions: { key: UserProfile['ageRange']; label: string }[] = [
    { key: 'under40', label: t('age.under40', 'Under 40') },
    { key: '40to49', label: t('age.40to49', '40 to 49') },
    { key: '50to59', label: t('age.50to59', '50 to 59') },
    { key: '60to69', label: t('age.60to69', '60 to 69') },
    { key: '70plus', label: t('age.70plus', '70 and above') },
  ];

  const genderOptions: { key: NonNullable<UserProfile['gender']>; label: string }[] = [
    { key: 'woman', label: t('gender.woman', 'Woman') },
    { key: 'man', label: t('gender.man', 'Man') },
    { key: 'preferNotToSay', label: t('gender.preferNotToSay', 'Prefer not to say') },
  ];

  const isValid = name.trim().length >= 2;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onNext({
      name: name.trim(),
      ageRange,
      gender,
      city: city.trim(),
    });
  };

  const instructionText = `${t('onboarding.detailsTitle', 'Your details')}. ${t('onboarding.nameLabel', 'What is your name?')}`;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px 0',
      }}
    >
      {onBack && (
        <div>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: 'transparent',
              color: 'var(--color-text)',
              minHeight: '44px',
              fontSize: 'var(--text-body)',
              fontWeight: 600,
              padding: '6px 12px',
              border: 'var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            {t('back')}
          </button>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
          {t('onboarding.detailsTitle', 'Your details')}
        </h1>
        <ListenButton text={instructionText} />
      </div>

      {/* 1. Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="user-name"
          style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}
        >
          {t('onboarding.nameLabel', 'What is your name?')}
        </label>
        <input
          id="user-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Ramesh Sharma"
          required
          minLength={2}
          style={{
            padding: '16px',
            fontSize: 'var(--text-lg)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        />
      </div>

      {/* 2. Age Range */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          {t('onboarding.ageLabel', 'Age range')}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {ageOptions.map((opt) => {
            const isSelected = ageRange === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setAgeRange(opt.key)}
                style={{
                  minHeight: '56px',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  border: isSelected ? '2px solid var(--color-primary)' : 'var(--border)',
                  background: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: isSelected ? '#fff' : 'var(--color-text)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Gender */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          {t('onboarding.genderLabel', 'Gender')}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '10px' }}>
          {genderOptions.map((opt) => {
            const isSelected = gender === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setGender(opt.key)}
                style={{
                  minHeight: '56px',
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  border: isSelected ? '2px solid var(--color-primary)' : 'var(--border)',
                  background: isSelected ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: isSelected ? '#fff' : 'var(--color-text)',
                  fontSize: 'var(--text-body)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. City or district (Optional) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="user-city"
          style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}
        >
          {t('onboarding.cityLabel', 'City or district')}
        </label>
        <input
          id="user-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="e.g. Nagpur or Pune"
          style={{
            padding: '16px',
            fontSize: 'var(--text-lg)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none',
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-sm, 15px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          {t('onboarding.cityNote', 'Optional. Used only to show local helplines in future. You can skip this.')}
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid}
        style={{
          minHeight: '56px',
          background: isValid ? 'var(--color-primary)' : 'var(--color-border)',
          color: '#fff',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          cursor: isValid ? 'pointer' : 'not-allowed',
          marginTop: '12px',
        }}
      >
        {t('next', 'Next')}
      </button>
    </form>
  );
}
