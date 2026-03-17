# Folio Code Review — Executive Summary

**Date:** March 17, 2026  
**Reviewed by:** Gilfoyle  
**Status:** ✅ Complete

---

## TL;DR

**Found:** 28 issues (2 critical, 7 high, 10 medium, 9 low)  
**Fixed:** 15 issues (all critical and high-priority)  
**Tests:** ✅ All 12 passing  
**Build:** ✅ TypeScript now enforced, builds successfully  
**Deployment risk:** Low — changes are defensive and additive

---

## What Was Broken (Critical)

### 1. TypeScript Ignored (next.config.ts)
**Problem:** `ignoreBuildErrors: true` — app was shipping with type errors  
**Fixed:** Enabled TypeScript checking, discovered and fixed 3 hidden bugs  
**Impact:** Build now fails on type errors (as it should)

### 2. Unsafe Environment Variables
**Problem:** Vercel + Supabase had fallback empty strings → silent failures  
**Fixed:** App now crashes immediately if env vars missing  
**Impact:** Fail-fast instead of broken deployments

---

## What Was Risky (High Priority)

### 3. No Rate Limiting
**Problem:** Users could spam LinkedIn extraction (costs money), deployments, checkout  
**Fixed:** Added rate limiter (`lib/rate-limit.ts`)
- Extract: 10/min per IP
- Deploy: 5/hour per user  
- Checkout: 3 per 5min per user  
**Impact:** Protects API credits, prevents abuse

### 4. No Quota Enforcement
**Problem:** Free users could create unlimited sites (bypassing paywall)  
**Fixed:** Added plan-based quotas (`lib/quota.ts`)
- Free: 0 sites  
- Pro: 5 sites  
- Agency: 20 sites  
**Impact:** Enforces business model

### 5-7. Hardcoded Paths, React Antipattern, Missing Error Logs
**Fixed:** All addressed (see full report for details)

---

## What's Left (Acceptable Debt)

- **React hook violations** in templates (animation patterns, functional)
- **Unescaped HTML entities** in copy (visual only, no functional impact)
- **`<img>` instead of `<Image>`** in templates (minor perf hit)
- **In-memory rate limiting** (fine for current scale, move to Redis later)

**Full list:** See `REMAINING_ISSUES.md`

---

## Files Changed

**New:**
- `src/lib/rate-limit.ts` — Rate limiter
- `src/lib/quota.ts` — Plan quotas
- `CODE_REVIEW_REPORT.md` — Full technical report
- `REMAINING_ISSUES.md` — Technical debt log

**Modified:** 18 files (see full report)

---

## Before You Deploy

### Required Environment Variables
Verify these are set in production (app will crash if missing):
```bash
VERCEL_API_TOKEN
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_BASE_PATH  # Defaults to /folio
```

### Test in Staging
1. **Rate limiting** — Try spamming LinkedIn extraction (should block after 10)
2. **Quota enforcement** — Create test free/pro accounts, try exceeding limits
3. **Error monitoring** — Check Sentry for new errors after deploy

### Monitor After Deploy
- Sentry: Look for environment variable errors
- PostHog: Check analytics initialization works
- Logs: Watch for rate limit hits (could indicate abuse or too-strict limits)

---

## Recommendations

### This Week
1. Test in staging before production deploy
2. Monitor closely for 24h after deploy

### Next Sprint
1. Fix remaining React hook violations (Hero.tsx animation)
2. Add Sentry instrumentation to db operations
3. Add end-to-end tests for critical flows

### Next Month
1. Move rate limiting to Redis (when scaling horizontally)
2. Add monitoring dashboard for rate limits + quotas
3. Optimize templates (reduce duplicated code)

---

## Security Improvements Summary

✅ **Rate limiting** — Prevents abuse  
✅ **Quota enforcement** — Prevents free-tier bypass  
✅ **Fail-fast env vars** — No silent misconfiguration  
✅ **Error logging** — Better incident response  
✅ **Type safety** — TypeScript errors block builds  

---

## Bottom Line

**Ship it.** The codebase is significantly more robust than before. Critical issues fixed, high-priority issues fixed, tests passing, build passing.

Remaining issues are acceptable technical debt for current scale. Address incrementally as needed.

**Risk level:** Low  
**Confidence:** High  

---

**Questions?** Check `CODE_REVIEW_REPORT.md` for full technical details or `REMAINING_ISSUES.md` for what's not fixed.

— Gilfoyle
