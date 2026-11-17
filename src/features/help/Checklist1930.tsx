import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { getProgress, saveProgress } from '../../services/storage';
import ListenButton from '../../components/ListenButton';

export default function Checklist1930() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const progress = getProgress();
  const savedTicks = progress.checklistTicks || [];

  const [ticks, setTicks] = useState<boolean[]>([
    !!savedTicks[0],
    !!savedTicks[1],
    !!savedTicks[2],
    !!savedTicks[3],
    !!savedTicks[4],
  ]);

  const [showBankGuide, setShowBankGuide] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const steps = [
    {
      title: t('help.checklist.step1Title', { defaultValue: '1. Call 1930 now' }),
      body: t('help.checklist.step1Body', {
        defaultValue:
          'Keep ready: your bank name, the amount, the time of the transaction, and the 12-digit UTR number from your SMS or UPI app.',
      }),
      action: (
        <a
          href="tel:1930"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-danger)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            textDecoration: 'none',
            minHeight: '48px',
          }}
        >
          {t('panic.cta')}
        </a>
      ),
    },
    {
      title: t('help.checklist.step2Title', { defaultValue: '2. Ask your bank to freeze your account and cards' }),
      body: t('help.checklist.step2Body', {
        defaultValue:
          'Call the number on the back of your card. Ask them to block your card and UPI. The bank does this, not this app.',
      }),
      action: (
        <button
          onClick={() => setShowBankGuide(!showBankGuide)}
          style={{
            background: 'transparent',
            border: '1px solid var(--color-primary)',
            color: 'var(--color-primary)',
            borderRadius: 'var(--radius)',
            padding: '10px 16px',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            cursor: 'pointer',
            minHeight: '48px',
          }}
        >
          {showBankGuide
            ? t('help.checklist.hideGuide', { defaultValue: 'Hide guide' })
            : t('help.checklist.howToDoThis', { defaultValue: 'How to do this' })}
        </button>
      ),
    },
    {
      title: t('help.checklist.step3Title', {
        defaultValue: '3. Switch on Airplane Mode if you clicked a link or installed an app',
      }),
      body: t('help.checklist.step3Body', {
        defaultValue: 'This can stop a remote-control app from working.',
      }),
    },
    {
      title: t('help.checklist.step4Title', {
        defaultValue: '4. Take screenshots of the SMS, the chat, the link, and the payment receipt',
      }),
      body: t('help.checklist.step4Body', {
        defaultValue: 'Do not delete them.',
      }),
    },
    {
      title: t('help.checklist.step5Title', {
        defaultValue: '5. File a complaint at cybercrime.gov.in and save the acknowledgement number',
      }),
      body: t('help.checklist.step5Body', {
        defaultValue: 'Use the official portal to track progress and assist police investigation.',
      }),
      action: (
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            padding: '12px 20px',
            fontWeight: 700,
            fontSize: 'var(--text-body)',
            textDecoration: 'none',
            minHeight: '48px',
          }}
        >
          {t('help.checklist.openPortal', { defaultValue: 'Open cybercrime.gov.in' })}
        </a>
      ),
    },
  ];

  const toggleTick = (index: number) => {
    const updated = [...ticks];
    updated[index] = !updated[index];
    setTicks(updated);

    const currentProg = getProgress();
    saveProgress({
      ...currentProg,
      checklistTicks: updated,
    });
  };

  const handleStartOver = () => {
    setShowConfirmClear(true);
  };

  const confirmClearTicks = () => {
    const cleared = [false, false, false, false, false];
    setTicks(cleared);
    setShowConfirmClear(false);
    const currentProg = getProgress();
    saveProgress({
      ...currentProg,
      checklistTicks: cleared,
    });
  };

  const allCompleted = ticks.every(Boolean);

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={() => navigate('/app/help')}
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
        {t('help.checklist.title')}
      </h1>

      {allCompleted && (
        <div
          style={{
            padding: '16px 20px',
            background: '#F0FDF4',
            border: '2px solid var(--color-safe)',
            borderRadius: 'var(--radius)',
            fontSize: 'var(--text-body)',
            fontWeight: 700,
            color: 'var(--color-safe)',
          }}
        >
          {t('help.checklist.allDone', { defaultValue: 'You have done the important steps.' })}
        </div>
      )}

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
        {steps.map((st, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: ticks[i] ? '#F0FDF4' : 'var(--color-surface)',
              border: ticks[i] ? '2px solid var(--color-safe)' : 'var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <input
                type="checkbox"
                id={`step-chk-${i}`}
                checked={ticks[i]}
                onChange={() => toggleTick(i)}
                style={{
                  width: '32px',
                  height: '32px',
                  minWidth: '32px',
                  marginTop: '2px',
                  cursor: 'pointer',
                  accentColor: 'var(--color-safe)',
                }}
              />
              <label
                htmlFor={`step-chk-${i}`}
                style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  lineHeight: 1.4,
                  color: 'var(--color-text)',
                }}
              >
                {st.title}
              </label>
            </div>

            <p style={{ margin: 0, paddingLeft: '48px', fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              {st.body}
            </p>

            {st.action && <div style={{ paddingLeft: '48px' }}>{st.action}</div>}

            {i === 1 && showBankGuide && (
              <div
                style={{
                  marginLeft: '48px',
                  padding: '14px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.5,
                }}
              >
                <strong>{t('help.checklist.guideTitle', { defaultValue: 'Bank Account Freeze Guide:' })}</strong>
                <ol style={{ paddingLeft: '20px', margin: '8px 0 0 0' }}>
                  <li>Find the 1800 toll-free number printed on the back of your debit or credit card.</li>
                  <li>Select the option for unauthorized transaction or lost card immediately.</li>
                  <li>Request the executive to freeze all net banking and UPI access until further notice.</li>
                </ol>
              </div>
            )}

            <div style={{ paddingLeft: '48px' }}>
              <ListenButton text={`${st.title}. ${st.body}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Start Over */}
      {showConfirmClear ? (
        <div
          style={{
            padding: '20px',
            background: '#FEF2F2',
            border: '1px solid var(--color-danger)',
            borderRadius: 'var(--radius)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 'var(--text-body)', color: 'var(--color-danger)' }}>
            {t('help.checklist.confirmReset', { defaultValue: 'Reset checklist? This clears all checkmarks.' })}
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={confirmClearTicks}
              style={{
                flex: 1,
                minHeight: 'var(--btn-height)',
                background: 'var(--color-danger)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                cursor: 'pointer',
              }}
            >
              {t('help.checklist.yesClear', { defaultValue: 'Yes, clear' })}
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              style={{
                flex: 1,
                minHeight: 'var(--btn-height)',
                background: 'var(--color-surface)',
                color: 'var(--color-text)',
                border: 'var(--border)',
                borderRadius: 'var(--radius)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                cursor: 'pointer',
              }}
            >
              {t('help.checklist.noKeep', { defaultValue: 'No, keep' })}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={handleStartOver}
          style={{
            minHeight: 'var(--btn-height)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            border: 'var(--border)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          {t('help.checklist.startOver')}
        </button>
      )}
    </div>
  );
}
