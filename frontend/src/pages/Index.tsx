import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import LiveDemo from "@/components/LiveDemo";
import AnalyticsSection from "@/components/AnalyticsSection";
import APIPanel from "@/components/APIPanel";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <FeatureCards />
    <LiveDemo />
    <AnalyticsSection />
    <APIPanel />
    <Footer />
  </div>
);

export default Index;
