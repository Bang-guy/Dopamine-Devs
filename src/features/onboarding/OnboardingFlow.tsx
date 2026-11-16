import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveProfile, saveProgress, getProgress, type UserProfile } from '../../services/storage';
import Step1Language from './Step1Language';
import Step2Name from './Step2Name';
import Step3Age from './Step3Age';
import Step4Phone from './Step4Phone';
import Step5DemoCode from './Step5DemoCode';
import Step6Tutorial from './Step6Tutorial';
import Step7Alerts from './Step7Alerts';

export interface OnboardingData {
  language: 'en' | 'hi' | 'mr';
  name: string;
  ageRange: UserProfile['ageRange'];
  phone: string;
  demoCode: string;
  alertsEnabled: boolean;
}

const TOTAL_STEPS = 7;

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({});

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
    if (step > 1) setStep(step - 1);
  }

  function finish(d: Partial<OnboardingData>) {
    const profile: UserProfile = {
      name: d.name ?? '',
      ageRange: d.ageRange ?? 'under50',
      phone: d.phone ?? '',
      language: d.language ?? 'en',
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
        <div style={{ height: '100%', background: 'var(--color-primary)', width: `${progressPct}%`, transition: 'width 0.3s ease' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: 'var(--max-width)', margin: '0 auto', width: '100%', padding: 'var(--gap)' }}>
        {step === 1 && <Step1Language onNext={(lang) => next({ language: lang })} />}
        {step === 2 && <Step2Name onNext={(name) => next({ name })} onBack={back} />}
        {step === 3 && <Step3Age onNext={(ageRange) => next({ ageRange })} onBack={back} />}
        {step === 4 && <Step4Phone onNext={(phone) => next({ phone })} onBack={back} />}
        {step === 5 && <Step5DemoCode onNext={(demoCode) => next({ demoCode })} onBack={back} />}
        {step === 6 && <Step6Tutorial onNext={() => next({})} onBack={back} onSkip={() => next({})} />}
        {step === 7 && <Step7Alerts onNext={(alertsEnabled) => next({ alertsEnabled })} onBack={back} />}
      </div>
    </div>
  );
}
