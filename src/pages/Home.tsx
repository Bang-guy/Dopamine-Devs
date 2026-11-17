import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/storage';
import ListenButton from '../components/ListenButton';
import ProgressBar from '../components/ProgressBar';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profile = getProfile();
  const greeting = t('greeting', { name: profile?.name ?? 'Friend' });

  const tiles = [
    { label: t('home.checkMessage'), to: '/app/check', bg: 'var(--color-primary)', color: '#fff' },
    { label: t('home.practise'),    to: '/app/practise', bg: 'var(--color-secondary)', color: '#fff' },
    { label: t('home.askLearn'),    to: '/app/learn',   bg: 'var(--color-accent)',  color: '#fff' },
    { label: t('home.help'),        to: '/app/help',    bg: 'var(--color-danger)',  color: '#fff' },
  ];

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h1 style={{ fontSize: 'var(--text-xl)' }}>{greeting}</h1>
        <ListenButton text={greeting} />
      </div>

      <p style={{ background: '#FEF9C3', border: '1px solid #FDE047', borderRadius: 'var(--radius)', padding: '14px 16px', fontSize: 'var(--text-body)', color: '#713F12' }}>
        💡 {t('coreRule')}
      </p>

      <ProgressBar />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {tiles.map((tile) => (
          <div key={tile.to} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => navigate(tile.to)}
              style={{
                flex: 1,
                background: tile.bg,
                color: tile.color,
                minHeight: 'var(--btn-height)',
                borderRadius: 'var(--radius-lg, 16px)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                padding: '16px',
                textAlign: 'left'
              }}
            >
              {tile.label}
            </button>
            <ListenButton text={tile.label} />
          </div>
        ))}
      </div>
    </div>
  );
}
