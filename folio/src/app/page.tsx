import { 
  Nav, 
  Hero,
  Stats,
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
      <Stats />
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
