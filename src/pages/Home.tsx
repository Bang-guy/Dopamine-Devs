import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getProfile, getCaregiver } from '../services/storage';
import ListenButton from '../components/ListenButton';
import ProgressBar from '../components/ProgressBar';
import TipBox from '../components/TipBox';
import NewsSection from '../components/NewsSection';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const profile = getProfile();
  const caregiver = getCaregiver();
  const greeting = t('greeting', { name: profile?.name ?? 'Friend' });

  const tiles = [
    { label: t('home.checkMessage'), to: '/app/check', bg: 'var(--color-primary)', color: '#fff' },
    { label: t('home.practise'),    to: '/app/practise', bg: 'var(--color-secondary)', color: '#fff' },
    { label: t('home.askLearn'),    to: '/app/learn',   bg: 'var(--color-accent)',  color: '#fff' },
    { label: t('home.help'),        to: '/app/help',    bg: 'var(--color-danger)',  color: '#fff' },
  ];

  return (
    <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>{greeting}</h1>
        <ListenButton text={greeting} />
      </div>

      {/* 2. Scrolling Safety Tip Box */}
      <TipBox />

      {/* 3. Four Main Action Cards in 1 Column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {tiles.map((tile) => (
          <div key={tile.to} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              type="button"
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
                textAlign: 'left',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {tile.label}
            </button>
            <ListenButton text={tile.label} />
          </div>
        ))}
      </div>

      {/* 5. Family Protection (Caregiver) Quick Access Card */}
      <section
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg, 16px)',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div>
          <div style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: 'var(--color-text)' }}>
            {t('home.familyCardTitle', 'Family Protection')}
          </div>
          <div style={{ fontSize: 'var(--text-sm, 14px)', color: 'var(--color-text-muted)', marginTop: '2px' }}>
            {caregiver && caregiver.approved
              ? t('home.familyConnected', 'Caregiver linked: {{name}}', { name: caregiver.name })
              : t('home.familyCardDesc', 'Link a trusted family member or helper')}
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate('/app/caregiver')}
          style={{
            minHeight: '48px',
            padding: '8px 16px',
            background: 'var(--color-secondary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius)',
            fontSize: 'var(--text-body)',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          {caregiver && caregiver.approved
            ? t('home.manageCaregiver', 'Manage')
            : t('home.addCaregiver', 'Connect')}
        </button>
      </section>

      {/* 6. Learning Progress Section */}
      <ProgressBar />

      {/* 7. Cyber Fraud News Section */}
      <NewsSection />
    </div>
  );
}
