import { 
  Nav, 
  Hero, 
  HowItWorks, 
  Templates, 
  Features, 
  Pricing, 
  FAQ, 
  FinalCTA, 
  Footer 
} from '@/components/landing';

export default function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <Templates />
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
