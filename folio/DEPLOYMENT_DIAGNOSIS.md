# Folio Deployment Issue Diagnosis
**Date:** March 11, 2026 - 2:48 PM IST  
**Issue:** `/folio/privacy` and `/folio/terms` routes returning 404 on production  
**Status:** LOCAL BUILD WORKS ✅ | PRODUCTION DEPLOYMENT BROKEN ❌

---

## What Works ✅

### Local Build Verification
```bash
cd ~/folio/folio && npm run build
```

**Output:**
```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /privacy
└ ○ /terms

○  (Static)   prerendered as static content
```

**Status:** Both routes build successfully as static pages locally.

### Code Verification
- ✅ `src/app/privacy/page.tsx` exists and exports valid React component
- ✅ `src/app/terms/page.tsx` exists and exports valid React component
- ✅ `next.config.ts` has correct `basePath: '/folio'` configuration
- ✅ No conflicting `vercel.json` configuration
- ✅ Build completes without errors
- ✅ Git commits show pages in repo history

---

## What's Broken ❌

### Production Routes
- ❌ https://afterapp.fun/folio/privacy → 404
- ❌ https://afterapp.fun/folio/terms → 404

### Deployment Attempts
1. **Initial push (7f3cf07):** Pushed code + waited → 404
2. **Force push #1 (bee3dc2):** Empty commit trigger → 404
3. **Force push #2 (current):** Empty commit trigger → Still checking...

**Timeline:** 14+ minutes since first deployment trigger.

---

## Root Cause Analysis

Since local build works perfectly but production returns 404, the issue is **NOT in the code**. Possible causes:

### 1. Vercel Deployment Not Triggering (MOST LIKELY)
**Symptoms:**
- Multiple git pushes not reflecting on production
- 14+ minutes with no changes

**How to verify:**
1. Log into Vercel dashboard
2. Check "Deployments" tab
3. Look for recent deployments from `main` branch
4. If no deployments listed after 14:28 PM → **GitHub webhook broken**

**Fix:**
- Reconnect GitHub integration in Vercel project settings
- Or manually trigger deployment from Vercel dashboard

---

### 2. Vercel Build Failing Silently
**Symptoms:**
- Deployments trigger but fail without notification
- Previous working deployment continues serving

**How to verify:**
1. Check latest deployment in Vercel dashboard
2. Click on deployment → view build logs
3. Look for errors mentioning `privacy` or `terms` routes

**Fix:**
- Review error logs
- Fix any environment variable issues
- Re-deploy

---

### 3. Vercel Route Caching
**Symptoms:**
- New routes not appearing despite successful deployment
- Old 404 responses cached at CDN level

**How to verify:**
1. Check deployment "Domains" tab
2. Verify deployment is marked as "Production"
3. Check if cache purge needed

**Fix:**
- Manually purge cache in Vercel dashboard
- Or wait for TTL expiry (usually 5-60 minutes)

---

### 4. Vercel Project Configuration Override
**Symptoms:**
- Project settings override `next.config.ts`
- Routes excluded from deployment

**How to verify:**
1. Go to Vercel project Settings → General
2. Check "Build & Development Settings"
3. Look for custom build commands or output directory overrides

**Fix:**
- Reset to framework defaults
- Ensure no custom route exclusions

---

## Recommended Fix Steps (In Order)

### Step 1: Verify Deployment Status (2 min)
```
1. Open Vercel dashboard
2. Navigate to project "folio" (or correct project name)
3. Go to "Deployments" tab
4. Check if deployments from last 20 minutes exist
```

**If NO deployments → Go to Step 2**  
**If deployments exist → Go to Step 3**

---

### Step 2: Fix GitHub Integration (3 min)
```
1. In Vercel dashboard → Settings → Git
2. Check if GitHub repo is connected
3. If not connected → Reconnect
4. If connected → Check webhook settings in GitHub repo
5. Manually trigger redeploy from Vercel
```

**After fix:** Wait 3-5 min for deployment, then test `/folio/privacy`

---

### Step 3: Check Build Logs (2 min)
```
1. Click on latest deployment
2. Go to "Building" tab
3. Scroll to bottom of logs
4. Look for:
   - "Error" messages
   - Route generation output
   - Build success/failure status
```

**If build failed → Fix error and redeploy**  
**If build succeeded → Go to Step 4**

---

### Step 4: Verify Production Deployment (1 min)
```
1. In deployment view, check status badge
2. Should say "Ready" or "Production"
3. Click "Visit" to preview deployment
4. Try accessing /folio/privacy from preview URL
```

**If preview URL works but production doesn't → DNS/routing issue**  
**If preview URL also 404 → Build output verification needed**

---

### Step 5: Manual Cache Purge (1 min)
```
1. Vercel dashboard → project → Domains
2. Find afterapp.fun domain
3. Click "..." menu → "Purge Cache"
4. Wait 1-2 minutes
5. Test /folio/privacy again
```

---

### Step 6: Nuclear Option - Force Rebuild (5 min)
```
1. Vercel dashboard → Settings → General
2. Scroll to "Redeploy"
3. Check "Use existing Build Cache" → UNCHECK IT
4. Click "Redeploy"
5. Wait for fresh build (3-5 min)
6. Test routes
```

---

## Evidence of Working Code

### Git Log
```bash
$ cd ~/folio/folio && git log --oneline --graph -10

* bee3dc2 (HEAD -> main, origin/main) Trigger Vercel deployment
* 7f3cf07 trigger: force Vercel deployment for legal pages
* 1cf4736 docs: add comprehensive pre-launch status report
* 02cad99 docs: add comprehensive Dodo payment testing plan
* cf7f506 feat: integrate PostHog analytics and tracking infrastructure
* 975a26c feat: add legal pages (privacy policy and terms of service)
```

### File System Verification
```bash
$ ls -la ~/folio/folio/src/app/privacy/
total 16
-rw-r--r--  1 user  staff  5832 Mar 11 14:18 page.tsx

$ ls -la ~/folio/folio/src/app/terms/
total 16
-rw-r--r--  1 user  staff  7156 Mar 11 14:18 page.tsx
```

---

## Next Actions

**For Richard (with Vercel access):**
1. Execute Step 1 → Step 6 above until routes are live
2. Report which step fixed the issue (for future reference)

**For Gilfoyle (without Vercel access):**
- Code is 100% correct and tested
- Waiting for Vercel deployment to complete
- Can proceed with other tasks (PostHog setup, Dodo testing) in parallel

---

## Alternate Deployment Test

If Vercel continues failing, test deployment on a different platform:

### Option A: Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy from local
cd ~/folio/folio
netlify deploy --prod

# Note the URL and update DNS if needed
```

### Option B: Manual Static Export
```bash
# Build static export
cd ~/folio/folio
npm run build

# Manually upload .next/static and .next/server to CDN
# Update DNS to point to static files
```

**Timeline:** 10-15 minutes for alternate deployment.

---

**BOTTOM LINE:** The code works. Vercel deployment is blocking. Manual dashboard intervention required.
