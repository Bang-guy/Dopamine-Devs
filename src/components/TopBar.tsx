import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getSettings, saveSettings } from '../services/storage';

export default function TopBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const current = getSettings().theme || 'light';
    setTheme(current);
    document.documentElement.setAttribute('data-theme', current);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const settings = getSettings();
    saveSettings({ ...settings, theme: nextTheme });
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 150,
        background: 'var(--color-surface)',
        borderBottom: 'var(--border)',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '56px',
          padding: '8px 16px',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        {/* App Title / Home Link */}
        <button
          type="button"
          onClick={() => navigate('/app/home')}
          style={{
            background: 'none',
            border: 'none',
            padding: '4px 8px',
            fontSize: 'var(--text-xl, 24px)',
            fontWeight: 800,
            color: 'var(--color-primary)',
            cursor: 'pointer',
            textAlign: 'left',
          }}
          aria-label="Satark Home"
        >
          {t('appName', 'Satark')}
        </button>

        {/* Right side navigation buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={handleToggleTheme}
            style={{
              minHeight: '44px',
              padding: '6px 12px',
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: 700,
              background: 'transparent',
              border: 'var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--color-text)',
              cursor: 'pointer',
            }}
            aria-label="Toggle light or dark theme"
          >
            {theme === 'light' ? t('theme.dark', 'Dark') : t('theme.light', 'Light')}
          </button>

          {/* Caregiver Button */}
          <button
            type="button"
            onClick={() => navigate('/app/caregiver')}
            style={{
              minHeight: '44px',
              padding: '6px 12px',
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: isActive('/app/caregiver') ? 700 : 600,
              background: isActive('/app/caregiver') ? 'var(--color-primary)' : 'transparent',
              color: isActive('/app/caregiver') ? '#fff' : 'var(--color-text)',
              border: 'var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            {t('nav.caregiver', 'Family')}
          </button>

          {/* Profile Button */}
          <button
            type="button"
            onClick={() => navigate('/app/profile')}
            style={{
              minHeight: '44px',
              padding: '6px 12px',
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: isActive('/app/profile') ? 700 : 600,
              background: isActive('/app/profile') ? 'var(--color-primary)' : 'transparent',
              color: isActive('/app/profile') ? '#fff' : 'var(--color-text)',
              border: 'var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            {t('nav.profile', 'Profile')}
          </button>

          {/* Settings Button */}
          <button
            type="button"
            onClick={() => navigate('/app/settings')}
            style={{
              minHeight: '44px',
              padding: '6px 12px',
              fontSize: 'var(--text-sm, 14px)',
              fontWeight: isActive('/app/settings') ? 700 : 600,
              background: isActive('/app/settings') ? 'var(--color-primary)' : 'transparent',
              color: isActive('/app/settings') ? '#fff' : 'var(--color-text)',
              border: 'var(--border)',
              borderRadius: 'var(--radius)',
              cursor: 'pointer',
            }}
          >
            {t('nav.settings', 'Settings')}
          </button>
        </div>
      </div>
    </header>
  );
}
