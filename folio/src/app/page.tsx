import { 
  Nav, 
  Hero,
  HowItWorks, 
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
      <Features />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
