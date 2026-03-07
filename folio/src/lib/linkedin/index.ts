import { ProxycurlExtractor } from './proxycurl';
import type { LinkedInExtractor } from './types';

export type { LinkedInExtractor };

const apiKey = process.env.PROXYCURL_API_KEY ?? '';

export const linkedInExtractor: LinkedInExtractor = new ProxycurlExtractor(apiKey);
