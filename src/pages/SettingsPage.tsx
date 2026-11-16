import { useTranslation } from 'react-i18next';
import { getProfile, saveSettings, getSettings, type AppSettings } from '../services/storage';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const settings = getSettings();
  const profile = getProfile();

  function changeLanguage(lang: 'en' | 'hi' | 'mr') {
    const updated: AppSettings = { ...settings, language: lang };
    saveSettings(updated);
    localStorage.setItem('dsc_lang', lang);
    i18n.changeLanguage(lang);
  }

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <h1>{t('settings')}</h1>

      <section>
        <h2 style={{ marginBottom: '12px' }}>{t('settings.language')}</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['en', 'hi', 'mr'] as const).map((lang) => (
            <button key={lang} onClick={() => changeLanguage(lang)} style={{ background: settings.language === lang ? 'var(--color-primary)' : 'transparent', color: settings.language === lang ? '#fff' : 'var(--color-text)', border: 'var(--border)', minHeight: '48px', padding: '8px 20px' }}>
              {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : 'मराठी'}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '12px' }}>{t('settings.about')}</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>{t('appName')} · {t('settings.version')}: 1.0.0</p>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '4px' }}>{profile?.name ?? ''}</p>
      </section>

      <button onClick={() => navigate('/app/caregiver')} style={{ background: 'transparent', border: 'var(--border)', color: 'var(--color-text)', textAlign: 'left' }}>
        {t('settings.caregiver')} →
      </button>

      <button onClick={() => navigate('/app/profile')} style={{ background: 'transparent', border: 'var(--border)', color: 'var(--color-text)', textAlign: 'left' }}>
        {t('profile')} →
      </button>
    </div>
  );
}
