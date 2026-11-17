import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SafeBrowsingHub from '../features/simulator/SafeBrowsingHub';
import BankHome from '../features/simulator/PracticeBank/BankHome';

type Tab = 'browsing' | 'bank';

export default function Practise() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('browsing');
  const navigate = useNavigate();

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
          }}
        >
          {t('back')}
        </button>
        <span style={{
          background: 'var(--color-warning)',
          color: '#fff',
          padding: '2px 10px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 700,
        }}>
          {t('practice')}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '24px', borderBottom: 'var(--border)' }}>
        <button
          onClick={() => setTab('browsing')}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: 'var(--text-body)',
            fontWeight: tab === 'browsing' ? 700 : 400,
            background: 'transparent',
            color: tab === 'browsing' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderBottom: tab === 'browsing' ? '3px solid var(--color-primary)' : '3px solid transparent',
          }}
        >
          {t('simulator.safeBrowsing')}
        </button>
        <button
          onClick={() => setTab('bank')}
          style={{
            flex: 1,
            padding: '12px',
            fontSize: 'var(--text-body)',
            fontWeight: tab === 'bank' ? 700 : 400,
            background: 'transparent',
            color: tab === 'bank' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderBottom: tab === 'bank' ? '3px solid var(--color-primary)' : '3px solid transparent',
          }}
        >
          {t('simulator.practiceBank')}
        </button>
      </div>

      {tab === 'browsing' && <SafeBrowsingHub />}
      {tab === 'bank' && <BankHome />}
    </div>
  );
}
