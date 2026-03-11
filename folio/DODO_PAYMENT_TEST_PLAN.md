# Dodo Payments Testing Plan

**Environment:** test_mode ✅  
**Status:** Configuration complete, ready for manual testing  
**Blocking Item:** DODO_PAYMENTS_WEBHOOK_KEY is empty

---

## Current Configuration

### Environment Variables (.env.local)
```
DODO_PAYMENTS_API_KEY=3hloez2qqC-5grmb.POB0DTk0JWHCBo0FWd3vlhcOzQRW5slu2NCRLu9Ow2rxAd2w ✅
DODO_PAYMENTS_WEBHOOK_KEY= ❌ EMPTY (needs to be set)
DODO_PAYMENTS_RETURN_URL=https://afterapp.fun/folio/build ✅
DODO_PAYMENTS_ENVIRONMENT=test_mode ✅
DODO_PRODUCT_PRO=pdt_0NZwpK8C6q5489M5CBvHT ✅
DODO_PRODUCT_AGENCY=pdt_0NZwpK8C6q5489M5CBvHT ✅
```

### Checkout Flow Implementation
- `/api/checkout` → Creates checkout session via Dodo API
- Requires authenticated Clerk user with `dodo_customer_id`
- Returns `checkoutUrl` to redirect user to Dodo checkout page

### Webhook Implementation
- `/api/webhooks/dodo` → Handles subscription events
- Verifies webhook signature using `@dodopayments/core/webhook`
- Updates user plan in Supabase on successful payment
- Handles events: subscription.active, subscription.renewed, payment.failed, etc.

---

## Pre-Testing Setup (Required)

### 1. Get Webhook Key from Dodo Dashboard
1. Log into https://dashboard.dodopayments.com
2. Navigate to Settings → Webhooks
3. Copy webhook signing key
4. Add to `.env.local`: `DODO_PAYMENTS_WEBHOOK_KEY=whsec_...`
5. Redeploy to Vercel

### 2. Configure Webhook Endpoint in Dodo Dashboard
- Webhook URL: `https://afterapp.fun/folio/api/webhooks/dodo`
- Events to subscribe to:
  - `subscription.active`
  - `subscription.renewed`
  - `subscription.on_hold`
  - `subscription.cancelled`
  - `subscription.expired`
  - `subscription.plan_changed`
  - `payment.failed`

---

## Test Procedure

### Test 1: Pro Plan Signup (Happy Path)

**Steps:**
1. Navigate to https://afterapp.fun/folio
2. Click "Join Waitlist" (or sign up button)
3. Create account with Clerk
4. Navigate to /folio/build (build flow)
5. Click "Upgrade to Pro" button
6. Complete checkout with test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
7. Verify redirect to `DODO_PAYMENTS_RETURN_URL`

**Expected Results:**
- ✅ Checkout session created successfully
- ✅ User redirected to Dodo checkout page
- ✅ Test payment completes without errors
- ✅ User redirected back to afterapp.fun/folio/build
- ✅ Webhook fires: `subscription.active` event
- ✅ User plan updated to `pro` in database
- ✅ Subscription ID stored in `users` table

**Verification:**
```sql
-- Check user plan in Supabase
SELECT clerk_user_id, plan, subscription_status, subscription_id
FROM users
WHERE clerk_user_id = '<test_user_clerk_id>';
```

---

### Test 2: Failed Payment

**Steps:**
1. Use test card that fails: `4000 0000 0000 0002`
2. Complete checkout flow
3. Verify payment fails gracefully

**Expected Results:**
- ✅ Payment fails with user-friendly error
- ✅ Webhook fires: `payment.failed` event
- ✅ User status set to `failed` in database
- ✅ User is notified and can retry

---

### Test 3: Webhook Verification

**Steps:**
1. Trigger a test webhook from Dodo dashboard
2. Check server logs for webhook processing
3. Verify signature validation works

**Expected Results:**
- ✅ Webhook signature verified successfully
- ✅ Event processed and database updated
- ✅ Returns `{ "received": true }`

---

## Test Results Template

```markdown
### Test Run: [Date/Time]

**Tester:** [Name]

#### Test 1: Pro Plan Signup
- [ ] Checkout session created
- [ ] Payment page loaded
- [ ] Test card accepted
- [ ] Redirect to return URL successful
- [ ] Webhook received and verified
- [ ] User plan updated to `pro`
- [ ] Subscription ID stored

**Issues:**
- [List any issues encountered]

#### Test 2: Failed Payment
- [ ] Failed card rejected correctly
- [ ] Error message shown to user
- [ ] Webhook handled failed payment
- [ ] User can retry

**Issues:**
- [List any issues encountered]

#### Test 3: Webhook Verification
- [ ] Test webhook sent from dashboard
- [ ] Signature verified
- [ ] Event processed
- [ ] Database updated

**Issues:**
- [List any issues encountered]

---

**Overall Status:** ✅ Pass / ⚠️ Pass with issues / ❌ Fail

**Next Steps:**
[Actions to take based on test results]
```

---

## Switching to Live Mode (After Tests Pass)

**DO NOT switch to live mode until all tests pass.**

### Steps:
1. Verify all test cases pass in test_mode
2. Update environment variable:
   ```
   DODO_PAYMENTS_ENVIRONMENT=live_mode
   ```
3. Update product IDs to live versions (if different)
4. Verify webhook endpoint is configured for live mode
5. Run 1 real transaction with a real card (can be refunded)
6. Monitor first few live transactions closely

### Post-Launch Monitoring
- Monitor Dodo dashboard for failed payments
- Set up alerts for webhook failures
- Monitor Sentry for payment API errors
- Check user support inbox for payment issues

---

## Known Issues / Blockers

1. ❌ **DODO_PAYMENTS_WEBHOOK_KEY is empty** → Get from Dodo dashboard
2. ⚠️ **DODO_PRODUCT_PRO and DODO_PRODUCT_AGENCY point to same product** → Verify if this is intentional or if agency plan needs separate product ID

---

## Resources

- Dodo Payments Dashboard: https://dashboard.dodopayments.com
- Dodo Docs: https://docs.dodopayments.com
- Test Cards: https://docs.dodopayments.com/testing
- Folio Checkout API: `/api/checkout`
- Folio Webhook API: `/api/webhooks/dodo`

---

**Next Action:** Get DODO_PAYMENTS_WEBHOOK_KEY from dashboard, then proceed with Test 1.
