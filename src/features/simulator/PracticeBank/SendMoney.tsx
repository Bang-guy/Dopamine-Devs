import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListenButton from '../../../components/ListenButton';
import { getProgress, saveProgress } from '../../../services/storage';
import { speak } from '../../../services/speech';

interface SendMoneyProps {
  onBack: () => void;
}

type Step = 'payee' | 'amount' | 'review' | 'done' | 'trap';

const PAYEES = [
  { id: 'ravi', nameKey: 'bank.payeeRavi', upi: 'ravi.kumar@upi' },
  { id: 'sunita', nameKey: 'bank.payeeSunita', upi: 'sunita.devi@upi' },
  { id: 'helpdesk', nameKey: 'bank.payeeHelpdesk', upi: 'helpdesk.support@upi', isTrap: true },
];

export default function SendMoney({ onBack }: SendMoneyProps) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const [step, setStep] = useState<Step>('payee');
  const [selectedPayee, setSelectedPayee] = useState<typeof PAYEES[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [trapChoice, setTrapChoice] = useState<'wrong' | 'right' | null>(null);

  function selectPayee(payee: typeof PAYEES[0]) {
    setSelectedPayee(payee);
    if (payee.isTrap) {
      setStep('trap');
    } else {
      setStep('amount');
    }
  }

  function handleAmountSubmit() {
    const val = parseInt(amount, 10);
    if (!val || val <= 0) return;
    setStep('review');
  }

  function handleConfirm() {
    // Mark a practice payment completed
    const progress = getProgress();
    const completedPayments: string[] = (progress as any).completedPayments ?? [];
    if (selectedPayee && !completedPayments.includes(selectedPayee.id)) {
      completedPayments.push(selectedPayee.id);
      saveProgress({
        ...progress,
        completedPayments,
      } as any);
    }
    setStep('done');
  }

  function handleTrapChoice(choice: 'wrong' | 'right') {
    setTrapChoice(choice);
    // Mark trap completed
    const progress = getProgress();
    const completedPayments: string[] = (progress as any).completedPayments ?? [];
    if (!completedPayments.includes('helpdesk-trap')) {
      completedPayments.push('helpdesk-trap');
      saveProgress({
        ...progress,
        completedPayments,
      } as any);
    }
    if (choice === 'wrong') {
      const msg = t('bank.trapWrongFeedback');
      speak(msg, lang);
    }
  }

  // ─── Payee selection ───
  if (step === 'payee') {
    return (
      <div>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            marginBottom: '16px',
          }}
        >
          {t('back')}
        </button>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '16px' }}>{t('bank.choosePayee')}</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
          {PAYEES.map((payee) => (
            <button
              key={payee.id}
              onClick={() => selectPayee(payee)}
              style={{
                minHeight: 'var(--btn-height)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                padding: '16px',
                width: '100%',
                textAlign: 'left',
              }}
            >
              <div>{t(payee.nameKey)}</div>
              <div style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{payee.upi}</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ─── Trap scenario (Helpdesk) ───
  if (step === 'trap') {
    return (
      <div>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            marginBottom: '16px',
          }}
        >
          {t('back')}
        </button>

        {/* Trap message bubble */}
        <div style={{
          background: '#E8E8E8',
          borderRadius: '16px 16px 16px 4px',
          padding: '20px',
          marginBottom: '24px',
          maxWidth: '90%',
        }}>
          <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
            {t('bank.trapMessage')}
          </p>
          <ListenButton text={t('bank.trapMessage')} />
        </div>

        {trapChoice === null ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
            <button
              onClick={() => handleTrapChoice('wrong')}
              style={{
                minHeight: 'var(--btn-height)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                background: 'var(--color-danger)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                width: '100%',
              }}
            >
              {t('bank.trapSendBack')}
            </button>
            <button
              onClick={() => handleTrapChoice('right')}
              style={{
                minHeight: 'var(--btn-height)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                background: 'var(--color-safe)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                width: '100%',
              }}
            >
              {t('bank.trapReport')}
            </button>
          </div>
        ) : (
          <div style={{
            padding: '24px',
            background: trapChoice === 'right' ? '#F0FDF4' : '#FEF2F2',
            border: trapChoice === 'right' ? '2px solid var(--color-safe)' : '2px solid var(--color-danger)',
            borderRadius: 'var(--radius-lg)',
          }}>
            <h3 style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 700,
              color: trapChoice === 'right' ? 'var(--color-safe)' : 'var(--color-danger)',
              marginBottom: '12px',
            }}>
              {trapChoice === 'right' ? t('simulator.correct') : t('simulator.wrong')}
            </h3>
            <p style={{ fontSize: 'var(--text-body)', marginBottom: '12px', lineHeight: 1.5 }}>
              {trapChoice === 'right' ? t('bank.trapRightFeedback') : t('bank.trapWrongFeedback')}
            </p>
            <ListenButton text={trapChoice === 'right' ? t('bank.trapRightFeedback') : t('bank.trapWrongFeedback')} />
            <button
              onClick={onBack}
              style={{
                marginTop: '20px',
                minHeight: 'var(--btn-height)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                width: '100%',
              }}
            >
              {t('simulator.backToHub')}
            </button>
          </div>
        )}
      </div>
    );
  }

  // ─── Amount entry ───
  if (step === 'amount') {
    return (
      <div>
        <button
          onClick={() => setStep('payee')}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            marginBottom: '16px',
          }}
        >
          {t('back')}
        </button>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '16px' }}>{t('bank.enterAmount')}</h2>
        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          style={{
            fontSize: 'var(--text-2xl)',
            padding: '16px',
            width: '100%',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
            marginBottom: '16px',
          }}
        />
        <button
          onClick={handleAmountSubmit}
          disabled={!amount || parseInt(amount, 10) <= 0}
          style={{
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            width: '100%',
            opacity: (!amount || parseInt(amount, 10) <= 0) ? 0.5 : 1,
          }}
        >
          {t('bank.review')}
        </button>
      </div>
    );
  }

  // ─── Review screen ───
  if (step === 'review') {
    const reviewText = `${t('bank.reviewPayee')}: ${selectedPayee ? t(selectedPayee.nameKey) : ''}. UPI: ${selectedPayee?.upi}. ${t('bank.reviewAmount')}: Rs ${amount}`;
    return (
      <div>
        <button
          onClick={() => setStep('amount')}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            padding: '8px 0',
            marginBottom: '16px',
          }}
        >
          {t('back')}
        </button>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '16px' }}>{t('bank.reviewTitle')}</h2>

        <div style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px',
          marginBottom: '16px',
        }}>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{t('bank.reviewPayee')}</span>
            <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}>{selectedPayee ? t(selectedPayee.nameKey) : ''}</div>
          </div>
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>UPI ID</span>
            <div style={{ fontSize: 'var(--text-body)' }}>{selectedPayee?.upi}</div>
          </div>
          <div>
            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{t('bank.reviewAmount')}</span>
            <div style={{ fontSize: 'var(--text-xl)', fontWeight: 700 }}>Rs {amount}</div>
          </div>
        </div>

        {/* Teaching point */}
        <div style={{
          background: '#FEF9C3',
          border: '1px solid #FDE047',
          borderRadius: 'var(--radius)',
          padding: '14px 16px',
          fontSize: 'var(--text-body)',
          color: '#713F12',
          marginBottom: '16px',
        }}>
          {t('bank.reviewTeachingPoint')}
        </div>

        <ListenButton text={reviewText} />

        {/* Disclaimer */}
        <p style={{
          fontSize: '14px',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          margin: '16px 0',
        }}>
          {t('bank.noRealMoney')}
        </p>

        <button
          onClick={handleConfirm}
          style={{
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            background: 'var(--color-safe)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            width: '100%',
          }}
        >
          {t('bank.confirm')}
        </button>
      </div>
    );
  }

  // ─── Done screen ───
  if (step === 'done') {
    return (
      <div style={{ textAlign: 'center', paddingTop: '48px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10003;</div>
        <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: '12px' }}>{t('bank.paymentDone')}</h2>
        <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', marginBottom: '24px' }}>
          {t('bank.noRealMoney')}
        </p>
        <button
          onClick={onBack}
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
          {t('simulator.backToHub')}
        </button>
      </div>
    );
  }

  return null;
}
