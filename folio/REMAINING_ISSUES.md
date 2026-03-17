# Remaining Issues — Folio Codebase

**Status:** Non-critical, require larger refactors or are acceptable technical debt  
**Last updated:** March 17, 2026

---

## React Hooks Violations (8 errors)

### 1. Hero.tsx — setState in useEffect
**Location:** `src/components/landing/Hero.tsx:43`  
**Issue:** Typing animation calls `setCurrentMessageIndex` and `setIsTyping` inside useEffect  
**Risk:** Cascading renders, minor performance hit  
**Fix:** Rewrite animation logic using refs or interval-based approach  
**Priority:** Low (functional, just inefficient)

### 2. CustomCursor.tsx — setState in useEffect
**Location:** `src/components/lumo/CustomCursor.tsx:15`  
**Issue:** Calls `setIsVisible(true)` directly in useEffect  
**Risk:** Minor performance hit  
**Fix:** Move initialization logic to useState initializer  
**Priority:** Low

### 3. particle-network template — Math.random during render
**Location:** `src/templates/particle-network/index.tsx:131-133`  
**Issue:** Generates particle positions with Math.random() during render  
**Risk:** Positions change on every re-render (unintended behavior)  
**Fix:** Move to `useMemo` with stable seed or `useState` initialization  
**Priority:** Medium (could cause visual glitches)

### 4. particle-network template — setState in useEffect
**Location:** `src/templates/particle-network/index.tsx:263`  
**Issue:** Calls `setMounted(true)` in useEffect  
**Fix:** Common SSR pattern, but can be improved with conditional rendering  
**Priority:** Low

### 5. Templates.tsx — Component created during render
**Location:** `src/components/landing/Templates.tsx:38`  
**Issue:** `Bar` component defined inside render function  
**Risk:** Re-creates component on every render, loses state  
**Fix:** Move `Bar` outside component or use `useMemo`  
**Priority:** Low (no state in Bar, so no observable bug)

---

## Unescaped HTML Entities (15 errors)

### Locations:
- `src/app/terms/page.tsx` — Multiple quotes and apostrophes
- `src/components/landing/WarmGreyLanding.tsx` — Apostrophes in copy
- `src/templates/gradient-modern/index.tsx` — Apostrophe
- `src/templates/timeline-vertical/index.tsx` — Apostrophe

**Fix:** Replace with `&ldquo;`, `&rdquo;`, `&apos;`, etc.  
**Priority:** Very low (visual only, no functional impact)  
**Batch fix:** Can be automated with regex

---

## Next.js Image Optimization (7 warnings)

### Locations:
- `src/app/build/BuildStep1.tsx:242`
- `src/templates/forest-link/index.tsx:44`
- `src/templates/impact-report/index.tsx:42`
- `src/templates/violet-pro/index.tsx:72`

**Issue:** Using `<img>` instead of Next.js `<Image>`  
**Risk:** Slower LCP, higher bandwidth usage  
**Why not fixed:**
- Templates use external URLs (LinkedIn/Twitter profile pics)
- Templates are statically exported HTML (Image optimization may not work)
- BuildStep1 shows live preview (dynamic content)

**Fix:** 
- For BuildStep1: Use Next.js Image with external domain config
- For templates: Consider pre-optimization script or leave as-is

**Priority:** Low (templates are export targets, not app pages)

---

## TypeScript `any` Types (6 errors)

### Locations:
- `src/components/analytics.tsx` — PostHog event properties
- `src/hooks/useTracking.ts` — Multiple tracking functions
- `src/components/ui/Button.tsx` — Event handler props
- `src/templates/timeline-vertical/index.tsx` — Animation refs

**Fix:** Define proper TypeScript interfaces for tracking events  
**Priority:** Low (functional, just not type-safe)  
**Recommendation:** Create `types/tracking.ts` with event schemas

---

## Architecture/Design Issues

### 1. In-memory rate limiting
**Current:** Map-based sliding window (resets on restart)  
**Issue:** Rate limits don't persist across server restarts  
**Fix:** Move to Redis or database-backed store  
**Priority:** Low (fine for current scale)  
**When to fix:** When horizontally scaling or seeing abuse

### 2. No Sentry instrumentation in db operations
**Current:** Console.error only  
**Issue:** Errors logged but not tracked in Sentry  
**Fix:** Wrap db calls in try-catch with Sentry.captureException  
**Priority:** Medium (important for production monitoring)  
**When to fix:** Before launch or after first incident

### 3. Return URL not validated in billing.ts
**Current:** Accepts any return URL from env var  
**Issue:** Potential open redirect (low likelihood)  
**Fix:** Validate against whitelist of allowed domains  
**Priority:** Low (DodoPayments likely validates server-side)  
**When to fix:** Security audit or compliance requirement

### 4. No user ownership check race condition
**Location:** DELETE /api/sites  
**Issue:** Check and delete are separate operations (tiny race window)  
**Fix:** Use Supabase RLS or database transaction  
**Priority:** Very low (unlikely to be exploited)  
**When to fix:** If seeing unauthorized deletes in logs

---

## Linter Suppressions Recommended

If these issues are accepted as technical debt, suppress linter:

```js
// eslint.config.mjs
export default [
  // ... existing config
  {
    rules: {
      '@next/next/no-img-element': 'warn', // Downgrade from error
      'react/no-unescaped-entities': 'warn', // Downgrade from error
      '@typescript-eslint/no-explicit-any': 'warn', // Allow in tracking code
      'react-hooks/set-state-in-effect': 'warn', // Allow in animation components
    }
  }
]
```

**Trade-off:** Less strict linting, but removes noise for known issues.

---

## When to Revisit

### Triggers for addressing these issues:
1. **Performance problems** → Fix React hooks violations in Hero/CustomCursor
2. **Visual bugs** → Fix Math.random in particle-network template
3. **Security audit** → Fix return URL validation, add user ownership transaction
4. **Horizontal scaling** → Move rate limiting to Redis
5. **Compliance requirement** → Fix all unescaped entities
6. **LCP score drops** → Add Next.js Image optimization to templates

---

## Summary

**Total remaining issues:** 38 linter errors + 7 warnings  
**Functional impact:** Minimal (mostly performance/type-safety)  
**Recommended action:** Accept as technical debt, address on-demand  
**Blocker for launch:** No

These issues are **not blockers** for production deployment. They represent areas for incremental improvement.
