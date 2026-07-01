# Deploy to Vercel with CI/CD

- **ID:** STORY-003
- **Epic:** Foundation
- **Priority:** Must Have
- **Story Points:** 2
- **Status:** Not Started

## User Story

As a **developer**
I want to **deploy Adcraft Academy to Vercel with automatic deployments from GitHub**
So that **every merge to main branch is automatically built, migrated, and deployed to production**

## Acceptance Criteria

- [ ] Git repository initialized and pushed to GitHub (`github.com/projectamazonph/Adcraft-Academy`)
- [ ] Vercel project created connected to GitHub repo
- [ ] Vercel auto-deploy enabled for main branch (and preview deployments for feature branches)
- [ ] Environment variables configured in Vercel dashboard (DATABASE_URL, JWT_SECRET, etc.)
- [ ] Build command configured to run `prisma generate && prisma db push` during build
- [ ] Production deployment is green and accessible at `adcraft-academy.vercel.app`
- [ ] Home page loads successfully on production URL
- [ ] Preview deployments work for feature branches

## Technical Notes

### Implementation Approach
1. `git init && git add . && git commit -m "Initial scaffold"`
2. Create GitHub repo `projectamazonph/Adcraft-Academy`
3. `git remote add origin <url> && git push -u origin main`
4. In Vercel: Import GitHub repo, select Next.js framework preset
5. Configure env vars: `DATABASE_URL`, `JWT_SECRET`, `NEXT_PUBLIC_APP_URL`
6. Add build override: `npm run build` (with `prisma generate && prisma db push` as postinstall)
7. Deploy and verify

### Files/Modules Affected
- Root: `.gitignore`, `package.json` (build scripts)
- Vercel: Project settings (dashboard, not code)

### Data Model Changes
- None (schema from STORY-002 deployed via `prisma db push` in build step)

### Edge Cases
- **SQLite on Vercel:** SQLite file is ephemeral on Vercel's serverless runtime. Acceptable for MVP. Data persists within a single deployment; will be lost on redeploy. Mitigation: document that this is MVP-only and PostgreSQL migration is Sprint 2+.
- **Environment variable drift:** Sync `.env.example` with Vercel env vars.

## Dependencies

### Story Dependencies
- **Blocked by:** STORY-001 (must have a project to deploy)
- **Blocks:** None

## Testing Requirements

### Manual Testing
- [ ] Push to main triggers Vercel build
- [ ] Build completes without errors
- [ ] Production URL loads the home page
- [ ] Prisma Client generates during build

## Definition of Done

- [ ] GitHub repo created and pushed
- [ ] Vercel project connected and deployed
- [ ] Production URL is live
- [ ] Auto-deploy verified with a test commit
