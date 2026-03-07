import { supabaseAdmin } from './supabase';
import type { DbUser, DbSite, PlanType, SubscriptionStatus } from '@/types';

export async function getUser(clerkId: string): Promise<DbUser | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', clerkId)
    .single();
  if (error || !data) return null;
  return data as DbUser;
}

export async function upsertUser(
  user: Partial<DbUser> & { id: string; email: string }
): Promise<DbUser> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .upsert(user, { onConflict: 'id' })
    .select()
    .single();
  if (error || !data) throw new Error(`Failed to upsert user: ${error?.message}`);
  return data as DbUser;
}

export async function updateUserPlan(
  clerkId: string,
  plan: PlanType,
  subscriptionId: string,
  status: SubscriptionStatus
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('users')
    .update({ plan, subscription_id: subscriptionId, subscription_status: status })
    .eq('id', clerkId);
  if (error) throw new Error(`Failed to update user plan: ${error.message}`);
}

export async function updateUserDodoCustomer(
  clerkId: string,
  dodoCustomerId: string
): Promise<void> {
  const { error } = await supabaseAdmin
    .from('users')
    .update({ dodo_customer_id: dodoCustomerId })
    .eq('id', clerkId);
  if (error) throw new Error(`Failed to update dodo customer: ${error.message}`);
}

export async function getSitesByUser(userId: string): Promise<DbSite[]> {
  const { data, error } = await supabaseAdmin
    .from('sites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(`Failed to get sites: ${error.message}`);
  return (data ?? []) as DbSite[];
}

export async function createSite(
  site: Omit<DbSite, 'id' | 'created_at' | 'updated_at'>
): Promise<DbSite> {
  const { data, error } = await supabaseAdmin
    .from('sites')
    .insert(site)
    .select()
    .single();
  if (error || !data) throw new Error(`Failed to create site: ${error?.message}`);
  return data as DbSite;
}

export async function updateSite(
  siteId: string,
  updates: Partial<Omit<DbSite, 'id' | 'user_id' | 'created_at'>>
): Promise<DbSite> {
  const { data, error } = await supabaseAdmin
    .from('sites')
    .update(updates)
    .eq('id', siteId)
    .select()
    .single();
  if (error || !data) throw new Error(`Failed to update site: ${error?.message}`);
  return data as DbSite;
}

export async function deleteSite(siteId: string): Promise<void> {
  const { error } = await supabaseAdmin
    .from('sites')
    .delete()
    .eq('id', siteId);
  if (error) throw new Error(`Failed to delete site: ${error.message}`);
}
