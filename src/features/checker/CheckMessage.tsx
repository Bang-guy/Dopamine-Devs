import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Clipboard, Camera, Image as ImageIcon, Trash2, ArrowLeft } from 'lucide-react';
import { checkMessage, type CheckResult } from '../../services/rules';
import ResultCard from './ResultCard';

export default function CheckMessage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = (i18n.language?.slice(0, 2) || 'en') as 'en' | 'hi' | 'mr';

  const [text, setText] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [pasteNotice, setPasteNotice] = useState('');
  const [readingPhoto, setReadingPhoto] = useState(false);
  const [ocrError, setOcrError] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Clear memory on unmount (Privacy requirement)
  useEffect(() => {
    return () => {
      setText('');
      setResult(null);
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  const clearPhoto = () => {
    if (photoUrl) {
      URL.revokeObjectURL(photoUrl);
      setPhotoUrl(null);
    }
    setOcrError('');
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handlePaste = async () => {
    setPasteNotice('');
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const clipText = await navigator.clipboard.readText();
        if (clipText) {
          setText(clipText);
          return;
        }
      }
      throw new Error('Clipboard empty or unavailable');
    } catch {
      setPasteNotice(t('checker.pasteBlocked', 'Long press in the box and choose Paste.'));
      textareaRef.current?.focus();
    }
  };

  const handlePhotoFile = async (file: File | undefined) => {
    if (!file) return;
    clearPhoto();
    setOcrError('');
    setReadingPhoto(true);

    const objectUrl = URL.createObjectURL(file);
    setPhotoUrl(objectUrl);

    try {
      // Load Tesseract.js only when photo option is first used
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker('eng');
      const ret = await worker.recognize(file);
      await worker.terminate();

      const extracted = ret?.data?.text?.trim();
      if (extracted) {
        setText(extracted);
      } else {
        setOcrError(
          t(
            'checker.ocrFailed',
            'We could not read this clearly. Type the message, or try a clearer photo.'
          )
        );
      }
    } catch (err) {
      console.warn('OCR error:', err);
      setOcrError(
        t(
          'checker.ocrFailed',
          'We could not read this clearly. Type the message, or try a clearer photo.'
        )
      );
    } finally {
      setReadingPhoto(false);
    }
  };

  const handleCheck = () => {
    if (!text.trim()) return;
    setChecking(true);
    setTimeout(() => {
      const res = checkMessage(text, lang);
      setResult(res);
      setChecking(false);
    }, 450);
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    clearPhoto();
    setPasteNotice('');
  };

  const handleBack = () => {
    setText('');
    setResult(null);
    clearPhoto();
    navigate(-1);
  };

  return (
    <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Back button */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button
          type="button"
          onClick={handleBack}
          style={{
            background: 'transparent',
            color: 'var(--color-text)',
            minHeight: '56px',
            fontSize: '18px',
            fontWeight: 700,
            padding: '8px 0',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <ArrowLeft size={20} />
          {t('back')}
        </button>
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>
        {t('home.checkMessage')}
      </h1>

      {checking ? (
        <div
          style={{
            padding: '40px 20px',
            textAlign: 'center',
            fontSize: '20px',
            fontWeight: 600,
            background: 'var(--color-surface, #fff)',
            borderRadius: 'var(--radius-lg, 16px)',
            border: 'var(--border)',
          }}
        >
          {t('checker.checking', 'Checking, please wait...')}
        </div>
      ) : result ? (
        <ResultCard result={result} message={text} onClear={handleClear} />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* 1. Large Paste Button above the box */}
          <button
            type="button"
            onClick={handlePaste}
            style={{
              minHeight: '56px',
              background: 'var(--color-surface, #fff)',
              color: 'var(--color-primary, #1E3A8A)',
              border: '2px solid var(--color-primary, #1E3A8A)',
              borderRadius: 'var(--radius, 12px)',
              fontSize: '18px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              width: '100%',
            }}
          >
            <Clipboard size={22} />
            {t('checker.pasteButton', 'Paste')}
          </button>

          {/* Paste fallback warning */}
          {pasteNotice && (
            <div
              style={{
                fontSize: '18px',
                color: '#B45309',
                background: '#FEF3C7',
                padding: '12px 16px',
                borderRadius: 'var(--radius, 12px)',
                lineHeight: 1.4,
              }}
            >
              {pasteNotice}
            </div>
          )}

          {/* 2. Photo options: Choose photo and Take photo */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Hidden file inputs */}
            <input
              ref={galleryInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handlePhotoFile(e.target.files?.[0])}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: 'none' }}
              onChange={(e) => handlePhotoFile(e.target.files?.[0])}
            />

            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              style={{
                flex: 1,
                minHeight: '56px',
                background: 'var(--color-surface, #fff)',
                color: 'var(--color-text)',
                border: 'var(--border)',
                borderRadius: 'var(--radius, 12px)',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0 12px',
              }}
            >
              <ImageIcon size={20} />
              {t('checker.choosePhoto', 'Choose a photo')}
            </button>

            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              style={{
                flex: 1,
                minHeight: '56px',
                background: 'var(--color-surface, #fff)',
                color: 'var(--color-text)',
                border: 'var(--border)',
                borderRadius: 'var(--radius, 12px)',
                fontSize: '18px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0 12px',
              }}
            >
              <Camera size={20} />
              {t('checker.takePhoto', 'Take a photo')}
            </button>
          </div>

          {/* Reading photo state */}
          {readingPhoto && (
            <div
              style={{
                padding: '16px',
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--color-primary)',
                background: '#EFF6FF',
                borderRadius: 'var(--radius, 12px)',
              }}
            >
              {t('checker.readingPhoto', 'Reading the photo...')}
            </div>
          )}

          {/* Thumbnail preview with Remove photo button */}
          {photoUrl && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                background: 'var(--color-surface, #fff)',
                borderRadius: 'var(--radius, 12px)',
                border: 'var(--border)',
              }}
            >
              <img
                src={photoUrl}
                alt="Selected"
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <button
                type="button"
                onClick={clearPhoto}
                style={{
                  minHeight: '44px',
                  padding: '8px 16px',
                  background: 'transparent',
                  color: 'var(--color-danger, #DC2626)',
                  border: '1px solid var(--color-danger, #DC2626)',
                  borderRadius: 'var(--radius, 8px)',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Trash2 size={18} />
                {t('checker.removePhoto', 'Remove photo')}
              </button>
            </div>
          )}

          {/* OCR failed message */}
          {ocrError && (
            <div
              style={{
                fontSize: '18px',
                color: '#991B1B',
                background: '#FEF2F2',
                padding: '12px 16px',
                borderRadius: 'var(--radius, 12px)',
                lineHeight: 1.5,
              }}
            >
              {ocrError}
            </div>
          )}

          {/* Text input area */}
          <label htmlFor="message-input" style={{ fontSize: '18px', fontWeight: 600 }}>
            {t('checker.pasteLabel', 'Paste the message or link here')}
          </label>
          <textarea
            ref={textareaRef}
            id="message-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t(
              'checker.pastePlaceholder',
              'Paste SMS, WhatsApp message, or payment request link...'
            )}
            rows={6}
            style={{
              fontSize: '18px',
              padding: '16px',
              borderRadius: 'var(--radius, 12px)',
              border: 'var(--border)',
              background: 'var(--color-surface, #fff)',
              color: 'var(--color-text)',
              width: '100%',
              boxSizing: 'border-box',
              resize: 'vertical',
              lineHeight: 1.5,
            }}
          />

          {/* Check and Clear buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
            <button
              type="button"
              onClick={handleCheck}
              disabled={!text.trim()}
              style={{
                minHeight: '56px',
                background: text.trim() ? 'var(--color-primary, #1E3A8A)' : 'var(--color-border)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 700,
                borderRadius: 'var(--radius, 12px)',
                cursor: text.trim() ? 'pointer' : 'not-allowed',
                width: '100%',
                border: 'none',
              }}
            >
              {t('checker.checkButton', 'Check')}
            </button>

            {text.trim() && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  minHeight: '56px',
                  background: 'var(--color-surface, #fff)',
                  color: 'var(--color-text)',
                  border: 'var(--border)',
                  fontSize: '18px',
                  fontWeight: 700,
                  borderRadius: 'var(--radius, 12px)',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                {t('checker.clearButton', 'Clear')}
              </button>
            )}
          </div>

          <p
            style={{
              fontSize: '16px',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
              margin: '8px 0 0 0',
            }}
          >
            {t(
              'checker.guaranteeDisclaimer',
              'This tool gives a warning, not a guarantee. New scams may not be detected.'
            )}
          </p>
        </div>
      )}
    </div>
  );
}
