import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListenButton from '../../components/ListenButton';
import type { CheckResult } from '../../services/rules';

interface ResultCardProps {
  result: CheckResult;
  onClear: () => void;
}

export default function ResultCard({ result, onClear }: ResultCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const isRed = result.verdict === 'red';
  const isYellow = result.verdict === 'yellow';
  const isGreen = result.verdict === 'green';

  const bandBg = isRed
    ? 'var(--color-danger)'
    : isYellow
    ? 'var(--color-accent)'
    : 'var(--color-safe)';

  const verdictText = isRed
    ? t('verdicts.red')
    : isYellow
    ? t('verdicts.yellow')
    : t('verdicts.green');

  const safeStepText = t('safeNextStepText', {
    defaultValue: 'Do not click or reply. Call the number on your card. If money is lost, call 1930.',
  });

  const fullListenText = isGreen
    ? verdictText
    : `${verdictText}. ${result.reasons.join('. ')}. ${safeStepText}`;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: 'var(--color-surface)',
        borderRadius: 'var(--radius-lg)',
        border: 'var(--border)',
        overflow: 'hidden',
        paddingBottom: '20px',
      }}
    >
      {/* Colour band */}
      <div
        style={{
          background: bandBg,
          color: '#fff',
          padding: '20px',
          fontWeight: 700,
          fontSize: 'var(--text-xl)',
          textAlign: 'center',
        }}
      >
        {verdictText}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Reasons list for Red and Yellow */}
        {!isGreen && result.reasons.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: 'var(--text-body)', fontWeight: 700 }}>
              {t('checker.warningSigns', { defaultValue: 'Warning signs detected:' })}
            </span>
            <ul style={{ paddingLeft: '24px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {result.reasons.map((reason, idx) => (
                <li key={idx} style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safe next step box for Red and Yellow */}
        {!isGreen && (
          <div
            style={{
              background: '#FEF9C3',
              border: '1px solid #FDE047',
              borderRadius: 'var(--radius)',
              padding: '16px',
              color: '#713F12',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: 'var(--text-body)' }}>
              {t('safeNextStep')}
            </div>
            <div style={{ fontSize: 'var(--text-body)', lineHeight: 1.5 }}>
              {safeStepText}
            </div>
            <button
              onClick={() => navigate('/app/help/verify')}
              style={{
                marginTop: '12px',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-primary)',
                fontWeight: 700,
                fontSize: 'var(--text-body)',
                textDecoration: 'underline',
                padding: '4px 0',
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {t('checker.seeSteps', { defaultValue: 'See the steps to take' })}
            </button>
          </div>
        )}

        {/* Action Buttons: Listen, Call 1930, Check another message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)', marginTop: '8px' }}>
          <ListenButton text={fullListenText} />

          <a
            href="tel:1930"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 'var(--btn-height)',
              background: 'var(--color-danger)',
              color: '#fff',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              borderRadius: 'var(--radius)',
              textDecoration: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            {t('panic.cta')}
          </a>

          <button
            onClick={onClear}
            style={{
              minHeight: 'var(--btn-height)',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              borderRadius: 'var(--radius)',
              width: '100%',
            }}
          >
            {t('checker.checkAnother', { defaultValue: 'Check another message' })}
          </button>
        </div>
      </div>
    </div>
  );
}
