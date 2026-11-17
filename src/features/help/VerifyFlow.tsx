import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListenButton from '../../components/ListenButton';

export default function VerifyFlow() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: t('verify.step1Title', { defaultValue: '1. Do not click, reply, or call the number in the message' }),
      body: t('verify.step1Body', {
        defaultValue: 'Scammers create urgency to rush you. Take a breath and stop. Never use phone numbers or links sent in an unexpected message.',
      }),
    },
    {
      num: 2,
      title: t('verify.step2Title', { defaultValue: '2. Open your bank app or type the address yourself' }),
      body: t('verify.step2Body', {
        defaultValue: 'Always use the trusted official mobile banking app or type the verified website address directly into your browser.',
      }),
    },
    {
      num: 3,
      title: t('verify.step3Title', { defaultValue: '3. Call the number printed on your card' }),
      body: t('verify.step3Body', {
        defaultValue: 'Turn your debit or credit card around. The toll-free number printed on the back connects you to real bank representatives.',
      }),
    },
    {
      num: 4,
      title: t('verify.step4Title', { defaultValue: '4. If you already shared an OTP or PIN, call 1930 now' }),
      body: t('verify.step4Body', {
        defaultValue: 'Quick action within the golden hour stops cybercriminals from withdrawing money from intermediary accounts.',
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
      num: 5,
      title: t('verify.step5Title', { defaultValue: '5. Report the message at cybercrime.gov.in' }),
      body: t('verify.step5Body', {
        defaultValue: 'Or use the report/spam option in WhatsApp or your SMS app to protect other citizens from this scam.',
      }),
    },
  ];

  const totalSteps = steps.length;
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;
  const current = steps[currentStep];

  const handleNext = () => {
    if (isLast) {
      navigate('/app/help');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (isFirst) {
      navigate('/app/help');
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div>
        <button
          onClick={handleBack}
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
          {t('help.verify.title')}
        </h1>
        <span style={{ fontSize: 'var(--text-body)', fontWeight: 600, color: 'var(--color-text-muted)' }}>
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {/* Progress pill indicator */}
      <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
        {steps.map((_, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              height: '6px',
              borderRadius: '3px',
              background: idx <= currentStep ? 'var(--color-primary)' : 'var(--color-border)',
            }}
          />
        ))}
      </div>

      {/* Current Step Card */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-xl)', margin: 0, color: 'var(--color-primary)', lineHeight: 1.4 }}>
          {current.title}
        </h2>

        <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.6, margin: 0, color: 'var(--color-text)' }}>
          {current.body}
        </p>

        {current.action && <div>{current.action}</div>}

        <ListenButton text={`${current.title}. ${current.body}`} />
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        <button
          onClick={handleNext}
          style={{
            flex: 1,
            minHeight: 'var(--btn-height)',
            background: 'var(--color-primary)',
            color: '#fff',
            borderRadius: 'var(--radius)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {isLast ? t('finish', { defaultValue: 'Finish' }) : t('next')}
        </button>
      </div>
    </div>
  );
}
