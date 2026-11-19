import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import lessonsData from '../../data/lessons.json';
import { getProgress, saveProgress } from '../../services/storage';
import ListenButton from '../../components/ListenButton';

export default function KycModule() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language || 'en') as 'en' | 'hi' | 'mr';

  const kyc = lessonsData.modules[0];
  const [stage, setStage] = useState<'content' | 'quiz' | 'completed'>('content');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const title = (kyc.title as any)[lang] || kyc.title.en;
  const scamMsg = (kyc as any).scamMessage?.[lang] || (kyc as any).scamMessage?.en || '';
  const safeAct = (kyc as any).safeAction?.[lang] || (kyc as any).safeAction?.en || '';

  const handleOptionSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);
    setShowExplanation(true);
    if (kyc.quiz![currentQuizIdx].options[idx].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    if (currentQuizIdx + 1 < kyc.quiz!.length) {
      setCurrentQuizIdx(currentQuizIdx + 1);
    } else {
      // Finished all quizzes, save progress
      const p = getProgress();
      if ((p.lessonsCompleted || 0) < 1) {
        saveProgress({
          ...p,
          lessonsCompleted: 1,
        });
      }
      setStage('completed');
    }
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <button
          onClick={() => navigate('/app/learn')}
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
        {title}
      </h1>

      {stage === 'content' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Module 1 Video */}
          <div
            style={{
              background: '#0F172A',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <video
              controls
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                maxHeight: '420px',
                display: 'block',
                borderRadius: '16px',
                backgroundColor: '#000',
              }}
              src={`${import.meta.env.BASE_URL}videos/kyc-module.mp4`}
            >
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Chat bubble showing the scam message */}
          <div
            style={{
              background: '#E2E8F0',
              color: '#0F172A',
              padding: '20px',
              borderRadius: '16px 16px 16px 4px',
              fontSize: 'var(--text-body)',
              lineHeight: 1.5,
              maxWidth: '92%',
              border: '1px solid #CBD5E1',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '14px', color: '#475569' }}>
              SMS from unknown sender:
            </div>
            {scamMsg}
            <div style={{ marginTop: '12px' }}>
              <ListenButton text={scamMsg} />
            </div>
          </div>

          {/* Red flags */}
          <div
            style={{
              background: 'var(--color-surface)',
              border: 'var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, margin: 0, color: 'var(--color-danger)' }}>
              Warning Signs
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {kyc.redFlags!.map((flag, i) => {
                const text = (flag as any)[lang] || flag.en;
                return (
                  <div
                    key={i}
                    style={{
                      padding: '12px',
                      background: '#FEF2F2',
                      borderLeft: '4px solid var(--color-danger)',
                      borderRadius: '4px',
                      fontSize: 'var(--text-body)',
                      lineHeight: 1.4,
                    }}
                  >
                    {text}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Safe action */}
          <div
            style={{
              background: '#F0FDF4',
              border: '2px solid var(--color-safe)',
              borderRadius: 'var(--radius)',
              padding: '16px',
              color: '#14532D',
              fontSize: 'var(--text-body)',
              lineHeight: 1.5,
            }}
          >
            {safeAct}
            <div style={{ marginTop: '10px' }}>
              <ListenButton text={safeAct} />
            </div>
          </div>

          <button
            onClick={() => setStage('quiz')}
            style={{
              minHeight: 'var(--btn-height)',
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              width: '100%',
              marginTop: '8px',
            }}
          >
            Test Your Knowledge
          </button>
        </div>
      )}

      {stage === 'quiz' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-muted)' }}>
            Question {currentQuizIdx + 1} of {kyc.quiz!.length}
          </div>

          <div
            style={{
              background: 'var(--color-surface)',
              border: 'var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            <h2 style={{ fontSize: 'var(--text-xl)', margin: 0, lineHeight: 1.4 }}>
              {(kyc.quiz![currentQuizIdx].question as any)[lang] || kyc.quiz![currentQuizIdx].question.en}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {kyc.quiz![currentQuizIdx].options.map((opt, optIdx) => {
                const optText = (opt.text as any)[lang] || opt.text.en;
                let optBg = 'var(--color-surface)';
                let optBorder = 'var(--border)';

                if (selectedOption !== null) {
                  if (opt.correct) {
                    optBg = '#F0FDF4';
                    optBorder = '2px solid var(--color-safe)';
                  } else if (selectedOption === optIdx) {
                    optBg = '#FEF2F2';
                    optBorder = '2px solid var(--color-danger)';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={selectedOption !== null}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius)',
                      background: optBg,
                      border: optBorder,
                      fontSize: 'var(--text-body)',
                      fontWeight: 600,
                      textAlign: 'left',
                      cursor: selectedOption !== null ? 'default' : 'pointer',
                      lineHeight: 1.4,
                      minHeight: 'var(--btn-height)',
                    }}
                  >
                    {optText}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div
                style={{
                  padding: '14px',
                  background: '#F8FAFC',
                  borderRadius: 'var(--radius)',
                  border: '1px solid #CBD5E1',
                  fontSize: 'var(--text-body)',
                  lineHeight: 1.5,
                }}
              >
                <strong>Explanation: </strong>
                {(kyc.quiz![currentQuizIdx].explanation as any)[lang] ||
                  kyc.quiz![currentQuizIdx].explanation.en}
                <div style={{ marginTop: '8px' }}>
                  <ListenButton
                    text={
                      (kyc.quiz![currentQuizIdx].explanation as any)[lang] ||
                      kyc.quiz![currentQuizIdx].explanation.en
                    }
                  />
                </div>
              </div>
            )}
          </div>

          {showExplanation && (
            <button
              onClick={handleNextQuiz}
              style={{
                minHeight: 'var(--btn-height)',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: 'var(--radius)',
                fontSize: 'var(--text-lg)',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {currentQuizIdx + 1 < kyc.quiz!.length ? t('next') : t('finish')}
            </button>
          )}
        </div>
      )}

      {stage === 'completed' && (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '2px solid var(--color-safe)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <h2 style={{ fontSize: 'var(--text-2xl)', color: 'var(--color-safe)', margin: 0 }}>
            Module Completed
          </h2>
          <p style={{ fontSize: 'var(--text-body)', lineHeight: 1.5, margin: 0 }}>
            You scored {quizScore} out of {kyc.quiz!.length}. Your learning progress has been saved.
          </p>
          <button
            onClick={() => navigate('/app/learn')}
            style={{
              minHeight: 'var(--btn-height)',
              background: 'var(--color-primary)',
              color: '#fff',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              marginTop: '12px',
            }}
          >
            Back to Learning Modules
          </button>
        </div>
      )}
    </div>
  );
}
