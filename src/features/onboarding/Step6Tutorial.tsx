import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
}

const TUTORIAL_CARDS = [
  {
    emoji: '🛡️',
    titleKey: 'coreRule',
    body: 'No bank, government, or company will ever ask for your OTP, PIN, or password. If someone asks — it is a scam.',
  },
  {
    emoji: '🔍',
    titleKey: 'home.checkMessage',
    body: 'If you get a suspicious message or call, use the "Check a Message" feature. We will tell you if it is safe.',
  },
  {
    emoji: '🎯',
    titleKey: 'home.practise',
    body: 'Practice spotting scams in a safe environment. The more you practice, the more confident you will feel.',
  },
  {
    emoji: '🆘',
    titleKey: 'panic.cta',
    body: 'If you think you have been scammed, tap the red bar at the top — it will guide you step by step.',
  },
];

export default function Step6Tutorial({ onNext, onBack, onSkip }: Props) {
  const { t } = useTranslation();
  const [card, setCard] = useState(0);

  const isLast = card === TUTORIAL_CARDS.length - 1;
  const current = TUTORIAL_CARDS[card];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingTop: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={card === 0 ? onBack : () => setCard(card - 1)} style={{ background: 'transparent', color: 'var(--color-text)', padding: '8px 0', minHeight: '44px', fontSize: 'var(--text-lg)', fontWeight: 700 }}>
          ← {t('back')}
        </button>
        <button onClick={onSkip} style={{ background: 'transparent', color: 'var(--color-text-muted)', padding: '8px', minHeight: '44px', fontSize: 'var(--text-body)' }}>
          {t('onboarding.skipTutorial')}
        </button>
      </div>

      <div style={{ background: 'var(--color-primary)', borderRadius: 'var(--radius-lg, 16px)', padding: '32px 24px', textAlign: 'center', color: '#fff', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '280px', justifyContent: 'center' }}>
        <span style={{ fontSize: '56px' }}>{current.emoji}</span>
        <h2 style={{ color: '#fff', fontSize: 'var(--text-xl)' }}>{t(current.titleKey)}</h2>
        <p style={{ color: '#B3C6F5', fontSize: 'var(--text-body)', lineHeight: 1.6 }}>{current.body}</p>
      </div>

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        {TUTORIAL_CARDS.map((_, i) => (
          <div key={i} style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === card ? 'var(--color-primary)' : 'var(--color-border)' }} />
        ))}
      </div>

      <button
        onClick={isLast ? onNext : () => setCard(card + 1)}
        style={{ background: 'var(--color-primary)', color: '#fff', minHeight: 'var(--btn-height)', fontSize: 'var(--text-lg)', fontWeight: 700 }}
      >
        {isLast ? 'Get Started →' : 'Next →'}
      </button>
    </div>
  );
}
