import { Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PanicBar from '../components/PanicBar';

export default function AppShell() {
  const { t } = useTranslation();

  const navItems = [
    { to: '/app/home',     label: t('nav.home'),     icon: '🏠' },
    { to: '/app/practise', label: t('nav.practise'),  icon: '🎯' },
    { to: '/app/check',    label: t('nav.check'),     icon: '🔍' },
    { to: '/app/learn',    label: t('nav.learn'),     icon: '📚' },
    { to: '/app/help',     label: t('nav.help'),      icon: '🆘' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      <PanicBar />
      <main style={{ flex: 1, paddingTop: '60px', paddingBottom: '72px', overflowY: 'auto' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'var(--color-surface, #fff)', borderTop: 'var(--border)', display: 'flex', justifyContent: 'space-around', padding: '8px 0', zIndex: 100 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
              fontSize: '11px', fontWeight: isActive ? 700 : 400,
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              textDecoration: 'none', padding: '4px 8px',
            })}
          >
            <span style={{ fontSize: '22px' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
