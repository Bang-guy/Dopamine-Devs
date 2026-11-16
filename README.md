# Digital Safety Companion 🛡️

> HackKumbh 2026 — Team Dopamine Devs

A Progressive Web App (PWA) designed to help Indian seniors (50+) stay safe from digital scams. Available in **English, Hindi, and Marathi**.

---

## 🚀 Quick Start

```bash
npm install
npm run dev        # start dev server
npm run build      # production build
npm run test       # run tests
npm run test:ui    # test UI dashboard
```

---

## 📁 Project Structure

```
src/
├── components/       # Shared UI components (PanicBar, ListenButton)
├── features/
│   └── onboarding/   # 7-step onboarding flow
├── i18n.ts           # i18next setup
├── locales/          # en.json, hi.json, mr.json
├── pages/            # Route-level page components
├── services/         # storage.ts, speech.ts
└── styles/           # tokens.css, global.css
public/
├── audio/            # MP3 audio fallback files (see audio/README.md)
├── icons/            # PWA icons (192, 512, maskable, apple-touch-icon)
├── manifest.webmanifest
└── og-image.svg      # ⚠️ Convert to og-image.png before launch
```

---

## ⚠️ Before Launch

- [ ] Convert `public/og-image.svg` → `public/og-image.png` (1200×630)
- [ ] Add PNG icons: `icons/icon-192.png`, `icons/icon-512.png`, `icons/icon-512-maskable.png`, `icons/apple-touch-icon.png`, `favicon.svg`
- [ ] Record / generate MP3 audio files (see `public/audio/README.md`)
- [ ] Set up Netlify deployment (the `public/_redirects` file handles SPA routing)

---

## 🌐 Languages

| Code | Language | Script       |
|------|----------|--------------|
| `en` | English  | Latin        |
| `hi` | Hindi    | Devanagari   |
| `mr` | Marathi  | Devanagari   |

---

## 🏗️ Build Phases

| Phase | Focus                          | Status     |
|-------|--------------------------------|------------|
| 1     | Scaffold, Onboarding, Design   | ✅ Done    |
| 2     | Message Check + Verdict Engine | 🔜 Next    |
| 3     | Practise Scenarios + Learn     | 🔜         |
| 4     | Caregiver linking + Profile    | 🔜         |
| 5     | PWA polish, offline, tests     | 🔜         |

---

## 🛡️ Safety Philosophy

- **Core Rule**: No bank, government, or company will ever ask for your OTP, PIN, or password.
- **Emergency**: Cyber Crime Helpline — **1930**
- **Report**: [cybercrime.gov.in](https://cybercrime.gov.in)

---

## 🔧 Tech Stack

- **React 18** + TypeScript
- **Vite 5** + vite-plugin-pwa
- **React Router 6** (SPA)
- **i18next** (multilingual)
- **IndexedDB** via `idb`
- **Vitest** + Testing Library

---

*Made with ❤️ by Team Dopamine Devs for HackKumbh 2026*
