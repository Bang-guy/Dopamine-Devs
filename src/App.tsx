import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { getProfile } from './services/storage';

// Lazy-load pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AppShell = lazy(() => import('./pages/AppShell'));
const Home = lazy(() => import('./pages/Home'));
const Practise = lazy(() => import('./pages/Practise'));
const Check = lazy(() => import('./pages/Check'));
const Learn = lazy(() => import('./pages/Learn'));
const Help = lazy(() => import('./pages/Help'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const Profile = lazy(() => import('./pages/Profile'));
const Caregiver = lazy(() => import('./pages/Caregiver'));
const OnboardingFlow = lazy(() => import('./features/onboarding/OnboardingFlow'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ScenarioScreen = lazy(() => import('./features/simulator/ScenarioScreen'));

// Phase 6 Help sub-features
const Checklist1930 = lazy(() => import('./features/help/Checklist1930'));
const VerifyFlow = lazy(() => import('./features/help/VerifyFlow'));
const Helplines = lazy(() => import('./features/help/Helplines'));
const TutorialReplay = lazy(() => import('./features/help/TutorialReplay'));

// Phase 5 Learn sub-features
const KycModule = lazy(() => import('./features/learn/KycModule'));

// Phase 8 Extras
const FaqPage = lazy(() => import('./features/extras/FaqPage'));
const ScamOfTheWeek = lazy(() => import('./features/extras/ScamOfTheWeek'));
const PrintableCard = lazy(() => import('./features/extras/PrintableCard'));
const LegalPage = lazy(() => import('./features/extras/LegalPage'));

function RequireOnboarding({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  if (!profile?.onboardingComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  return <>{children}</>;
}

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100dvh' }}>
      <span>Loading...</span>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<LandingPage />} />

        {/* Onboarding */}
        <Route path="/onboarding/*" element={<OnboardingFlow />} />

        {/* App shell — requires completed onboarding */}
        <Route
          path="/app"
          element={
            <RequireOnboarding>
              <AppShell />
            </RequireOnboarding>
          }
        >
          <Route index element={<Navigate to="/app/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="practise" element={<Practise />} />
          <Route path="practise/scenario/:id" element={<ScenarioScreen />} />
          <Route path="check" element={<Check />} />
          <Route path="learn" element={<Learn />} />
          <Route path="learn/kyc" element={<KycModule />} />
          <Route path="help" element={<Help />} />
          <Route path="help/checklist" element={<Checklist1930 />} />
          <Route path="help/verify" element={<VerifyFlow />} />
          <Route path="help/helplines" element={<Helplines />} />
          <Route path="help/tutorial" element={<TutorialReplay />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="caregiver" element={<Caregiver />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="scams" element={<ScamOfTheWeek />} />
          <Route path="printable-card" element={<PrintableCard />} />
          <Route path="about" element={<LegalPage type="about" />} />
          <Route path="privacy" element={<LegalPage type="privacy" />} />
          <Route path="terms" element={<LegalPage type="terms" />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
