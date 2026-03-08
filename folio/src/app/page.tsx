import { CustomCursor, NoiseOverlay, BlurLayer, ParticleBackground } from '@/components/lumo';
import { Hero, HowItWorks, Templates, Features, Pricing, FinalCTA, Footer } from '@/components/landing';

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <BlurLayer />
      <ParticleBackground />
      
      <div className="relative min-h-screen">
        <Hero />
        <HowItWorks />
        <Templates />
        <Features />
        <Pricing />
        <FinalCTA />
        <Footer />
      </div>
    </>
  );
}
