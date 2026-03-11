# Folio Analytics & Error Monitoring Setup

**Status:** Framework complete, waiting for API keys  
**Commits:** 2  
**Build Status:** ✅ Pass

---

## What's Been Integrated

### PostHog Analytics (Framework)
- ✅ SDK installed (`posthog-js`)
- ✅ Analytics component created (`src/components/analytics.tsx`)
- ✅ Auto page view tracking enabled
- ✅ useTracking hook with 12+ event methods
- ✅ Environment variables configured

### Event Tracking Implemented
The following events are tracked automatically via `useTracking()` hook:

1. **Authentication Events**
   - `linkedin_auth_started`
   - `linkedin_auth_success` (includes profile data)
   - `linkedin_auth_failed` (includes error)

2. **User Journey Events**
   - `template_selected` (includes template_id)
   - `site_customized`
   - `website_activated` (first deployment)

3. **Conversion Funnel Events**
   - `pro_upgrade_initiated`
   - `pro_upgrade_completed` (includes amount, currency)
   - `checkout_initiated` (includes plan_id, price)
   - `payment_failed` (includes reason)

4. **System Events**
   - `$pageview` (automatic on every page change)
   - User identification (email, name, created_at)

### Environment Variables Required
```
NEXT_PUBLIC_POSTHOG_KEY=<your_posthog_api_key>
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com

NEXT_PUBLIC_SENTRY_DSN=<your_sentry_dsn>
SENTRY_AUTH_TOKEN=<optional_for_error_reporting>
```

---

## Next Steps to Complete Analytics Setup

### 1. Create PostHog Account
```
Website: https://posthog.com
Email: shirollsasaki@gmail.com
Organization: After App Studios
Project: Folio
```

Once created:
- Copy the API Key
- Add to `.env.local`: `NEXT_PUBLIC_POSTHOG_KEY=<key>`
- Deploy to verify events are firing

### 2. Create Sentry Account  
```
Website: https://sentry.io
Email: shirollsasaki@gmail.com
Organization: After App Studios
Project: Folio (Next.js platform)
```

Once created:
- Copy the DSN
- Add to `.env.local`: `NEXT_PUBLIC_SENTRY_DSN=<dsn>`

### 3. Switch Dodo Payments to Live Mode
**Current Status:** `test_mode` (testing payments)  
**Required Before Launch:** Switch to `live_mode`

Update `.env.local`:
```
# Change this:
DODO_PAYMENTS_ENVIRONMENT=test_mode

# To this:
DODO_PAYMENTS_ENVIRONMENT=live_mode
```

Then test a transaction to ensure live payments work.

### 4. Create PostHog Dashboards
Once PostHog is live, set up dashboards:
- **Launch Dashboard:** Signups over time, by source
- **Funnel Analysis:** LinkedIn auth → template → site live → pro upgrade
- **Revenue Dashboard:** Pro signups, trial conversions, LTV
- **Geographic:** Country breakdown of users

### 5. Create Sentry Alerts
- Alert on ANY error (critical during launch)
- Include error details + user context
- Send to Slack (if available) or email

### 6. Enable UTM Tracking
PostHog automatically captures UTM parameters. Verify these URLs work:
- ProductHunt: `folio.site?utm_source=producthunt&utm_medium=launch`
- Twitter: `folio.site?utm_source=twitter&utm_medium=social`
- Reddit: `folio.site?utm_source=reddit&utm_medium=social`
- Hacker News: `folio.site?utm_source=hackernews&utm_medium=social`

---

## How to Use Tracking in Components

### In Any React Component
```typescript
import { useTracking } from '@/hooks/useTracking';

export function MyComponent() {
  const { trackEvent, trackProUpgradeInitiated } = useTracking();

  const handleUpgradeClick = () => {
    trackProUpgradeInitiated();
    // navigate to checkout
  };

  return <button onClick={handleUpgradeClick}>Upgrade</button>;
}
```

### Custom Events
```typescript
const { trackEvent } = useTracking();

trackEvent('custom_event_name', {
  custom_property: 'value',
  amount: 123,
});
```

---

## Testing Analytics Locally

1. Add `NEXT_PUBLIC_POSTHOG_KEY` to `.env.local`
2. Run `npm run dev`
3. Open browser DevTools → Network tab
4. Navigate the app and look for PostHog API calls to `https://us.posthog.com`
5. Check PostHog dashboard to verify events appear

---

## Current Build Status

✅ All analytics code compiles  
✅ No type errors  
✅ Ready for keys and deployment  

**Next deploy:** After PostHog/Sentry keys are added
