import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  getSettings,
  saveSettings,
  getProfile,
  saveProgress,
  getProgress,
  clearAllData,
  saveCaregiver,
  type AppSettings,
} from '../services/storage';

export default function SettingsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<AppSettings>(getSettings());
  const profile = getProfile();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestartModal, setShowRestartModal] = useState(false);
  const [showUpdateToast, setShowUpdateToast] = useState(false);

  const changeLanguage = (lang: 'en' | 'hi' | 'mr') => {
    const updated: AppSettings = { ...settings, language: lang };
    saveSettings(updated);
    setSettings(updated);
    localStorage.setItem('dsc_lang', lang);
    i18n.changeLanguage(lang);
  };

  const changeTextSize = (size: 'normal' | 'large' | 'extraLarge') => {
    const updated: AppSettings = { ...settings, textSize: size };
    saveSettings(updated);
    setSettings(updated);
  };

  const toggleTheme = (theme: 'light' | 'dark') => {
    const updated: AppSettings = { ...settings, theme };
    saveSettings(updated);
    setSettings(updated);
    document.documentElement.setAttribute('data-theme', theme);
  };

  const toggleAlerts = () => {
    const updated: AppSettings = { ...settings, alertsEnabled: !settings.alertsEnabled };
    saveSettings(updated);
    setSettings(updated);
  };

  const handleRestartProgress = () => {
    const p = getProgress();
    saveProgress({
      ...p,
      lessonsCompleted: 0,
      scenariosCompleted: 0,
      checklistTicks: [],
    });
    setShowRestartModal(false);
    alert('Progress has been reset.');
  };

  const handleCaregiverRemove = () => {
    saveCaregiver(null);
    alert('Caregiver removed.');
  };

  const handleDeleteAccount = async () => {
    await clearAllData();
    window.location.href = '/';
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '56px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {t('back')}
        </button>
      </div>

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('settings')}
      </h1>

      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 1. Language */}
        <div style={{ padding: '18px 20px', borderBottom: 'var(--border)' }}>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, marginBottom: '8px' }}>
            1. {t('settings.language')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['en', 'hi', 'mr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  background: settings.language === l ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: settings.language === l ? '#fff' : 'var(--color-text)',
                  border: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  fontSize: 'var(--text-body)',
                  cursor: 'pointer',
                }}
              >
                {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : 'मराठी'}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Text Size */}
        <div style={{ padding: '18px 20px', borderBottom: 'var(--border)' }}>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, marginBottom: '8px' }}>
            2. {t('settings.textSize')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['normal', 'large', 'extraLarge'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => changeTextSize(sz)}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  background: settings.textSize === sz ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: settings.textSize === sz ? '#fff' : 'var(--color-text)',
                  border: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {t(`textSize.${sz}`)}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Theme */}
        <div style={{ padding: '18px 20px', borderBottom: 'var(--border)' }}>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, marginBottom: '8px' }}>
            3. {t('settings.theme')}
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['light', 'dark'] as const).map((th) => (
              <button
                key={th}
                onClick={() => toggleTheme(th)}
                style={{
                  flex: 1,
                  minHeight: '44px',
                  background: settings.theme === th ? 'var(--color-primary)' : 'var(--color-surface)',
                  color: settings.theme === th ? '#fff' : 'var(--color-text)',
                  border: 'var(--border)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 600,
                  fontSize: 'var(--text-body)',
                  cursor: 'pointer',
                }}
              >
                {t(`theme.${th}`)}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Scam Alerts */}
        <div style={{ padding: '18px 20px', borderBottom: 'var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--text-body)', fontWeight: 700 }}>4. {t('settings.alerts')}</div>
            <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Notify when new fraud types are discovered</div>
          </div>
          <input
            type="checkbox"
            checked={settings.alertsEnabled}
            onChange={toggleAlerts}
            style={{ width: '28px', height: '28px', accentColor: 'var(--color-primary)', cursor: 'pointer' }}
          />
        </div>

        {/* 5. Permissions */}
        <div
          onClick={() => navigate('/app/caregiver')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>5. {t('settings.permissions')}</span>
          <span>&rarr;</span>
        </div>

        {/* 6. Replay Tutorial */}
        <div
          onClick={() => navigate('/app/help/tutorial')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>6. {t('settings.replayTutorial')}</span>
          <span>&rarr;</span>
        </div>

        {/* 7. Restart Progress */}
        <div
          onClick={() => setShowRestartModal(true)}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>7. {t('settings.restartProgress')}</span>
          <span>&rarr;</span>
        </div>

        {/* 8. Caregiver Remove */}
        <div
          onClick={handleCaregiverRemove}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>8. {t('caregiver.remove')}</span>
          <span>&rarr;</span>
        </div>

        {/* 9. Rate Us */}
        <div
          onClick={() => alert('Thank you for rating Satark!')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>9. {t('settings.rateUs')}</span>
          <span>&rarr;</span>
        </div>

        {/* 10. Feedback mailto */}
        <a
          href="mailto:support@satark-safety.app?subject=Satark%20User%20Feedback"
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', display: 'flex', justifyContent: 'space-between', color: 'var(--color-text)', textDecoration: 'none' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>10. {t('settings.feedback')}</span>
          <span>&rarr;</span>
        </a>

        {/* 11. About */}
        <div
          onClick={() => navigate('/app/about')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>11. {t('settings.about')}</span>
          <span>&rarr;</span>
        </div>

        {/* 12. Terms of Use */}
        <div
          onClick={() => navigate('/app/terms')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>12. {t('settings.terms')}</span>
          <span>&rarr;</span>
        </div>

        {/* 13. Privacy Policy */}
        <div
          onClick={() => navigate('/app/privacy')}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>13. {t('settings.privacy')}</span>
          <span>&rarr;</span>
        </div>

        {/* 14. Version */}
        <div style={{ padding: '18px 20px', borderBottom: 'var(--border)', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>14. {t('settings.version')}</span>
          <span style={{ color: 'var(--color-text-muted)' }}>0.1.0 (prototype)</span>
        </div>

        {/* 15. Check for Updates */}
        <div
          onClick={() => {
            setShowUpdateToast(true);
            setTimeout(() => setShowUpdateToast(false), 2500);
          }}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
        >
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>15. {t('settings.checkUpdates')}</span>
          <span>{showUpdateToast ? 'Up to date' : 'Check'}</span>
        </div>

        {/* 16. Delete Account and Data */}
        <div
          onClick={() => setShowDeleteModal(true)}
          style={{ padding: '18px 20px', borderBottom: 'var(--border)', cursor: 'pointer', color: 'var(--color-danger)', fontWeight: 700, fontSize: 'var(--text-body)' }}
        >
          16. {t('settings.deleteAccount')}
        </div>

        {/* 17. Logout */}
        <div
          onClick={handleLogout}
          style={{ padding: '18px 20px', cursor: 'pointer', fontWeight: 600, fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}
        >
          17. {t('settings.logout')} ({profile?.name || 'User'})
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--color-danger)' }}>
              Delete Account & Clear All Data?
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
              This will permanently delete your profile, saved caregiver link, practice progress, and offline settings from this device.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleDeleteAccount}
                style={{ flex: 1, minHeight: 'var(--btn-height)', background: 'var(--color-danger)', color: '#fff', borderRadius: 'var(--radius)', border: 'none', fontWeight: 700, fontSize: 'var(--text-body)', cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, minHeight: 'var(--btn-height)', background: 'var(--color-surface)', color: 'var(--color-text)', border: 'var(--border)', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: 'var(--text-body)', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restart Progress Modal */}
      {showRestartModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', zIndex: 1000 }}>
          <div style={{ background: 'var(--color-surface)', padding: '24px', borderRadius: 'var(--radius-lg)', maxWidth: '420px', width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
              Restart Progress?
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
              This will reset completed lessons, scenarios, and your 1930 checklist.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleRestartProgress}
                style={{ flex: 1, minHeight: 'var(--btn-height)', background: 'var(--color-danger)', color: '#fff', borderRadius: 'var(--radius)', border: 'none', fontWeight: 700, fontSize: 'var(--text-body)', cursor: 'pointer' }}
              >
                Yes, Restart
              </button>
              <button
                onClick={() => setShowRestartModal(false)}
                style={{ flex: 1, minHeight: 'var(--btn-height)', background: 'var(--color-surface)', color: 'var(--color-text)', border: 'var(--border)', borderRadius: 'var(--radius)', fontWeight: 700, fontSize: 'var(--text-body)', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
