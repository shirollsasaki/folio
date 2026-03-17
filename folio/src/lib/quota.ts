import type { PlanType } from '@/types';
import { getSitesByUser } from './db';

/**
 * Plan-based quota limits
 */
const PLAN_LIMITS: Record<PlanType, { maxSites: number; premiumTemplates: boolean }> = {
  free: { maxSites: 0, premiumTemplates: false },
  pro: { maxSites: 5, premiumTemplates: true },
  agency: { maxSites: 20, premiumTemplates: true },
};

export async function checkSiteQuota(userId: string, userPlan: PlanType): Promise<{ allowed: boolean; reason?: string }> {
  const limit = PLAN_LIMITS[userPlan];
  
  if (limit.maxSites === 0) {
    return { allowed: false, reason: 'Free plan does not allow site creation. Please upgrade to Pro or Agency.' };
  }

  const existingSites = await getSitesByUser(userId);
  
  if (existingSites.length >= limit.maxSites) {
    return { 
      allowed: false, 
      reason: `You have reached your plan limit of ${limit.maxSites} sites. Please upgrade or delete existing sites.` 
    };
  }

  return { allowed: true };
}

export function canUsePremiumTemplate(userPlan: PlanType): boolean {
  return PLAN_LIMITS[userPlan].premiumTemplates;
}

export function getPlanLimits(plan: PlanType) {
  return PLAN_LIMITS[plan];
}
