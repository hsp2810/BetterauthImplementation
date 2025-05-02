import CommunitySection from "@/modules/landing/ui/community-section";
import FeaturesSection from "@/modules/landing/ui/features-section";
import Footer from "@/modules/landing/ui/footer";
import HeroSection from "@/modules/landing/ui/hero";
import Navbar from "@/modules/landing/ui/navbar";

export default function LandingPage() {
  return (
    <main className='min-h-screen'>
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
