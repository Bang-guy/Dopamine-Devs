const LANG_TO_VOICE_MAP: Record<string, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
};

/**
 * Speaks the given text using the browser's SpeechSynthesis API.
 * Falls back to a public audio file if TTS is unavailable.
 * Calling while speaking cancels speech (toggle behaviour).
 */
export function speak(text: string, lang: 'en' | 'hi' | 'mr' = 'en'): void {
  if (!window.speechSynthesis) {
    playAudioFallback(text, lang);
    return;
  }

  // Second tap = stop
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG_TO_VOICE_MAP[lang] ?? 'en-IN';
  utterance.rate = 0.9;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;

  // Try to pick a matching voice
  const voices = window.speechSynthesis.getVoices();
  const targetLang = LANG_TO_VOICE_MAP[lang] ?? 'en-IN';
  const match =
    voices.find((v) => v.lang === targetLang) ??
    voices.find((v) => v.lang.startsWith(lang));
  if (match) utterance.voice = match;

  utterance.onerror = () => {
    playAudioFallback(text, lang);
  };

  window.speechSynthesis.speak(utterance);
}

function playAudioFallback(_text: string, _lang: string): void {
  // Audio fallback: future implementation using /public/audio/ files
  // Audio files will be added in a later phase
  console.warn('SpeechSynthesis unavailable and audio fallback not yet implemented.');
}

export function stopSpeech(): void {
  if (window.speechSynthesis?.speaking) {
    window.speechSynthesis.cancel();
  }
}
