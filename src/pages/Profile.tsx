import { useTranslation } from 'react-i18next';
import { getProfile } from '../services/storage';

export default function Profile() {
  const { t } = useTranslation();
  const profile = getProfile();

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h1>{t('profile')}</h1>
      {profile ? (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Age Range:</strong> {t(`age.${profile.ageRange}`)}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Language:</strong> {profile.language}</p>
        </>
      ) : (
        <p style={{ color: 'var(--color-text-muted)' }}>No profile found. Please complete onboarding.</p>
      )}
    </div>
  );
}
