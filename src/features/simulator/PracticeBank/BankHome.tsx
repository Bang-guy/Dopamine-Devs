import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListenButton from '../../../components/ListenButton';
import SendMoney from './SendMoney';

type Screen = 'home' | 'send' | 'history';

export default function BankHome() {
  const { t } = useTranslation();
  const [screen, setScreen] = useState<Screen>('home');

  if (screen === 'send') {
    return <SendMoney onBack={() => setScreen('home')} />;
  }

  const transactions = [
    { name: t('bank.txGrocery'), amount: '-Rs 340.00', color: 'var(--color-danger)' },
    { name: t('bank.txSalary'), amount: '+Rs 15,000.00', color: 'var(--color-safe)' },
    { name: t('bank.txRecharge'), amount: '-Rs 199.00', color: 'var(--color-danger)' },
  ];

  return (
    <div>
      {/* Bank header */}
      <div style={{
        background: 'var(--color-primary)',
        color: '#fff',
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        marginBottom: '20px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>{t('bank.name')}</h2>
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
        <p style={{ fontSize: 'var(--text-body)', marginTop: '8px', opacity: 0.9 }}>
          {t('bank.accountInfo')}
        </p>
        <p style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, marginTop: '8px' }}>
          Rs 12,450.00
        </p>
        <ListenButton text={`${t('bank.name')}. ${t('bank.accountInfo')}. ${t('bank.balance')}: Rs 12,450`} />
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', marginBottom: '24px' }}>
        <button
          onClick={() => setScreen('send')}
          style={{
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            width: '100%',
          }}
        >
          {t('bank.sendMoney')}
        </button>
        <button
          onClick={() => alert(t('bank.comingSoon'))}
          style={{
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
            width: '100%',
          }}
        >
          {t('bank.scanAndPay')}
        </button>
        <button
          onClick={() => alert(t('bank.comingSoon'))}
          style={{
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
            width: '100%',
          }}
        >
          {t('bank.blockCard')}
        </button>
      </div>

      {/* Recent transactions */}
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: '12px' }}>
        {t('bank.recentTransactions')}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {transactions.map((tx, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px 16px',
            background: 'var(--color-surface)',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
          }}>
            <span style={{ fontSize: 'var(--text-body)' }}>{tx.name}</span>
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 700, color: tx.color }}>{tx.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
