# Audio Files Required

This directory needs the following MP3 audio files for TTS fallback.
The app will use `window.speechSynthesis` by default; these files serve as fallback for browsers that don't support it.

## Required Files

### Navigation & General
- `nav-home.mp3` — "Home" (spoken in English/Hindi/Marathi variants: home-en, home-hi, home-mr)
- `nav-practise.mp3` — "Practise"
- `nav-check.mp3` — "Check a Message"
- `nav-learn.mp3` — "Learn"
- `nav-help.mp3` — "Help"
- `nav-settings.mp3` — "Settings"
- `nav-profile.mp3` — "Profile"

### Panic Bar
- `panic-scammed.mp3` — "Got scammed? Call 1930"
- `helpline-1930.mp3` — "Calling Cyber Crime Helpline 1930"

### Onboarding
- `onboarding-welcome-en.mp3` — Welcome message in English
- `onboarding-welcome-hi.mp3` — Welcome message in Hindi
- `onboarding-welcome-mr.mp3` — Welcome message in Marathi
- `onboarding-choose-language.mp3` — "Please choose your language"
- `onboarding-enter-name.mp3` — "Please enter your name"
- `onboarding-enter-phone.mp3` — "Please enter your phone number"
- `onboarding-demo-code.mp3` — "Enter any 4-digit demo code"

### Verdicts
- `verdict-safe.mp3` — "This message looks safe" (green)
- `verdict-caution.mp3` — "Be careful with this message" (yellow)
- `verdict-danger.mp3` — "This message looks like a scam!" (red)

### Help Checklist
- `help-step1.mp3` — Step 1 instruction
- `help-step2.mp3` — Step 2 instruction
- `help-step3.mp3` — Step 3 instruction
- `help-step4.mp3` — Step 4 instruction
- `help-step5.mp3` — Step 5 instruction

## Naming Convention

Use the pattern: `{feature}-{key}-{lang}.mp3`
Examples: `verdict-safe-en.mp3`, `verdict-safe-hi.mp3`, `verdict-safe-mr.mp3`

## Tools for Generation

Recommended free TTS tools:
- Google Text-to-Speech API (requires API key)
- Microsoft Azure TTS (free tier available)
- murf.ai (Hindi/Marathi support)
- ElevenLabs (English)

## Notes

- Target bitrate: 64kbps mono MP3
- Target sample rate: 22050 Hz
- Keep each file under 30 seconds
- Use a warm, calm, senior-friendly voice
