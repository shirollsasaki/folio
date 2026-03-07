import { z } from 'zod';

export const ExtractRequestSchema = z.object({
  linkedin_url: z.string().url().includes('linkedin.com'),
});

export const DeployRequestSchema = z.object({
  template_id: z.string().min(1),
  profile_data: z.object({
    name: z.string(),
    headline: z.string(),
    bio: z.string(),
    location: z.string(),
    avatar_url: z.string(),
    linkedin_url: z.string(),
     twitter_url: z.string().optional(),
     instagram_url: z.string().optional(),
     github_url: z.string().optional(),
     youtube_url: z.string().optional(),
     website_url: z.string().optional(),
     experience: z.array(z.object({
      title: z.string(),
      company: z.string(),
      dates: z.string(),
    })),
    skills: z.array(z.string()),
    custom_links: z.array(z.object({
      label: z.string(),
      url: z.string(),
    })),
  }),
});

export const CheckoutRequestSchema = z.object({
  productId: z.string().min(1),
  planType: z.enum(['pro', 'agency']),
});

export type ExtractRequest = z.infer<typeof ExtractRequestSchema>;
export type DeployRequest = z.infer<typeof DeployRequestSchema>;
export type CheckoutRequest = z.infer<typeof CheckoutRequestSchema>;
