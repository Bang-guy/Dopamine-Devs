# Changelog

All notable changes to the Satark prototype are documented in this file.

## [0.1.0] - 2026-11-18 (HackKumbh 2026 Prototype Release)

### Added
- **Core Architecture & PWA**: Vite, React, TypeScript, and `vite-plugin-pwa` precaching with full mobile Android Chrome support.
- **Trilingual Localization**: Complete string coverage across English, Hindi (हिन्दी), and Marathi (मराठी) with automated parity verification.
- **Senior Accessibility**: Large 56px tap targets, high contrast tokens, Atkinson Hyperlegible and Noto Sans Devanagari typography, and voice narration (`ListenButton`).
- **Scam Simulator (Phase 3)**:
  - Scenario A: Fake UPI cashback request with red screen flash alert and spoken warning.
  - Scenario B: Electricity bill cutoff SMS warning against unknown links.
  - Practice Bank: Fictional bank interface with mock balance, transaction history, review screen, and Helpdesk refund return trap.
- **Message Checker (Phase 4)**:
  - Deterministic offline rules engine scanning for OTP/PIN demands (R1), threats + urgency (R2), spoofed/shortened domains (R3), and APKs/screen-sharing (R4).
  - Clear result cards with Red, Yellow, and Green risk ratings and plain-language reasons.
- **Help Hub & 1930 Helpline (Phase 6)**:
  - 1930 Emergency checklist with persisted ticks and in-app bank account freeze guide.
  - 5-step Verify-before-act guided tutorial.
  - Categorized helpline directory with direct calling and custom bank customer care number storage.
- **Learning Modules (Phase 5)**:
  - Interactive KYC scam lesson with real-time scam message breakdown, red flag callouts, and 2-question knowledge quiz.
- **Caregiver Consent (Phase 7)**:
  - Bilateral caregiver linking flow with 4-digit demo invite codes and granular permission toggles (lesson progress vs. scam alerts).
  - Demo senior vs. family view switcher.
- **Settings, Profile & Extras (Phase 8)**:
  - 17 structured settings options including complete data deletion (`clearAllData`).
  - 10 comprehensive FAQs with contextual in-app deep links.
  - 5 Scam of the Week cards sourced from RBI, I4C, NPCI, and TRAI advisories.
  - A4 Printable Emergency Safety Card.
- **Landing Page & Technical Documentation (Phase 9)**:
  - Accessible landing page with above-the-fold CTA, 5 landing FAQs, and sticky mobile launch bar.
  - Architecture, Privacy Model, and Test Plan documentation.
