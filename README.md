# Satark (Digital Safety Companion)

> Digital Literacy & Cyber Fraud Awareness Assistant for Senior Citizens  
> Developed by **Dopamine Devs** for **HackKumbh 2026** at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur, with IEEE Maharashtra and IEEE Computer Society.  
> Theme: *"Tech for Humanity: Innovating for Health, Education and Rural Empowerment"*

---

## Overview

Satark is a Progressive Web App (PWA) specifically built to empower senior citizens (60+) and digitally vulnerable communities across India to detect, avoid, and respond decisively to online financial scams, identity theft, and cyber fraud.

- **Multilingual Support**: Fully localized in English, Hindi (हिन्दी), and Marathi (मराठी) with native voice guidance (Text-to-Speech) on all instructions.
- **100% Client-Side & Privacy-First**: Zero server tracking, zero cloud logging, zero external analytics. Works seamlessly offline on any Android phone running Chrome.
- **Interactive Scam Simulator**: Practice identifying fake UPI cashback traps (with high-visibility alert flash), electricity disconnection SMS, and Practice Bank mock transactions.
- **Offline Rule-Based Message Checker**: Paste SMS or WhatsApp messages to detect fraud indicators using transparent, deterministic rules without passing data over the internet.
- **Emergency 1930 Helpline & Golden Hour Checklist**: Persistent panic bar, 5 critical account freeze steps, and direct 1930 dialing.

---

## Setup & Running Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### 1. Install dependencies
```bash
npm install
```

### 2. Run the development server
```bash
npm run dev -- --host
```
Open [http://localhost:5173](http://localhost:5173) in your browser or visit the displayed local network IP from your Android phone.

### 3. Run test suite
```bash
npm test
```
Runs 30 Vitest unit and integration tests covering deterministic rules, caregiver consent logic, helpline integrity, and trilingual locale parity.

### 4. Build for production
```bash
npm run build
```
Generates an optimized, PWA-enabled production bundle in `dist/` with service worker precaching.

### 5. Preview production build
```bash
npm run preview
```

---

## Project Structure

```text
├── src/
│   ├── components/         # Reusable senior-friendly UI (ListenButton, PanicBar, ProgressBar)
│   ├── data/               # Static offline data (rules, scenarios, lessons, helplines, faqs)
│   ├── features/
│   │   ├── caregiver/      # Caregiver consent, permissions, demo senior/family toggle
│   │   ├── checker/        # Message risk analyzer and transparent result cards
│   │   ├── extras/         # 10 FAQs, Scam of the Week, Printable safety card, Legal pages
│   │   ├── help/           # Help Hub, 1930 checklist, Verify flow, Helpline directory
│   │   ├── learn/          # KYC scam module with interactive quiz
│   │   ├── onboarding/     # 7-step onboarding flow
│   │   └── simulator/      # Safe Browsing hub, Scenario A/B screens, Practice Bank
│   ├── locales/            # en.json, hi.json, mr.json
│   ├── pages/              # Main route entries (Home, Practise, Check, Learn, Help, etc.)
│   ├── services/           # Offline storage (storage.ts), TTS (speech.ts), Rules (rules.ts)
│   └── styles/             # Accessible design tokens and high-contrast typography
├── tests/                  # Vitest test suite
└── docs/                   # Architectural notes, privacy model, and test plans
```
