import type { ProfileData } from '@/types';
import type { LinkedInExtractor } from './types';

interface ProxycurlExperience {
  title: string | null;
  company: string | null;
  starts_at: { year: number; month: number } | null;
  ends_at: { year: number; month: number } | null;
}

interface ProxycurlProfile {
  full_name: string | null;
  headline: string | null;
  summary: string | null;
  city: string | null;
  country_full_name: string | null;
  profile_pic_url: string | null;
  public_identifier: string | null;
  experiences: ProxycurlExperience[] | null;
  skills: string[] | null;
}

function formatDate(d: { year: number; month: number } | null): string {
  if (!d) return 'Present';
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[d.month - 1] ?? ''} ${d.year}`;
}

export class ProxycurlExtractor implements LinkedInExtractor {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://nubela.co/proxycurl/api/v2/linkedin';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async extract(linkedinUrl: string): Promise<ProfileData> {
    if (!linkedinUrl.includes('linkedin.com/in/')) {
      throw new Error('Invalid LinkedIn profile URL. Must contain linkedin.com/in/');
    }

    const url = new URL(this.baseUrl);
    url.searchParams.set('url', linkedinUrl);
    url.searchParams.set('use_cache', 'if-present');
    url.searchParams.set('fallback_to_cache', 'on-error');

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    if (response.status === 404) {
      console.error('[Proxycurl] Profile not found:', linkedinUrl);
      throw new Error('LinkedIn profile not found. Please check the URL.');
    }

    if (response.status === 429) {
      console.error('[Proxycurl] Rate limit exceeded for:', linkedinUrl);
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (response.status === 402) {
      console.error('[Proxycurl] Payment required - credits exhausted');
      throw new Error('LinkedIn extraction service temporarily unavailable. Please try again later.');
    }

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'No error body');
      console.error('[Proxycurl API Error]:', response.status, response.statusText, errorBody);
      throw new Error(`LinkedIn extraction failed: ${response.status} ${response.statusText}`);
    }

    const data: ProxycurlProfile = await response.json() as ProxycurlProfile;

    const location = [data.city, data.country_full_name].filter(Boolean).join(', ');
    const linkedinHandle = data.public_identifier ?? linkedinUrl.split('/in/')[1]?.replace(/\/$/, '') ?? '';

    const experience = (data.experiences ?? [])
      .filter((e) => e.title && e.company)
      .slice(0, 5)
      .map((e) => ({
        title: e.title ?? '',
        company: e.company ?? '',
        dates: `${formatDate(e.starts_at)} – ${formatDate(e.ends_at)}`,
      }));

    return {
      name: data.full_name ?? '',
      headline: data.headline ?? '',
      bio: data.summary ?? '',
      location,
      avatar_url: data.profile_pic_url ?? '',
      linkedin_url: `https://linkedin.com/in/${linkedinHandle}`,
      twitter_url: undefined,
      instagram_url: undefined,
      experience,
      skills: (data.skills ?? []).slice(0, 10),
      custom_links: [],
    };
  }
}
