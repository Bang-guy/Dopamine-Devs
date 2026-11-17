# Privacy & Security Model

## 1. Zero-Cloud Telemetry Guarantee
Satark does not integrate Google Analytics, Mixpanel, Sentry, Facebook Pixel, or any third-party telemetry libraries. No external network requests are dispatched during normal user interaction, except when the user explicitly clicks the official government link to `https://cybercrime.gov.in`.

## 2. In-Memory Analysis of Sensitive Data
When a senior pastes a suspicious SMS or WhatsApp message into the Message Checker:
- The text is held exclusively in React component memory state (`useState`).
- As soon as the user clears the input, presses the Back button, or navigates away, the text is garbage collected.
- Pasted text is **never** written to `localStorage`, `IndexedDB`, session cookies, URL query parameters, or console logs.

## 3. Caregiver Privacy Boundary
The Caregiver feature operates on strict bilateral consent:
- **No Private Data Visibility**: The family view only reflects aggregate milestone progress (e.g. "1 lesson completed", "2 scenarios completed").
- **Strictly Redacted**: Caregivers are never granted access to pasted message text, checker verdicts, practice transactions, OTPs, PINs, or device accounts.
- **Immediate Revocation**: Seniors can revoke caregiver access instantly from their settings or the caregiver tab with one tap.

## 4. Local Encryption & Storage Limits
All sensitive contact numbers (such as the user's custom bank care number) are retained purely inside the client device's browser sandbox and wiped completely when selecting "Delete Account" in Settings.
