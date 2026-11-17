import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import scenarioData from '../../data/scenarios.json';
import { getProgress, saveProgress } from '../../services/storage';
import { speak } from '../../services/speech';
import ListenButton from '../../components/ListenButton';
import RedFlash from './RedFlash';
import ScenarioResult from './ScenarioResult';

export default function ScenarioScreen() {
  const { id } = useParams<{ id: string }>();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const scenario = scenarioData.scenarios.find((s) => s.id === id);
  const [chosen, setChosen] = useState<number | null>(null);
  const [flashTrigger, setFlashTrigger] = useState(false);

  if (!scenario) {
    return (
      <div style={{ padding: '24px' }}>
        <p>{t('simulator.notFound')}</p>
        <button onClick={() => navigate('/app/practise')}>{t('back')}</button>
      </div>
    );
  }

  const message = (scenario.message as any)[lang] || scenario.message.en;

  function handleChoice(btnIndex: number) {
    if (chosen !== null) return; // already chosen
    const btn = scenario!.buttons[btnIndex];
    setChosen(btnIndex);

    // Mark scenario as completed in progress
    const progress = getProgress();
    const completedScenarios: string[] = (progress as any).completedScenarios ?? [];
    if (!completedScenarios.includes(scenario!.id)) {
      completedScenarios.push(scenario!.id);
      saveProgress({
        ...progress,
        scenariosCompleted: completedScenarios.length,
        completedScenarios,
      } as any);
    }

    if (!btn.correct) {
      // Wrong choice: flash red and speak warning (Scenario A)
      setFlashTrigger(true);
      const feedback = (btn.feedback as any)[lang] || btn.feedback.en;
      // Speak the warning after a brief delay for the flash
      setTimeout(() => {
        speak(feedback, lang);
      }, 300);
    }
  }

  const chosenBtn = chosen !== null ? scenario.buttons[chosen] : null;
  const feedback = chosenBtn ? ((chosenBtn.feedback as any)[lang] || chosenBtn.feedback.en) : '';
  const flags = chosenBtn && !chosenBtn.correct && (chosenBtn as any).flags
    ? (chosenBtn as any).flags
    : undefined;

  return (
    <div style={{ padding: '16px' }}>
      {/* Red flash overlay */}
      <RedFlash trigger={flashTrigger} onDone={() => { setFlashTrigger(false); }} />

      {/* Practice badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => navigate('/app/practise')}
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

      {/* Scenario message bubble */}
      <div style={{
        background: '#E8E8E8',
        borderRadius: '16px 16px 16px 4px',
        padding: '20px',
        marginBottom: '24px',
        maxWidth: '90%',
      }}>
        <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}>{message}</p>
        <ListenButton text={message} />
      </div>

      {/* Choice buttons */}
      {chosen === null && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
          {scenario.buttons.map((btn, idx) => {
            const label = (btn.label as any)[lang] || btn.label.en;
            return (
              <button
                key={idx}
                onClick={() => handleChoice(idx)}
                style={{
                  minHeight: 'var(--btn-height)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  borderRadius: 'var(--radius)',
                  padding: '16px',
                  width: '100%',
                  background: idx === 0 ? 'var(--color-danger)' : 'var(--color-safe)',
                  color: '#fff',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Result */}
      {chosen !== null && chosenBtn && (
        <ScenarioResult
          correct={chosenBtn.correct}
          feedback={feedback}
          flags={flags}
          scenarioId={scenario.id}
        />
      )}
    </div>
  );
}
