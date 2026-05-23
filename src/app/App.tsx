import { lazy, Suspense } from 'react';
import { FloatingNav } from './components/FloatingNav';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { Toaster } from './components/ui/sonner';

// Lazy load below-the-fold sections for better initial load performance
const UserJourneySection = lazy(() => import('./components/UserJourneySection').then(m => ({ default: m.UserJourneySection })));
const AIEngineSection = lazy(() => import('./components/AIEngineSection').then(m => ({ default: m.AIEngineSection })));
const UnderTheHoodSection = lazy(() => import('./components/UnderTheHoodSection').then(m => ({ default: m.UnderTheHoodSection })));
const WaveFeatureSection = lazy(() => import('./components/WaveFeatureSection').then(m => ({ default: m.WaveFeatureSection })));
const ProximityRadarSection = lazy(() => import('./components/ProximityRadarSection').then(m => ({ default: m.ProximityRadarSection })));
const ReflectionsSection = lazy(() => import('./components/ReflectionsSection').then(m => ({ default: m.ReflectionsSection })));
const SidekickSection = lazy(() => import('./components/SidekickSection').then(m => ({ default: m.SidekickSection })));
const ProximityChatSection = lazy(() => import('./components/ProximityChatSection').then(m => ({ default: m.ProximityChatSection })));
const AIChatSection = lazy(() => import('./components/AIChatSection').then(m => ({ default: m.AIChatSection })));
const EventsSection = lazy(() => import('./components/EventsSection').then(m => ({ default: m.EventsSection })));
const GlobalJourneySection = lazy(() => import('./components/GlobalJourneySection').then(m => ({ default: m.GlobalJourneySection })));
const MetamorphosisSection = lazy(() => import('./components/MetamorphosisSection').then(m => ({ default: m.MetamorphosisSection })));
const ZonesSection = lazy(() => import('./components/ZonesSection').then(m => ({ default: m.ZonesSection })));
const ProfileSection = lazy(() => import('./components/ProfileSection').then(m => ({ default: m.ProfileSection })));
const SafetySection = lazy(() => import('./components/SafetySection').then(m => ({ default: m.SafetySection })));
const ComparisonSection = lazy(() => import('./components/ComparisonSection').then(m => ({ default: m.ComparisonSection })));
const MarketFitSection = lazy(() => import('./components/MarketFitSection').then(m => ({ default: m.MarketFitSection })));
const MarketSizeSection = lazy(() => import('./components/MarketSizeSection').then(m => ({ default: m.MarketSizeSection })));
const MonetizationSection = lazy(() => import('./components/MonetizationSection').then(m => ({ default: m.MonetizationSection })));
const GoToMarketSection = lazy(() => import('./components/GoToMarketSection').then(m => ({ default: m.GoToMarketSection })));
const ProgressSection = lazy(() => import('./components/ProgressSection').then(m => ({ default: m.ProgressSection })));
const TeamSection = lazy(() => import('./components/TeamSection').then(m => ({ default: m.TeamSection })));
const FounderSection = lazy(() => import('./components/FounderSection').then(m => ({ default: m.FounderSection })));
const SilentOpportunityCost = lazy(() => import('./components/SilentOpportunityCost').then(m => ({ default: m.SilentOpportunityCost })));
const TheAskSection = lazy(() => import('./components/TheAskSection').then(m => ({ default: m.TheAskSection })));
const VisionSection = lazy(() => import('./components/VisionSection').then(m => ({ default: m.VisionSection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Floating Navigation */}
      <FloatingNav />

      {/* Above-the-fold sections - load immediately */}
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      
      {/* Below-the-fold sections - lazy load with split Suspense boundaries for better error handling */}
      <Suspense fallback={<SectionLoader />}>
        <UserJourneySection />
        <AIEngineSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <WaveFeatureSection />
        <ProximityRadarSection />
        <ReflectionsSection />
        <SidekickSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProximityChatSection />
        <AIChatSection />
        <EventsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <GlobalJourneySection />
        <MetamorphosisSection />
        <UnderTheHoodSection />
        <ZonesSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ProfileSection />
        <SafetySection />
        <ComparisonSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <MarketFitSection />
        <MarketSizeSection />
        <MonetizationSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <GoToMarketSection />
        <ProgressSection />
        <TeamSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <FounderSection />
        <SilentOpportunityCost />
        <TheAskSection />
        <VisionSection />
        <Footer />
      </Suspense>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}