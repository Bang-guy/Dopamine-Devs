# Architecture & System Design

## 1. Architectural Philosophy
Satark is architected as an offline-first, client-side Progressive Web Application (PWA). Given the vulnerability of the target audience (senior citizens in rural and semi-urban India who may have inconsistent network connectivity or heightened privacy concerns), the system adheres to three non-negotiable principles:
1. **Zero External Dependencies at Runtime**: All fraud pattern detection, localization dictionaries, scenario simulations, and educational content are bundled with the PWA.
2. **Deterministic Security Evaluations**: The message checker does not rely on nondeterministic LLMs or cloud endpoints that could introduce latency, hallucinations, or privacy leaks.
3. **Inclusive Sensory Design**: Multi-modal feedback (large text &ge; 18px, high contrast color coding, audio narration, and visual warning flashes) ensures accessibility for low-vision or digitally hesitant seniors.

---

## 2. Component Architecture

```mermaid
graph TD
    App[App.tsx] --> AppShell[AppShell Layout]
    AppShell --> PanicBar[Fixed Bottom Panic Bar - 1930]
    AppShell --> Nav[Bottom Navigation]
    AppShell --> Outlet[Router Outlet]
    
    Outlet --> Home[Home: Greeting, Core Rule, Progress, Stacked Tiles]
    Outlet --> Practise[Practise: Safe Browsing & Practice Bank]
    Outlet --> Check[Checker: Offline Rules Engine & Result Cards]
    Outlet --> Learn[Learn: KYC Module & Interactive Quizzes]
    Outlet --> Help[Help: 1930 Checklist, Verify Flow, Directory]
    Outlet --> Caregiver[Caregiver: Consent & Permission Hub]
    Outlet --> Settings[Settings: 17 Items & Reset]
    
    Check --> RulesService[rules.ts: Deterministic Regex & Pattern Matcher]
    Practise --> StorageService[storage.ts: LocalStorage & IDB]
    Help --> StorageService
    Caregiver --> StorageService
```

---

## 3. Data Storage & Schema
State persistence is implemented in `src/services/storage.ts`:
- **`dsc_profile`**: Stores user name, age category, phone number, and onboarding status.
- **`dsc_progress`**: Tracks `lessonsCompleted`, `scenariosCompleted`, and `checklistTicks` array.
- **`dsc_settings`**: Stores language (`en`, `hi`, `mr`), theme (`light`, `dark`), text size, and alert toggles.
- **`dsc_caregiver`**: Stores caregiver name, relationship, contact, approval flag, and permission toggles.
- **`dsc_bank_care_number`**: Stores the user's custom bank customer care number locally on their device.
- **`clearAllData()`**: Flushes all `dsc_*` keys and closes/deletes IndexedDB stores upon account deletion.
