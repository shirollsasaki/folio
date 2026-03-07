import { Nav, Hero, HowItWorks, Templates, Pricing, FinalCTA, Footer } from '@/components/landing';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--bg)', color: 'var(--cream)', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <Templates />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}
