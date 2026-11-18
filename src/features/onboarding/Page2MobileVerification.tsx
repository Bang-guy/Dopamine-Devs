import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ListenButton from '../../components/ListenButton';

interface Page2MobileVerificationProps {
  initialPhone?: string;
  initialDemoCode?: string;
  onNext: (data: { phone: string; demoCode: string }) => void;
  onBack: () => void;
}

export default function Page2MobileVerification({
  initialPhone = '',
  initialDemoCode = '1234',
  onNext,
  onBack,
}: Page2MobileVerificationProps) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState(initialPhone);
  const [demoCode, setDemoCode] = useState(initialDemoCode);

  const cleanPhone = phone.replace(/\D/g, '');
  const isValidPhone = cleanPhone.length === 10;
  const isValidDemoCode = demoCode.length === 4;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidPhone && isValidDemoCode) {
      onNext({ phone: cleanPhone, demoCode });
    }
  };

  const instructionText = `${t('onboarding.mobileVerificationTitle', 'Mobile verification')}. ${t('onboarding.phoneLabel', 'Mobile number (10 digits)')}. ${t('onboarding.demoCodeWording', 'This code is only for this app. Never share it with anyone who calls you.')}`;

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '24px 0',
      }}
    >
      <div>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '44px',
            fontSize: 'var(--text-body)',
            fontWeight: 600,
            padding: '6px 12px',
            border: 'var(--border)',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
          }}
        >
          {t('back')}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
          {t('onboarding.mobileVerificationTitle', 'Mobile verification')}
        </h1>
        <ListenButton text={instructionText} />
      </div>

      {/* Mobile Number Field */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label
          htmlFor="user-phone"
          style={{ fontSize: 'var(--text-lg)', fontWeight: 700 }}
        >
          {t('onboarding.phoneLabel', 'Mobile number (10 digits)')}
        </label>
        <input
          id="user-phone"
          type="tel"
          maxLength={10}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. 9876543210"
          required
          style={{
            padding: '16px',
            fontSize: 'var(--text-xl)',
            borderRadius: 'var(--radius)',
            border: '2px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            outline: 'none',
            letterSpacing: '2px',
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-sm, 15px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          {t('onboarding.phoneExplain', 'We only use this for your caregiver to link with you. We never share or sell it.')}
        </p>
      </div>

      {/* Demo Code Box */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: 'var(--border)',
          borderRadius: 'var(--radius-lg, 16px)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              background: 'var(--color-accent)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase',
            }}
          >
            {t('onboarding.demoCodeLabel', 'Demo')}
          </span>
          <span style={{ fontSize: 'var(--text-body)', fontWeight: 700 }}>
            {t('onboarding.demoCodeLabel', 'Demo Verification Code')}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-body)',
            color: 'var(--color-text)',
            lineHeight: 1.5,
          }}
        >
          {t('onboarding.demoCodeWording', 'This code is only for this app. Never share it with anyone who calls you.')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <input
            type="text"
            maxLength={4}
            value={demoCode}
            onChange={(e) => setDemoCode(e.target.value.replace(/\D/g, ''))}
            placeholder="1234"
            style={{
              padding: '14px',
              fontSize: '24px',
              fontWeight: 800,
              textAlign: 'center',
              letterSpacing: '8px',
              borderRadius: 'var(--radius)',
              border: '2px solid var(--color-primary)',
              background: 'var(--color-bg)',
              color: 'var(--color-primary)',
              maxWidth: '180px',
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValidPhone || !isValidDemoCode}
        style={{
          minHeight: '56px',
          background: isValidPhone && isValidDemoCode ? 'var(--color-primary)' : 'var(--color-border)',
          color: '#fff',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--text-lg)',
          fontWeight: 700,
          cursor: isValidPhone && isValidDemoCode ? 'pointer' : 'not-allowed',
          marginTop: '8px',
        }}
      >
        {t('next', 'Next')}
      </button>
    </form>
  );
}
