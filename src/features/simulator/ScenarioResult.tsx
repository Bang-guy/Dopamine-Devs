import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListenButton from '../../components/ListenButton';

interface ScenarioResultProps {
  correct: boolean;
  feedback: string;
  flags?: string[];
  scenarioId: string;
}

export default function ScenarioResult({ correct, feedback, flags }: ScenarioResultProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '24px',
      background: correct ? '#F0FDF4' : '#FEF2F2',
      border: correct ? '2px solid var(--color-safe)' : '2px solid var(--color-danger)',
      borderRadius: 'var(--radius-lg)',
      marginTop: '24px',
    }}>
      <h3 style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 700,
        color: correct ? 'var(--color-safe)' : 'var(--color-danger)',
        marginBottom: '12px',
      }}>
        {correct ? t('simulator.correct') : t('simulator.wrong')}
      </h3>

      <p style={{ fontSize: 'var(--text-body)', marginBottom: '12px', lineHeight: 1.5 }}>
        {feedback}
      </p>

      <ListenButton text={feedback} />

      {/* Red flags for wrong choice (Scenario A) */}
      {!correct && flags && flags.length > 0 && (
        <div style={{ marginTop: '16px' }}>
          <p style={{ fontWeight: 700, fontSize: 'var(--text-body)', marginBottom: '8px' }}>
            {t('simulator.redFlags')}:
          </p>
          <ol style={{ paddingLeft: '20px' }}>
            {flags.map((flag, i) => (
              <li key={i} style={{
                fontSize: 'var(--text-body)',
                marginBottom: '8px',
                color: 'var(--color-danger)',
                fontWeight: 600,
              }}>
                {flag}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', marginTop: '24px' }}>
        <button
          onClick={() => navigate('/app/practise')}
          style={{
            background: 'var(--color-primary)',
            color: '#fff',
            minHeight: 'var(--btn-height)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            borderRadius: 'var(--radius)',
            width: '100%',
          }}
        >
          {t('simulator.backToHub')}
        </button>
      </div>
    </div>
  );
}
