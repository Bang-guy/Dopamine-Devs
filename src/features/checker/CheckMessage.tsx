import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { checkMessage, type CheckResult } from '../../services/rules';
import ResultCard from './ResultCard';

export default function CheckMessage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);

  const handleCheck = () => {
    if (!text.trim()) return;
    setChecking(true);
    // Short reassuring delay under 1s
    setTimeout(() => {
      const res = checkMessage(text, lang);
      setResult(res);
      setChecking(false);
    }, 450);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
  };

  const handleBack = () => {
    setText('');
    setResult(null);
    navigate(-1);
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
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

      <h1 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
        {t('home.checkMessage')}
      </h1>

      {checking ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            fontSize: 'var(--text-xl)',
            fontWeight: 600,
            background: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: 'var(--border)',
          }}
        >
          {t('checker.checking', { defaultValue: 'Checking, please wait...' })}
        </div>
      ) : result ? (
        <ResultCard result={result} onClear={handleClear} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <label htmlFor="message-input" style={{ fontSize: 'var(--text-body)', fontWeight: 600 }}>
            {t('checker.pasteLabel', { defaultValue: 'Paste the message or link here' })}
          </label>
          <textarea
            id="message-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('checker.pastePlaceholder', {
              defaultValue: 'Paste SMS, WhatsApp message, or payment request link...',
            })}
            rows={6}
            style={{
              fontSize: 'var(--text-body)',
              padding: '16px',
              borderRadius: 'var(--radius)',
              border: 'var(--border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text)',
              width: '100%',
              boxSizing: 'border-box',
              resize: 'vertical',
              lineHeight: 1.5,
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
            <button
              onClick={handleCheck}
              disabled={!text.trim()}
              style={{
                minHeight: 'var(--btn-height)',
                background: text.trim() ? 'var(--color-primary)' : 'var(--color-border)',
                color: '#fff',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                borderRadius: 'var(--radius)',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                width: '100%',
              }}
            >
              {t('checker.checkButton', { defaultValue: 'Check' })}
            </button>

            {text.trim() && (
              <button
                onClick={handleClear}
                style={{
                  minHeight: 'var(--btn-height)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: 'var(--border)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 700,
                  borderRadius: 'var(--radius)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                {t('checker.clearButton', { defaultValue: 'Clear' })}
              </button>
            )}
          </div>

          <p
            style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              margin: '8px 0 0 0',
            }}
          >
            {t('checker.guaranteeDisclaimer', {
              defaultValue: 'This tool gives a warning, not a guarantee. New scams may not be detected.',
            })}
          </p>
        </div>
      )}
    </div>
  );
}
