# Testing Plan & Quality Assurance

## 1. Test Suite Coverage (Vitest + Testing Library)
Satark includes 30 automated tests executed via `npm test`:

### 1.1 Rules Engine (`tests/rules.test.ts` - 13 tests)
- **R1 Rule**: Detection of OTP, PIN, CVV, MPIN, password requests.
- **R2 Rule**: Co-occurrence of account blocking/threat terms with urgent timing words.
- **R3 Rule**: Detection of URL shorteners (bit.ly, tinyurl) and unusual spoofed domains.
- **R4 Rule**: Detection of APK downloads and screen-sharing tools (AnyDesk, TeamViewer).
- **Y1–Y4 Rules**: Urgency indicators, unrequested cashback/lottery claims, unknown links, and raw 10-digit telephone numbers.
- **Determinism**: Verification that repeated executions with identical inputs return identical results.
- **Edge cases**: Empty strings, benign banking confirmations, and localized reason retrieval.

### 1.2 Caregiver Consent (`tests/caregiver.test.ts` - 3 tests)
- Verification that no caregiver data is exposed prior to consent.
- Verification that permission flags (`lessonProgress`, `redAlerts`) persist properly upon approval.
- Verification that revoking caregiver access purges the record immediately.

### 1.3 Help & Helpline Integrity (`tests/help.test.ts` - 4 tests)
- Verification of 1930 checklist persistence in `localStorage`.
- Verification of the checklist reset routine.
- Verification that 1930 is the first entry under "Money lost or fraud happening".
- Verification that all helpline entries possess valid dialing, URL, or placeholder definitions.
- Verification of custom bank number storage.

### 1.4 Simulator Scenarios (`tests/simulator.test.ts` - 3 tests)
- Scenario A: Verification of wrong choice (Enter PIN) red flag feedback and right choice confirmation.
- Scenario B: Verification that links remain unclickable text.
- Locale validation across simulator scenarios.

### 1.5 Localization Parity (`tests/locales.test.ts` - 3 tests)
- Verification that every key in `src/locales/en.json` is present and non-empty in `src/locales/hi.json` and `src/locales/mr.json`.

---

## 2. Manual Android Chrome Device Checklist
Before hackathon presentation, verify:
- [ ] PWA installation banner triggers in Android Chrome.
- [ ] Voice narration (`ListenButton`) speaks with `hi-IN` and `mr-IN` accents using device TTS.
- [ ] Red screen flash triggers on Scenario A wrong choice with audible voice warning.
- [ ] Fixed 1930 red panic bar remains pinned at the bottom on all screens.
- [ ] Printable safety card opens browser print dialog formatted for A4.
