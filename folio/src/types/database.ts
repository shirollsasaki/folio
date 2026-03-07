import type { ProfileData } from './profile';

export type SubscriptionStatus =
  | 'pending'
  | 'active'
  | 'on_hold'
  | 'paused'
  | 'cancelled'
  | 'expired'
  | 'failed';

export type PlanType = 'free' | 'pro' | 'agency';

export interface DbUser {
  id: string;                          // Clerk user ID
  email: string;
  dodo_customer_id: string | null;
  subscription_id: string | null;
  subscription_status: SubscriptionStatus;
  plan: PlanType;
  created_at: string;
}

export interface DbSite {
  id: string;
  user_id: string;
  template_id: string;
  vercel_project_id: string | null;
  vercel_url: string | null;
  custom_domain: string | null;
  profile_data: ProfileData;
  created_at: string;
  updated_at: string;
}
