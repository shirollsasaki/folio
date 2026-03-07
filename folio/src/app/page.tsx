import { Nav, Hero, HowItWorks, Templates, Pricing, FinalCTA, Footer, Dock } from '@/components/landing';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--bg)', color: 'var(--cream)', minHeight: '100vh', paddingBottom: '6rem' }}>
      <Nav />
      <Hero />
      <HowItWorks />
      <Templates />
      <Pricing />
      <FinalCTA />
      <Footer />
      <Dock />
    </main>
  );
}
