import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { saveProfile, saveProgress, getProgress, type UserProfile } from '../../services/storage';
import Page1Details from './Page1Details';
import Page2MobileVerification from './Page2MobileVerification';
import Step7Alerts from './Step7Alerts';

export interface OnboardingData {
  name: string;
  ageRange: UserProfile['ageRange'];
  gender: UserProfile['gender'];
  city: string;
  phone: string;
  demoCode: string;
  alertsEnabled: boolean;
}

const TOTAL_STEPS = 3;

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    ageRange: '60to69',
    gender: 'woman',
    demoCode: '1234',
  });

  function next(partial: Partial<OnboardingData>) {
    const updated = { ...data, ...partial };
    setData(updated);
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      finish(updated);
    }
  }

  function back() {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  }

  function finish(d: Partial<OnboardingData>) {
    const currentLang = (i18n.language?.slice(0, 2) as 'en' | 'hi' | 'mr') || 'en';
    const profile: UserProfile = {
      name: d.name ?? '',
      ageRange: d.ageRange ?? '60to69',
      gender: d.gender ?? 'woman',
      city: d.city ?? '',
      phone: d.phone ?? '',
      language: currentLang,
      onboardingComplete: true,
    };
    saveProfile(profile);
    const progress = getProgress();
    saveProgress({ ...progress, lessonsCompleted: 0, scenariosCompleted: 0, checklistTicks: [] });
    navigate('/app/home', { replace: true });
  }

  const progressPct = Math.round((step / TOTAL_STEPS) * 100);

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Progress bar */}
      <div style={{ height: '4px', background: 'var(--color-border)' }}>
        <div
          style={{
            height: '100%',
            background: 'var(--color-primary)',
            width: `${progressPct}%`,
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          width: '100%',
          padding: 'var(--gap)',
        }}
      >
        {step === 1 && (
          <Page1Details
            initialValues={{
              name: data.name,
              ageRange: data.ageRange,
              gender: data.gender,
              city: data.city,
            }}
            onNext={(details) => next(details)}
            onBack={back}
          />
        )}
        {step === 2 && (
          <Page2MobileVerification
            initialPhone={data.phone}
            initialDemoCode={data.demoCode}
            onNext={({ phone, demoCode }) => next({ phone, demoCode })}
            onBack={back}
          />
        )}
        {step === 3 && (
          <Step7Alerts
            onNext={(alertsEnabled) => next({ alertsEnabled })}
            onBack={back}
          />
        )}
      </div>
    </div>
  );
}
