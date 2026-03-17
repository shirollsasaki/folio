import { useCallback } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { captureEvent, captureIdentify } from '@/components/analytics';

export function useTracking() {
  const { userId } = useAuth();
  const { user } = useUser();

  /**
   * Track a custom event
   */
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    captureEvent(eventName, {
      ...properties,
      user_id: userId || 'anonymous',
      timestamp: new Date().toISOString(),
    });
  }, [userId]);

  /**
   * Track when LinkedIn auth is initiated
   */
  const trackLinkedInAuthStart = useCallback(() => {
    trackEvent('linkedin_auth_started');
  }, [trackEvent]);

  /**
   * Track when LinkedIn auth succeeds
   */
  const trackLinkedInAuthSuccess = useCallback((profileData?: any) => {
    trackEvent('linkedin_auth_success', {
      profile_url: profileData?.linkedinUrl || 'unknown',
      has_experience: !!profileData?.experiences?.length,
      has_education: !!profileData?.education?.length,
    });
  }, [trackEvent]);

  /**
   * Track when LinkedIn auth fails
   */
  const trackLinkedInAuthFailure = useCallback((error?: string) => {
    trackEvent('linkedin_auth_failed', {
      error_message: error || 'unknown',
    });
  }, [trackEvent]);

  /**
   * Track when user selects a template
   */
  const trackTemplateSelected = useCallback((templateId: string, templateName?: string) => {
    trackEvent('template_selected', {
      template_id: templateId,
      template_name: templateName || 'unknown',
    });
  }, [trackEvent]);

  /**
   * Track when user customizes site
   */
  const trackSiteCustomized = useCallback((changes?: Record<string, any>) => {
    trackEvent('site_customized', changes || {});
  }, [trackEvent]);

  /**
   * Track when website is activated (first deployment)
   */
  const trackWebsiteActivated = useCallback((siteUrl?: string) => {
    trackEvent('website_activated', {
      site_url: siteUrl || 'unknown',
    });
  }, [trackEvent]);

  /**
   * Track when user initiates Pro upgrade
   */
  const trackProUpgradeInitiated = useCallback(() => {
    trackEvent('pro_upgrade_initiated', {
      current_plan: 'free',
      target_plan: 'pro',
    });
  }, [trackEvent]);

  /**
   * Track when Pro upgrade is completed
   */
  const trackProUpgradeCompleted = useCallback((amount: number, currency: string = 'usd') => {
    trackEvent('pro_upgrade_completed', {
      amount,
      currency,
      plan: 'pro',
    });
  }, [trackEvent]);

  /**
   * Track when checkout is initiated
   */
  const trackCheckoutInitiated = useCallback((planId: string, price: number) => {
    trackEvent('checkout_initiated', {
      plan_id: planId,
      price,
    });
  }, [trackEvent]);

  /**
   * Track when payment fails
   */
  const trackPaymentFailed = useCallback((reason?: string, planId?: string) => {
    trackEvent('payment_failed', {
      reason: reason || 'unknown',
      plan_id: planId,
    });
  }, [trackEvent]);

  /**
   * Track page view with custom properties
   */
  const trackPageView = useCallback((pageName: string, properties?: Record<string, any>) => {
    trackEvent('$pageview', {
      page_name: pageName,
      ...properties,
    });
  }, [trackEvent]);

  /**
   * Identify user in analytics
   */
  const identifyUser = useCallback(() => {
    if (userId && user) {
      captureIdentify(userId, {
        email: user.emailAddresses?.[0]?.emailAddress,
        name: user.fullName,
        created_at: user.createdAt,
      });
    }
  }, [userId, user]);

  return {
    trackEvent,
    trackLinkedInAuthStart,
    trackLinkedInAuthSuccess,
    trackLinkedInAuthFailure,
    trackTemplateSelected,
    trackSiteCustomized,
    trackWebsiteActivated,
    trackProUpgradeInitiated,
    trackProUpgradeCompleted,
    trackCheckoutInitiated,
    trackPaymentFailed,
    trackPageView,
    identifyUser,
  };
}
