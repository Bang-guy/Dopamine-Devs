import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, PhoneCall, Volume2 } from 'lucide-react';
import ListenButton from '../../components/ListenButton';
import { speak, stopSpeech } from '../../services/speech';
import type { CheckResult } from '../../services/rules';

interface ResultCardProps {
  result: CheckResult;
  message: string;
  onClear: () => void;
}

export default function ResultCard({ result, message, onClear }: ResultCardProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const currentLang = (i18n.language?.slice(0, 2) as 'en' | 'hi' | 'mr') || 'en';

  const isRed = result.verdict === 'red';
  const isYellow = result.verdict === 'yellow';
  const isGreen = result.verdict === 'green';

  const bandBg = isRed
    ? 'var(--color-danger, #DC2626)'
    : isYellow
    ? 'var(--color-accent, #D97706)'
    : 'var(--color-safe, #16A34A)';

  const verdictText = isRed
    ? t('verdicts.red', 'Likely scam')
    : isYellow
    ? t('verdicts.yellow', 'Be careful')
    : t('verdicts.green', 'No warning signs found in this check');

  const actionText = t(
    'checker.whatToDoAction',
    'Do not click, reply, or send any money. Call the number on your card. If money is lost, call 1930 now.'
  );

  const fullSpeechText = isGreen
    ? `${verdictText}. ${t('checker.greenHeading')}. ${t('checker.greenBody')}`
    : `${verdictText}. ${result.reasons.join('. ')}. ${actionText}`;

  const handleFullListen = () => {
    speak(fullSpeechText, currentLang);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        background: 'var(--color-surface, #fff)',
        borderRadius: 'var(--radius-lg, 16px)',
        border: 'var(--border)',
        overflow: 'hidden',
        paddingBottom: '24px',
      }}
    >
      {/* a. "Message checked": the full message in large text, with Listen */}
      <div
        style={{
          padding: '20px',
          background: 'var(--color-bg, #FAF7F2)',
          borderBottom: 'var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text-muted)' }}>
            {t('checker.messageChecked', 'Message checked')}
          </span>
          <ListenButton text={message} />
        </div>
        <p
          style={{
            fontSize: '20px',
            lineHeight: 1.6,
            margin: 0,
            color: 'var(--color-text)',
            wordBreak: 'break-word',
          }}
        >
          {message}
        </p>
      </div>

      {/* b. Verdict band */}
      <div
        style={{
          background: bandBg,
          color: '#fff',
          padding: '20px',
          fontWeight: 800,
          fontSize: '22px',
          textAlign: 'center',
          letterSpacing: '0.3px',
        }}
      >
        {verdictText}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* c. "Why this is wrong" (Red and Yellow only) OR Green text */}
        {!isGreen ? (
          result.reasons.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--color-text)' }}>
                {t('checker.whyWrong', 'Why this is wrong')}
              </h2>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {result.reasons.map((reason, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '18px',
                      lineHeight: 1.5,
                      color: 'var(--color-text)',
                    }}
                  >
                    <AlertTriangle
                      size={22}
                      color={isRed ? 'var(--color-danger, #DC2626)' : 'var(--color-accent, #D97706)'}
                      style={{ flexShrink: 0, marginTop: '2px' }}
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        ) : (
          /* For Green, replaced by the exact fixed Green text */
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: '#F0FDF4',
              borderRadius: 'var(--radius, 12px)',
              border: '1px solid #BBF7D0',
            }}
          >
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#166534' }}>
              {t('checker.greenHeading', 'No warning signs found in this check')}
            </h2>
            <p style={{ fontSize: '18px', lineHeight: 1.6, margin: 0, color: '#14532D' }}>
              {t(
                'checker.greenBody',
                'This message seems trusted, and no crucial scam sign was found. But check it first. Do not do any money transaction without verifying it. If you are not sure, call the number on your card.'
              )}
            </p>
          </div>
        )}

        {/* d. "What to do now" (Red and Yellow only) */}
        {!isGreen && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '16px',
              background: '#FEF2F2',
              borderRadius: 'var(--radius, 12px)',
              border: '1px solid #FECACA',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#991B1B' }}>
              {t('checker.whatToDo', 'What to do now')}
            </h3>
            <p style={{ fontSize: '18px', lineHeight: 1.5, margin: 0, color: '#7F1D1D' }}>
              {actionText}
            </p>
          </div>
        )}

        {/* e. Buttons, 56px each: Listen, Call 1930, See the steps, Check another message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '4px' }}>
          {/* 1. Listen button */}
          <button
            type="button"
            onClick={handleFullListen}
            style={{
              minHeight: '56px',
              background: 'var(--color-surface, #fff)',
              color: 'var(--color-text)',
              border: 'var(--border)',
              borderRadius: 'var(--radius, 12px)',
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <Volume2 size={22} />
            {t('listen', 'Listen')}
          </button>

          {/* 2. Call 1930 */}
          <a
            href="tel:1930"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              minHeight: '56px',
              background: 'var(--color-danger, #DC2626)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 700,
              borderRadius: 'var(--radius, 12px)',
              textDecoration: 'none',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <PhoneCall size={20} />
            {t('panic.cta', 'Call 1930 Now')}
          </a>

          {/* 3. See the steps (Red and Yellow only) */}
          {!isGreen && (
            <button
              type="button"
              onClick={() => {
                stopSpeech();
                navigate('/app/help/verify');
              }}
              style={{
                minHeight: '56px',
                background: 'var(--color-secondary, #0D9488)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: 'var(--radius, 12px)',
                cursor: 'pointer',
                border: 'none',
                width: '100%',
              }}
            >
              {t('checker.seeSteps', 'See the steps')}
            </button>
          )}

          {/* 4. Check another message */}
          <button
            type="button"
            onClick={() => {
              stopSpeech();
              onClear();
            }}
            style={{
              minHeight: '56px',
              background: 'var(--color-primary, #1E3A8A)',
              color: '#fff',
              fontSize: '18px',
              fontWeight: 700,
              borderRadius: 'var(--radius, 12px)',
              cursor: 'pointer',
              border: 'none',
              width: '100%',
            }}
          >
            {t('checker.checkAnother', 'Check another message')}
          </button>
        </div>
      </div>
    </div>
  );
}
