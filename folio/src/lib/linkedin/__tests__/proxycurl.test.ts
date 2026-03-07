import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProxycurlExtractor } from '../proxycurl';

const mockFetch = vi.fn();
global.fetch = mockFetch;

const mockProxycurlResponse = {
  full_name: 'Alex Rivera',
  headline: 'Senior Product Designer at Figma',
  summary: 'I design intuitive interfaces.',
  city: 'San Francisco',
  country_full_name: 'United States',
  profile_pic_url: 'https://example.com/photo.jpg',
  public_identifier: 'alexrivera',
  experiences: [
    {
      title: 'Senior Product Designer',
      company: 'Figma',
      starts_at: { year: 2021, month: 1 },
      ends_at: null,
    },
  ],
  skills: ['Product Design', 'Figma', 'Design Systems'],
};

describe('ProxycurlExtractor', () => {
  let extractor: ProxycurlExtractor;

  beforeEach(() => {
    extractor = new ProxycurlExtractor('test-api-key');
    mockFetch.mockReset();
  });

  it('extracts profile data from a valid LinkedIn URL', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockProxycurlResponse,
    });

    const profile = await extractor.extract('https://linkedin.com/in/alexrivera');

    expect(profile.name).toBe('Alex Rivera');
    expect(profile.headline).toBe('Senior Product Designer at Figma');
    expect(profile.bio).toBe('I design intuitive interfaces.');
    expect(profile.location).toBe('San Francisco, United States');
    expect(profile.experience).toHaveLength(1);
    expect(profile.experience[0].title).toBe('Senior Product Designer');
    expect(profile.skills).toEqual(['Product Design', 'Figma', 'Design Systems']);
  });

  it('throws for invalid LinkedIn URL format', async () => {
    await expect(
      extractor.extract('https://twitter.com/alexrivera')
    ).rejects.toThrow('Invalid LinkedIn profile URL');
  });

  it('throws a user-friendly error on 404', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    await expect(
      extractor.extract('https://linkedin.com/in/nonexistent')
    ).rejects.toThrow('LinkedIn profile not found');
  });

  it('throws on rate limit (429)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      statusText: 'Too Many Requests',
    });

    await expect(
      extractor.extract('https://linkedin.com/in/alexrivera')
    ).rejects.toThrow('Rate limit exceeded');
  });

  it('formats experience dates correctly', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        ...mockProxycurlResponse,
        experiences: [
          {
            title: 'Designer',
            company: 'Stripe',
            starts_at: { year: 2019, month: 3 },
            ends_at: { year: 2021, month: 1 },
          },
        ],
      }),
    });

    const profile = await extractor.extract('https://linkedin.com/in/alexrivera');
    expect(profile.experience[0].dates).toBe('Mar 2019 – Jan 2021');
  });
});
