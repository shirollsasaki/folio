import type { ProfileData } from '@/types';

export function createMockProfile(overrides: Partial<ProfileData> = {}): ProfileData {
  return {
    name: 'Alex Rivera',
    headline: 'Senior Product Designer at Figma',
    bio: 'I design intuitive interfaces that help millions of people create together. Passionate about design systems and developer experience.',
    location: 'San Francisco, CA',
    avatar_url: 'https://pbs.twimg.com/profile_images/test/photo.jpg',
     linkedin_url: 'https://linkedin.com/in/alexrivera',
     twitter_url: 'https://x.com/alexrivera',
     instagram_url: 'https://instagram.com/alexrivera',
     github_url: 'https://github.com/alexrivera',
     youtube_url: 'https://youtube.com/@alexrivera',
     website_url: 'https://alexrivera.design',
    experience: [
      { title: 'Senior Product Designer', company: 'Figma', dates: '2021 – Present' },
      { title: 'Product Designer', company: 'Stripe', dates: '2019 – 2021' },
    ],
    skills: ['Product Design', 'Figma', 'Design Systems', 'Prototyping', 'User Research'],
    custom_links: [
      { label: 'Portfolio', url: 'https://alexrivera.design' },
      { label: 'Twitter', url: 'https://twitter.com/alexrivera' },
    ],
    ...overrides,
  };
}
