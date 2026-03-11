
## T9: Final QA Results — 2026-03-10

**URL:** https://afterapp.fun/folio  
**Status: ALL 10 CHECKS PASSED ✅**

### Evidence Files
- `desktop-full.png` — 1440×900 full-page screenshot ✅
- `mobile-full.png` — 390×844 full-page screenshot ✅
- `form-success.png` — Success state screenshot ✅
- `form-duplicate.png` — Duplicate state screenshot ✅

### Scenario Results

**S1: Desktop Visual (1440px)**
- ✅ "Coming Soon" badge found and visible
- ✅ No "FREE" tag in hero (hasFreeTag: false)
- ✅ All section headers left-aligned (textAlign: start): "How It Works", "Features", "Pricing"
- ✅ Home tab href = https://afterapp.fun/folio

**S2: Mobile Visual (390px)**
- ✅ Form stacks vertically (flexDirection: column)
- ✅ Input full-width at 320px (not truncated at 154px)
- ✅ Input top: 431px, Button top: 504px (73px gap = stacked)

**S3: Waitlist Form E2E**
- ✅ Success: "You're #1,204 in line! We'll reach out when we launch."
- ✅ Duplicate: "You're already on the list! We'll reach out when we launch."

**S4: Loading Spinner**
- ✅ Spinner found during loading: `<span class="spinner" aria-hidden="true"></span>Joining...`

**S5: Accessibility**
- ✅ input aria-label: "Email address"
- ✅ button aria-label: "Join waitlist"
- ✅ status container role="status" exists

**S6: OG Metadata**
- ✅ og:image = https://afterapp.fun/folio/og-image.png (1200×630)

**S7: API Status Field**
- ✅ status: new (returned correctly)

### Cleanup
- ✅ finalqa@folio.test deleted (HTTP 204)
- ✅ apicheckonly@folio.test deleted (HTTP 204)
- ✅ spinnertest@folio.test deleted (HTTP 204)
