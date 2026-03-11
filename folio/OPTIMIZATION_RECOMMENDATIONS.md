# Specific Optimization Recommendations
**Status:** Ready to implement (awaiting approval)

---

## Critical Image: portfolio-mockup.jpg (74K)

**Issue:** JPG format, likely the LCP element

**Optimization:**
1. Convert to WebP format (expected 30-40% reduction = 44-51K)
2. Implement responsive srcset for different viewports
3. Add `loading="lazy"` attribute if below-fold

**Command:**
```bash
# Install cwebp converter
brew install webp

# Convert
cwebp -q 85 public/portfolio-mockup.jpg -o public/portfolio-mockup.webp

# Update HTML to use WebP with fallback
<picture>
  <source srcset="/folio/portfolio-mockup.webp" type="image/webp">
  <img src="/folio/portfolio-mockup.jpg" alt="Portfolio mockup" />
</picture>
```

**Impact:** LCP reduction of 0.8-1.2s

---

## JavaScript Optimization: PostHog Analytics

**Issue:** PostHog initializes on every pageload (non-critical)

**Current Code (src/components/analytics.tsx):**
```typescript
if (typeof window !== 'undefined') {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (posthogKey) {
    posthog.init(posthogKey, { ... });
  }
}
```

**Optimization:**
Defer PostHog initialization until after TTI (5-10s delay is acceptable for analytics).

```typescript
// analytics.tsx
useEffect(() => {
  // Defer to next idle period (after TTI)
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(() => {
      posthog.init(posthogKey, { ... });
    });
  } else {
    setTimeout(() => {
      posthog.init(posthogKey, { ... });
    }, 5000);
  }
}, []);
```

**Impact:** TTI reduction of 200-400ms

---

## JavaScript Optimization: Code Splitting Landing Page

**Issue:** All landing page sections loaded upfront

**Current Structure:**
- HeroSection
- HowItWorks
- Features  
- Pricing
- CTA sections

**Optimization:**
Lazy load sections below the fold.

```typescript
// src/app/(landing)/page.tsx
import dynamic from 'next/dynamic';

const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  loading: () => <div className="h-96" />, // Placeholder skeleton
});

const Features = dynamic(() => import('@/components/Features'), {
  loading: () => <div className="h-96" />,
});

const Pricing = dynamic(() => import('@/components/Pricing'), {
  loading: () => <div className="h-96" />,
});

// Hero section rendered synchronously
// Below sections lazy-loaded
```

**Impact:** Initial JS bundle reduction of 15-20%, TTI improvement of 800ms-1.2s

---

## Code: Clerk Provider (Complex - May Skip for Now)

**Issue:** Clerk authentication overhead

**Challenge:** ClerkProvider must wrap entire app for auth context to work

**Potential Optimization:** Move auth logic to dynamic import for dashboard/build routes only

**Risk:** High complexity, may introduce bugs

**Recommendation:** Skip for Path B, include in Path C if time permits

---

## Best Practices Fixes

**Issue: Third-Party Cookies (Score 77)**

**Action:** Check Clerk and PostHog for unnecessary cookies

```bash
# Inspect cookies being set
# Likely: Clerk session cookie, PostHog __ph_phc_id

# These are necessary but ensure secure/samesite flags are set
```

**Action:** Add security headers to next.config.ts

```typescript
// next.config.ts
const nextConfig = {
  // ... existing config
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
  ],
};
```

**Impact:** Best Practices score improvement to 88-92

---

## Implementation Roadmap (Path B - 1.5h)

**Phase 1: Code Splitting (30 min)**
- [ ] Implement dynamic imports for HowItWorks, Features, Pricing
- [ ] Add loading placeholders/skeletons
- [ ] Test: Verify sections load on scroll
- [ ] **Impact:** TTI -800ms to -1.2s, initial bundle -15-20%

**Phase 2: PostHog Deferral (20 min)**
- [ ] Update Analytics component to use requestIdleCallback
- [ ] Test: Verify analytics initializes after TTI
- [ ] **Impact:** TTI -200ms to -400ms

**Phase 3: Image Optimization (20 min)**
- [ ] Convert portfolio-mockup.jpg to WebP
- [ ] Update `landing/page.tsx` to use `<picture>` element
- [ ] Test: Verify fallback works
- [ ] **Impact:** LCP -0.8s to -1.2s

**Phase 4: Security Headers (10 min)**
- [ ] Add headers to next.config.ts
- [ ] Test: Verify headers in response
- [ ] **Impact:** Best Practices +15-20 points

**Phase 5: Lighthouse Audit (10 min)**
- [ ] Re-run Lighthouse on production
- [ ] Verify all metrics improved
- [ ] **Expected:** Performance 92-95, LCP 2.0-2.5s, TTI 3.5-4.0s

**Total: ~90 minutes**

---

## Ready to Execute

All optimizations documented and safe to implement. Awaiting Richard's approval to proceed with Path B (or A/C).

**Status:** BLOCKED WAITING FOR DIRECTION
