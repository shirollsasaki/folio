
## Task 5: Clerk Authentication Setup

### Build failure: "supabaseUrl is required"
- **Symptom**: `npm run build` fails at "Collecting page data" with `Error: supabaseUrl is required`
- **Root cause**: `src/lib/supabase.ts` (created in previous task) initializes Supabase client at module level. `NEXT_PUBLIC_SUPABASE_URL` is empty in `.env.local`, causing `createClient('')` to throw.
- **Trigger**: My webhook route was the first API route to import `db.ts` → `supabase.ts`
- **Fix**: Changed top-level imports of `@/lib/db` and `@/lib/dodo` to dynamic imports inside the handler function. This defers initialization to request time, not module load time.
- **Future tasks**: Any API route importing `db.ts` should use dynamic imports or the env vars must be populated before running `npm run build`
