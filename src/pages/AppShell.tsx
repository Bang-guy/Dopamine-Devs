import { useState, useEffect } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PanicBar from '../components/PanicBar';
import TopBar from '../components/TopBar';
import SpotlightOverlay from '../features/tutorial/SpotlightOverlay';
import { isTutorialCompleted, setTutorialCompleted } from '../services/storage';

export default function AppShell() {
  const { t } = useTranslation();
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    if (!isTutorialCompleted()) {
      // Slight delay to let the Home page render and elements appear
      const timer = setTimeout(() => setShowTutorial(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for custom replay event from Settings and Help
  useEffect(() => {
    const handler = () => setShowTutorial(true);
    window.addEventListener('replay-tutorial', handler);
    return () => window.removeEventListener('replay-tutorial', handler);
  }, []);

  const handleTutorialFinish = () => {
    setTutorialCompleted(true);
    setShowTutorial(false);
  };

  const navItems = [
    {
      to: '/app/home',
      label: t('nav.home'),
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      to: '/app/practise',
      label: t('nav.practise'),
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },
    {
      to: '/app/check',
      label: t('nav.check'),
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      to: '/app/learn',
      label: t('nav.learn'),
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      to: '/app/help',
      label: t('nav.help'),
      svg: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <TopBar />
      <main style={{ flex: 1, paddingBottom: '140px', overflowY: 'auto' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <nav
        aria-label="Main Navigation"
        style={{
          position: 'fixed',
          bottom: '60px',
          left: 0,
          right: 0,
          background: 'var(--color-surface, #fff)',
          borderTop: 'var(--border)',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '6px 0',
          zIndex: 100,
        }}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              textDecoration: 'none',
              padding: '6px 10px',
              minWidth: '56px',
            })}
          >
            {item.svg}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <PanicBar />

      {/* Spotlight Tutorial Overlay */}
      {showTutorial && <SpotlightOverlay onFinish={handleTutorialFinish} />}
    </div>
  );
}
