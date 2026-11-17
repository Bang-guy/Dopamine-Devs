import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ListenButton from '../../components/ListenButton';

const REPLAY_CARDS = [
  {
    titleKey: 'coreRule',
    bodyKey: 'help.tutorial.card1Body',
    defaultBody: 'No bank, government, or company will ever ask for your OTP, PIN, or password. If someone asks, it is a scam.',
  },
  {
    titleKey: 'home.checkMessage',
    bodyKey: 'help.tutorial.card2Body',
    defaultBody: 'If you get a suspicious message or call, use the Check a Message feature. We will tell you if it is safe.',
  },
  {
    titleKey: 'home.practise',
    bodyKey: 'help.tutorial.card3Body',
    defaultBody: 'Practice spotting scams in a safe environment. The more you practice, the more confident you will feel.',
  },
  {
    titleKey: 'panic.cta',
    bodyKey: 'help.tutorial.card4Body',
    defaultBody: 'If you think you have been scammed, tap the red bar at the bottom. It will guide you step by step.',
  },
];

export default function TutorialReplay() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const isLast = index === REPLAY_CARDS.length - 1;
  const current = REPLAY_CARDS[index];

  const handleNext = () => {
    if (isLast) {
      navigate('/app/help');
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    if (index === 0) {
      navigate('/app/help');
    } else {
      setIndex(index - 1);
    }
  };

  const title = t(current.titleKey);
  const body = t(current.bodyKey, { defaultValue: current.defaultBody });

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
          {t('help.hub.tutorialTitle', { defaultValue: 'Replay the tutorial' })}
        </h1>
        <span style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          {index + 1} / {REPLAY_CARDS.length}
        </span>
      </div>

      <div
        style={{
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius-lg)',
          padding: '32px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: '260px',
          justifyContent: 'center',
          boxSizing: 'border-box',
        }}
      >
        <h2 style={{ fontSize: 'var(--text-xl)', margin: 0, color: '#fff', lineHeight: 1.4 }}>
          {title}
        </h2>
        <p style={{ fontSize: 'var(--text-body)', color: '#E0E7FF', lineHeight: 1.6, margin: 0 }}>
          {body}
        </p>
        <ListenButton text={`${title}. ${body}`} />
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {REPLAY_CARDS.map((_, i) => (
          <div
            key={i}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: i === index ? 'var(--color-primary)' : 'var(--color-border)',
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
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
