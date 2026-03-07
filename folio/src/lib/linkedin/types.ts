import type { ProfileData } from '@/types';

export interface LinkedInExtractor {
  extract(linkedinUrl: string): Promise<ProfileData>;
}
