import type { ProfileData } from '@/types';

export function createMockProfile(overrides: Partial<ProfileData> = {}): ProfileData {
  return {
    name: 'Naman Shiroha',
    headline: 'Building Folio — Personal Websites from LinkedIn in Minutes',
    bio: 'Founder and builder. I turn ideas into products people love. Currently building Folio, a tool that converts LinkedIn profiles into stunning personal websites instantly. Obsessed with great UX, fast shipping, and making the web more personal.',
    location: 'India',
    avatar_url: '',
    linkedin_url: 'https://www.linkedin.com/in/naman-shiroha/',
    twitter_url: 'https://x.com/namanshiroha',
    instagram_url: '',
    github_url: 'https://github.com/namanshiroha',
    youtube_url: '',
    website_url: 'https://afterapp.fun',
    experience: [
      { title: 'Founder', company: 'Folio / AfterApp', dates: '2024 – Present' },
      { title: 'Product Engineer', company: 'Early-Stage Startup', dates: '2022 – 2024' },
    ],
    skills: ['Next.js', 'TypeScript', 'React', 'Supabase', 'AI / LLMs', 'Product Design', 'Growth', 'Founding'],
    custom_links: [
      { label: 'Folio', url: 'https://afterapp.fun/folio' },
    ],
    projects: [
      {
        name: 'Folio',
        description: 'Turn your LinkedIn profile into a stunning personal website in minutes. Pick a template, go live instantly.',
        url: 'https://afterapp.fun/folio',
        tags: ['Next.js', 'AI', 'SaaS'],
      },
      {
        name: 'AfterApp',
        description: 'Suite of indie productivity tools for founders and creators — built in public.',
        url: 'https://afterapp.fun',
        tags: ['TypeScript', 'Supabase', 'React'],
      },
    ],
    education: [
      {
        degree: 'B.Tech Computer Science',
        school: 'Engineering University',
        dates: '2018 – 2022',
      },
    ],
    ...overrides,
  };
}
