# System Architecture: AMPH Academy

- **Document Version:** 1.0
- **Date:** 2026-07-02
- **Author:** Ryan Roland Dabao
- **Status:** Draft

---

## 1. System Overview

### Purpose

AMPH Academy is an advanced Amazon PPC training platform for Filipino VAs. It delivers structured courses, interactive practice tools (Campaign Builder, Bid Elevator, Search Term Triage), gamified progression (badges, progress tracking), and verifiable certificates — all integrated with PPC Companion via SSO.

### Scope

**In Scope:**
- Course curriculum delivery with live class scheduling
- Interactive practice tools (Campaign Builder, Bid Elevator, Search Term Triage)
- Badge and achievement system
- Progress tracking dashboard
- Certificate generation (PDF with QR verification)
- PPC Companion SSO integration
- Quiz system for module gating
- Downloadable resource library

**Out of Scope:**
- AI-powered mentors or feedback (no budget)
- Community forum or social features (Facebook groups already exist)
- Native mobile app (responsive web sufficient)
- Real Amazon Ads API integration (fully simulated)

### Architectural Drivers

1. **Solo operation** — architecture must minimize complexity. One developer = one brain. No microservices.
2. **Zero infrastructure budget** — Vercel + SQLite/Prisma. No Redis, no queues, no containers.
3. **PPC Companion reuse** — components, auth, and design tokens shared between platforms.
4. **Quick MVP** — 8-week target. Architecture must enable speed, not hinder it.
5. **Modularity for growth** — clean module boundaries so we can extract services later if needed without rewrite.

### Stakeholders

- **Students:** Filipino VAs seeking advanced PPC training
- **Ryan:** Solo developer, instructor, and operator
- **PPC Companion:** Sister platform requiring SSO integration

---

## 2. Architecture Pattern

### Selected Pattern: Modular Monolith

Not a "monolith" in the old sense — a **Next.js App Router project with feature-sliced modules** inside a single deployable unit.

```
amph-academy/
├── app/                    ← Next.js App Router (routes + pages)
│   ├── (auth)/             ← Auth-required layout group
│   ├── (public)/           ← Public pages (marketing, login)
│   ├── api/                ← API routes (server actions + route handlers)
│   └── layout.tsx
├── modules/                ← FEATURE MODULES (the heart of the architecture)
│   ├── auth/               ← Authentication + SSO
│   ├── courses/            ← Course curriculum + content delivery
│   ├── tools/              ← Campaign Builder, Bid Elevator, Search Term Triage
│   ├── badges/             ← Badge definitions, triggers, display
│   ├── progress/           ← Progress tracking + dashboard
│   ├── certificates/       ← Certificate generation + verification
│   ├── quizzes/            ← Quiz engine + scoring
│   └── resources/          ← Downloadable resource library
├── components/             ← Shared UI components (reused with PPC Companion)
├── lib/                    ← Shared utilities (db, auth helpers, types)
├── prisma/                 ← Database schema + migrations
└── public/                 ← Static assets
```

### Why This Pattern

| Constraint | How Modular Monolith Serves It |
|------------|-------------------------------|
| **Solo dev** | Single codebase, single deploy, no inter-service debugging |
| **No budget** | No containers, no orchestration, no queues — just Vercel |
| **PPC Companion reuse** | Shared `components/` and `lib/` as an internal package |
| **8-week MVP** | Add modules without infra overhead. Ship module by module |
| **Future growth** | Each module is a clear extraction boundary — lift to service when/if needed |

### Pattern Application

- **Module boundary:** Each `modules/<name>/` folder is self-contained — own types, hooks, server actions, and database queries.
- **Cross-module communication:** Through well-defined interfaces in `lib/` — NOT direct imports between modules.
- **Module A calls Module B:** Via shared service functions in `lib/services/` — not importing Module B's internals.
- **Database:** Single Prisma schema but grouped by module for clarity (comments + naming prefixes).

### Alternatives Considered

- **Full Microservices:** Rejected — solo dev, no ops budget, no team. Over-engineering for 500 users.
- **Serverless Functions per Module:** Rejected — Vercel's serverless functions ARE the platform. Next.js App Router handles routing. No need for separate function definitions.
- **BFF (Backend for Frontend):** Rejected — unnecessary layer. Next.js server actions + API routes are the BFF.

---

## 3. Component Design

### Component Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                             │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │   Student   │  │   Admin      │  │  PPC Comp.   │           │
│  │   Dashboard │  │   Dashboard  │  │  SSO Bridge  │           │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘           │
└─────────┼────────────────┼─────────────────┼────────────────────┘
          │                │                  │
          └────────────────┼──────────────────┘
                           │
┌──────────────────────────┼────────────────────────────────────────┐
│                    NEXT.JS APP ROUTER                             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │                   LAYER: ROUTES                           │    │
│  │  app/*.tsx — page.tsx, layout.tsx, loading.tsx, error.tsx│    │
│  │  app/api/* — route.ts for external API consumers         │    │
│  └──────────────────────────┬───────────────────────────────┘    │
│                             │                                     │
│  ┌──────────────────────────┼───────────────────────────────┐    │
│  │              LAYER: SERVER ACTIONS                       │    │
│  │  modules/*/_actions.ts — form handlers, data mutations   │    │
│  │  Each action is a module-exposed function                │    │
│  └──────────────────────────┬───────────────────────────────┘    │
│                             │                                     │
│  ┌──────────────────────────┼───────────────────────────────┐    │
│  │              LAYER: BUSINESS LOGIC                       │    │
│  │  modules/*/_service.ts — pure logic, validation, rules   │    │
│  │  lib/services/* — cross-module shared services           │    │
│  └──────────────────────────┬───────────────────────────────┘    │
│                             │                                     │
│  ┌──────────────────────────┼───────────────────────────────┐    │
│  │              LAYER: DATA ACCESS                          │    │
│  │  prisma/schema.prisma — single schema, module-grouped    │    │
│  │  lib/db.ts — Prisma client singleton                     │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

### Module Descriptions

#### Module: Auth (modules/auth/)

**Responsibility:** User authentication, session management, PPC Companion SSO.

**Key Files:**
- `_actions.ts` — login, register, logout, SSO token exchange
- `_service.ts` — JWT verification, password hashing, session validation
- `_types.ts` — User, Session, AuthResult

**Interfaces:**
- **Provides:** `verifySession()`, `getCurrentUser()`, `exchangeSSOToken()`
- **Requires:** Prisma User model, PPC Companion JWKS endpoint

**Data Owned:** User, Session

**NFRs Addressed:**
- NFR-003 (Security): JWT HttpOnly cookies, session timeout
- FR-008 (SSO): Token exchange with PPC Companion

---

#### Module: Courses (modules/courses/)

**Responsibility:** Curriculum tree, module content, video delivery, content progression.

**Key Files:**
- `_actions.ts` — enroll, markComplete, getModuleContent
- `_service.ts` — curriculum validation, module unlock logic
- `_types.ts` — Course, Module, Lesson, Enrollment

**Interfaces:**
- **Provides:** `getCurriculum()`, `getModule()`, `enrollStudent()`, `unlockNextModule()`
- **Requires:** Auth (identity), Progress (completion events)

**Data Owned:** Course, Module, Lesson, Enrollment, LiveClass

**NFRs Addressed:**
- NFR-001 (Performance): Static curriculum data, minimal queries
- NFR-006 (Mobile): Responsive video + content layout

---

#### Module: Tools (modules/tools/)

**Responsibility:** Campaign Builder, Bid Elevator, Search Term Triage — fully client-side interactive simulators.

**Key Files:**
- `campaign-builder/` — Builder component, scenario definitions, validation logic
- `bid-elevator/` — Bid simulation engine, scenario bank
- `search-term-triage/` — Term classification engine, scoring
- `_actions.ts` — save session results, load scenario data
- `_types.ts` — Scenario, ToolSession, Score

**Interfaces:**
- **Provides:** Tool components, scenario data, scoring functions
- **Requires:** Progress (save tool results), Badges (trigger on score milestones)

**Data Owned:** ToolSession, ScenarioResult

**Key Design Decisions:**
- All tool logic is **client-side**. No API calls. Scenarios are static JSON.
- Reuses Campaign Builder components from PPC Companion via shared component library.
- State preserved in localStorage + synced to server on save.

**NFRs Addressed:**
- NFR-002 (Tool Responsiveness): Client-side = instant feedback, no network latency
- NFR-005 (Scalability): Server handles only save/load — tool computation is zero-cost on backend

---

#### Module: Badges (modules/badges/)

**Responsibility:** Badge definitions, award triggers, display components.

**Key Files:**
- `_actions.ts` — checkAndAwardBadges(), getBadgeCollection()
- `_service.ts` — badge rule engine, trigger evaluation
- `_types.ts` — Badge, BadgeCriteria, BadgeAward

**Interfaces:**
- **Provides:** `evaluateTriggers()` (called by Courses/Tools/Quizzes after completion events)
- **Requires:** Progress (completion data), Courses (module completions), Tools (score milestones)

**Data Owned:** Badge, BadgeAward

**Design Decision:** Badge rules are evaluated on the server when a triggering action occurs (module complete, tool score threshold, etc.). Simple if-this-then-that logic — no event bus needed at this scale.

---

#### Module: Progress (modules/progress/)

**Responsibility:** Dashboard aggregation, completion tracking, learning path visualization.

**Key Files:**
- `_actions.ts` — getDashboardData(), updateProgress()
- `_service.ts` — progress calculation, aggregation queries
- `_types.ts` — DashboardData, ModuleProgress, ToolProgress

**Interfaces:**
- **Provides:** Dashboard data endpoint (consumed by dashboard page)
- **Requires:** Courses, Tools, Badges, Quizzes (aggregates from all modules)

**Data Owned:** ModuleProgress, ToolProgress (actually owned by each module, Progress queries across them)

**NFRs Addressed:**
- NFR-001 (Performance): Dashboard loads in <2s with batched queries

---

#### Module: Certificates (modules/certificates/)

**Responsibility:** Certificate generation, verification, PDF rendering.

**Key Files:**
- `_actions.ts` — generateCertificate(), verifyCertificate()
- `_service.ts` — PDF generation, QR code embedding, verification URL
- `_types.ts` — Certificate, CertificateVerification

**Interfaces:**
- **Provides:** `issueCertificate()` (called when all modules + quizzes complete), `verifyCertificateUrl()`
- **Requires:** Courses (completion data), Auth (student identity)

**Data Owned:** Certificate

**Design Decision:** PDFs are generated server-side on-demand, not pre-generated. Certificate IDs are UUIDs with a verification endpoint at `/verify/<id>`.

---

#### Module: Quizzes (modules/quizzes/)

**Responsibility:** Quiz definitions, question pools, scoring, retake logic.

**Key Files:**
- `_actions.ts` — submitQuiz(), getQuizQuestions()
- `_service.ts` — scoring engine, pass/fail logic, question randomization
- `_types.ts` — Quiz, Question, QuizAttempt

**Interfaces:**
- **Provides:** Quiz content, scoring, retake handling
- **Requires:** Courses (module association), Progress (completion events)

**Data Owned:** Quiz, Question, QuizAttempt

**Design Decision:** Questions are static data defined per module. Randomization is client-side from a pool of questions. Pass = 70%+. Different question set on retake.

---

## 4. Data Model

### Entity Relationship Diagram

```
┌──────────────────┐       ┌───────────────────┐
│      User        │       │    Enrollment      │
├──────────────────┤       ├───────────────────┤
│ id (String/PK)   │──┐    │ id (String/PK)    │
│ email (unique)   │  │    │ userId (FK)        │──┐
│ name             │  │    │ courseId (FK)      │  │
│ passwordHash     │  │    │ status             │  │
│ authProvider     │  │    │ enrolledAt         │  │
│ providerId       │  │    │ completedAt        │  │
│ createdAt        │  │    └────────┬──────────┘  │
│ updatedAt        │  │             │             │
└──────────────────┘  │             │             │
                      │             │             │
┌──────────────────┐  │  ┌──────────▼──────────┐  │
│     Course       │  │  │   ModuleProgress    │  │
├──────────────────┤  │  ├─────────────────────┤  │
│ id (String/PK)   │──┘  │ id (String/PK)      │  │
│ title            │     │ enrollmentId (FK)   │──┘
│ description      │     │ moduleId (FK)       │
│ slug (unique)    │     │ status              │
│ published        │     │ score (nullable)    │
│ createdAt        │     │ completedAt         │
└────────┬─────────┘     └─────────────────────┘
         │
         │ 1:N             ┌──────────────────┐
         │                 │     Module       │
         │                 ├──────────────────┤
         ├─────────────────│ id (String/PK)   │
         │                 │ courseId (FK)    │
         │                 │ title            │
         │                 │ order            │
         │                 │ videoUrl         │
         │                 │ contentBody      │
         │                 │ duration (min)   │
         │                 └────────┬─────────┘
         │                          │
         │ 1:N              ┌───────▼──────────┐
         │                  │   LiveClass      │
         │                  ├──────────────────┤
         │                  │ id (String/PK)   │
         │                  │ moduleId (FK)    │
         │                  │ title            │
         │                  │ scheduledAt      │
         │                  │ meetingUrl       │
         │                  └──────────────────┘

┌──────────────────┐       ┌───────────────────┐
│   ToolSession    │       │  ToolResult       │
├──────────────────┤       ├───────────────────┤
│ id (String/PK)   │──┐    │ id (String/PK)    │
│ userId (FK)      │  │    │ sessionId (FK)    │──┘
│ toolType         │  │    │ scenarioId        │
│ startedAt        │  │    │ score             │
│ completedAt      │  │    │ details (JSON)    │
└──────────────────┘  │    │ completedAt       │
                      │    └───────────────────┘
┌──────────────────┐  │
│   Badge          │  │
├──────────────────┤  │
│ id (String/PK)   │  │
│ slug (unique)    │  │
│ name             │  │
│ description      │  │
│ iconUrl          │  │
│ criteria (JSON)  │  │
└────────┬─────────┘  │
         │             │
┌────────▼─────────┐   │
│   BadgeAward     │   │
├──────────────────┤   │
│ id (String/PK)   │   │
│ userId (FK)      │───┘
│ badgeId (FK)     │
│ awardedAt        │
└──────────────────┘

┌──────────────────┐       ┌───────────────────┐
│    Certificate   │       │    QuizAttempt    │
├──────────────────┤       ├───────────────────┤
│ id (String/PK)   │       │ id (String/PK)    │
│ userId (FK)      │       │ userId (FK)       │
│ issuedAt         │       │ moduleId (FK)     │
│ verificationCode │       │ score             │
│ (unique)         │       │ passed            │
│ metadata (JSON)  │       │ answers (JSON)    │
└──────────────────┘       │ attemptedAt       │
                            └───────────────────┘

┌──────────────────┐
│   Resource       │
├──────────────────┤
│ id (String/PK)   │
│ moduleId (FK)    │ (nullable — global if null)
│ title            │
│ type             │
│ fileUrl          │
│ downloads (int)  │
│ createdAt        │
└──────────────────┘
```

### Entity Specifications

#### User
- **Purpose:** Student or admin account. Supports SSO from PPC Companion.
- `authProvider`: `"local"` | `"ppc-companion"` — enables dual-path auth
- `providerId`: The PPC Companion user ID for SSO mapping

#### Course / Module
- **Purpose:** Curriculum tree. Course contains ordered Modules.
- `Module.status`: `"locked"` | `"available"` | `"completed"` — determined by completion of previous module + quiz pass
- Scenarios for tools are stored as JSON in the module content or as separate seed data

#### ToolSession / ToolResult
- **Purpose:** Tracks practice tool usage. One session = one tool session. One session has many results (one per scenario attempted).
- `details`: JSON blob storing the student's full campaign/triage structure for review

#### BadgeAward
- **Purpose:** Records when a student earns a badge. Triggers evaluated during: module completion, tool score threshold, quiz passing streak.

### Data Storage Strategy

**Primary Database:** SQLite via Prisma (same as PPC Companion)

**Rationale:**
- Zero infrastructure — SQLite file lives with the app on Vercel
- Prisma provides type safety, migrations, and a clean schema
- Same stack as PPC Companion = shared patterns, faster development
- SQLite handles 100–500 students easily (our projected year-one scale)
- **If scale demands it later:** Prisma makes migration to PostgreSQL trivial — change the datasource, run a migration

**File Storage:** Vercel Blob (for videos, certificate PDFs, resource downloads) or direct public/ folder for assets

**Data Retention:** Student data retained for the duration of their access. Deletion available on request per RA 10173.

---

## 5. API Specifications

### API Design Approach

**Protocol:** Next.js Server Actions + Route Handlers
- **Server Actions** for form submissions and data mutations (`use server`)
- **Route Handlers** (`app/api/*`) for external consumption (certificate verification, SSO token endpoint)

**Authentication:** JWT in HttpOnly cookies (jose library, matching PPC Companion's approach)

### Key API Surfaces

#### Server Actions (Internal)

| Action | Module | Trigger | Description |
|--------|--------|---------|-------------|
| `login(email, password)` | Auth | Login form | Authenticate user, set session cookie |
| `ssoLogin(token)` | Auth | PPC Companion redirect | Exchange SSO token for local session |
| `enroll(courseId)` | Courses | Enroll button | Create enrollment, unlock first module |
| `completeModule(moduleId)` | Courses | "Mark Complete" | Record completion, unlock next module, trigger badge check |
| `submitQuiz(moduleId, answers)` | Quizzes | Quiz submission | Score quiz, determine pass/fail, update progress |
| `saveToolResult(sessionId, result)` | Tools | Tool "Save" | Persist tool session data |
| `claimBadge(badgeSlug)` | Badges | (auto-triggered) | Issue badge award if criteria met |
| `generateCertificate()` | Certificates | Completion page | Create certificate PDF, return download URL |

#### Route Handlers (External)

```
POST /api/auth/sso
  Purpose: PPC Companion SSO token exchange
  Body: { token: string }
  Response: { success: boolean, redirectUrl: string }

GET /api/verify/<code>
  Purpose: Certificate verification page (public)
  Response: Certificate details if valid, error if not

GET /api/certificates/<id>/download
  Purpose: Download certificate PDF
  Response: PDF binary
```

### API Security

- All Server Actions check authentication via `verifySession()` from Auth module
- Rate limiting via Vercel's built-in edge functions (future: add `@upstash/ratelimit` if needed)
- Input validation via Zod schemas (shared between client and server)
- No raw SQL — Prisma provides parameterized queries

---

## 6. Non-Functional Requirements Mapping

### NFR Coverage Matrix

| NFR ID | Category | Requirement | Architectural Decision | Status |
|--------|----------|-------------|----------------------|--------|
| NFR-001 | Performance | Page load < 2s, tool response < 500ms | Client-side tool logic, static curriculum data, Prisma query optimization | ✓ Addressed |
| NFR-002 | Performance | Tool responses < 500ms | All tool logic in client-side hooks. Zero network calls during tool use. | ✓ Addressed |
| NFR-003 | Security | JWT with HttpOnly cookies | Same approach as PPC Companion (jose library, HttpOnly cookies, 24h session) | ✓ Addressed |
| NFR-004 | Privacy | RA 10173 compliance | Encrypted DB, data export/deletion workflows, privacy policy | ✓ Addressed |
| NFR-005 | Scalability | 50 concurrent sessions, 500 students | SQLite handles this easily. Tools are client-side (zero server cost). | ✓ Addressed |
| NFR-006 | Usability | Mobile responsive | Tailwind responsive design, mobile-first course content | ✓ Addressed |
| NFR-007 | Maintainability | Shared components with PPC Companion | Shared `components/` and `lib/` as internal packages | ✓ Addressed |

### Detailed NFR Implementations

#### Performance (NFR-001, NFR-002)

**Requirement:** Pages load < 2s. Tool interactions < 500ms.

**Decisions:**
1. **Interactive tools are 100% client-side.** Scenarios are static JSON bundled with the app. No API calls during tool use. State saved to server only on explicit "save."
2. **Dashboard queries batched** via Prisma — single query with includes rather than N+1.
3. **Images and assets** served via Vercel Edge CDN (automatic with Vercel deployment).
4. **Module content** is server-rendered (RSC). Video embeds are lazy-loaded.

#### Security (NFR-003)

**Requirement:** JWT HttpOnly cookies matching PPC Companion.

**Decisions:**
1. Same `jose` library and cookie configuration as PPC Companion — reduces surface area for SSO bugs.
2. SSO token exchange uses a signed JWT from PPC Companion, verified by AMPH's Auth module using a shared secret (stored in environment variable).
3. All data mutations go through Server Actions (server-only — never exposed to client JS).

#### Privacy (NFR-004)

**Requirement:** Philippine Data Privacy Act (RA 10173) compliance.

**Decisions:**
1. Student data (name, email, progress) stored in SQLite. No third-party data sharing.
2. Data export: Server Action returns JSON dump of all student data.
3. Delete: Server Action cascades deletion across all related records.
4. Privacy policy and terms presented at enrollment.

#### Scalability (NFR-005)

**Requirement:** 50 concurrent sessions, 500 students year-one.

**Decisions:**
1. SQLite handles this easily — well-documented capability for thousands of concurrent readers.
2. Tools are client-side: 50 simultaneous students using Campaign Builder = zero server load for tool computation.
3. The modular monolith scales vertically on Vercel's Pro plan (automatic).
4. **Escape hatch:** If SQLite becomes a bottleneck (unlikely at this scale), Prisma migration to PostgreSQL is a one-line change.

---

## 7. Technology Stack

### Frontend
**Framework:** Next.js 16 (App Router)
**UI:** Tailwind CSS + shadcn/ui (Project Aurora components)
**State:** Zustand (client) + RSC (server)
**Animation:** Framer Motion (limited — only for badge awards, dashboard reveals)
**Icons:** Phosphor Icons (light weight, consistent stroke)

### Backend
**Runtime:** Next.js Server Actions + Route Handlers
**Auth:** jose (JWT), same library + pattern as PPC Companion
**Validation:** Zod (shared schemas client + server)
**No external API services** — all tool logic is client-side

### Database
**Primary:** SQLite via Prisma (v6)

### Infrastructure
**Hosting:** Vercel (Pro plan, existing account)
**Storage:** Vercel Blob or public/ directory
**SSO Secret:** Environment variable (shared with PPC Companion)
**No additional services** — no Redis, no queues, no containers

### Development & Deployment
**Version Control:** Git → GitHub (github.com/projectamazonph/AMPH-Academy)
**CI/CD:** Vercel auto-deploy from main branch
**Package Manager:** pnpm (or bun, matching PPC Companion)

---

## 8. Trade-off Analysis

### Trade-off 1: SQLite vs. PostgreSQL

**Decision:** Start with SQLite.

**Options:**
1. **SQLite:** Zero ops, single file, same as PPC Companion, handles 500 users easily.
2. **PostgreSQL:** Better for scale, concurrent writes, but requires managed database ($15+/mo) or self-hosting.

**Rationale:**
- Solo operation, zero budget, 500 users max year-one.
- SQLite on Vercel's serverless infrastructure handles 50 concurrent reads easily.
- Prisma migration to PG is `datasource` change + `prisma migrate` — zero code changes.

**Revisit Conditions:** When concurrent users > 200 or data volume > 500MB.

### Trade-off 2: Client-Side Tools vs. Server-Scored Tools

**Decision:** All tool logic is client-side. Server stores only results.

**Options:**
1. **Client-side:** Scenarios bundled as JSON. Logic runs in browser. Server stores only final scores.
2. **Server-side:** Scenarios on server. Each tool interaction requires an API call.

**Rationale:**
- Client-side = instant feedback, zero server cost, works offline-ish.
- Tools don't need AI or server-side validation — they're deterministic logic.
- Server storing only results means zero compute cost per tool session.

**Cost Accepted:** Student can theoretically game the scoring by inspecting client code. Acceptable for a training tool. Real skill is demonstrated in agency work, not tool scores.

### Trade-off 3: Feature Modules vs. Route-Based Organization

**Decision:** Feature module folders (`modules/<name>/`), not route-based grouping.

**Options:**
1. **Feature modules:** Group by domain (courses, tools, badges) — each module is a potential extraction boundary.
2. **Route-based:** Group by route pattern (`app/courses/`, `app/tools/`).

**Rationale:**
- Route-based works fine for small apps but creates tangled dependencies as features grow.
- Feature modules directly map to the extraction boundaries we'd use if we ever lift a module to a microservice.
- A `modules/tools/` folder contains everything Campaign Builder needs — I can extract it to `tools.projectamazonph.com` without untangling route-based cross-references.

**Revisit Conditions:** Never — feature modules are strictly better for modularity. Routes are just a thin presentation layer on top.

### Trade-off 4: Shared Component Library vs. Copy-Paste

**Decision:** Shared internal components between PPC Companion and AMPH Academy.

**Options:**
1. **Shared library:** Components in a common location, imported by both apps.
2. **Copy-paste:** Each app has its own copy of shared components.

**Rationale:**
- The user explicitly said "reuse components if possible."
- Both apps use the same tech stack (Next.js, Tailwind, shadcn/ui).
- Shared library = single fix propagates to both apps. Copy-paste = fix everything twice.
- At this scale, a shared components/ folder with clear ownership boundaries is sufficient — no need for a published npm package.

**Cost Accepted:** Changes to shared components must be tested against both apps. Mitigated by keeping shared components presentational (no business logic).

---

## 9. Deployment Architecture

### Environments

**Production:** Vercel — `amph-academy.vercel.app`
**Custom domain:** TBD (piggyback on projectamazonph.com domain strategy)

### Deployment Strategy

**Method:** Vercel auto-deploy from `main` branch.

**Process:**
1. Push to `main` on GitHub
2. Vercel builds and deploys automatically
3. Prisma migrations run via `vercel build` hook (`postinstall: prisma generate && prisma db push`)

**Rollback:** Vercel instant rollback to previous deployment (one click)

### Scaling Strategy

**Application:**
- Vercel automatically scales serverless functions
- Static pages served from CDN edge
- No manual scaling configuration needed

**Database:**
- SQLite on Vercel's ephemeral filesystem works for single-region read patterns
- **When PostgreSQL is needed:** Provision on Neon (free tier) or Supabase — connection string change only

---

## 10. Future Considerations

### Near Term (3–6 months)

- **Content expansion:** Add more modules, scenarios, and tool difficulty levels — no architectural change needed, just data.
- **Student analytics:** Aggregate progress data across all students — add a Prisma query in Progress module.

### Medium Term (6–12 months)

- **Payment integration:** Stripe/GCash for course enrollment — add Payments module, no change to existing modules.
- **PostgreSQL migration:** If SQLite becomes a bottleneck — change Prisma datasource, run migration. Zero code changes.
- **Agency partner portal:** Minimal — a public directory of graduates with their certificates. New module, no refactoring needed.

### Long Term (12+ months)

- **Module extraction:** If any module (e.g., Campaign Builder) needs independent scaling — lift `modules/tools/` to its own Next.js app with minimal refactoring. The module boundary was designed for this.
- **AI-powered feedback:** If budget materializes — add an AI service integration. New module `modules/ai-feedback/`, existing modules unchanged.

### Scalability Path

**From 500 to 5,000 students:**
1. SQLite → PostgreSQL (Prisma migration, connection string change)
2. Add edge caching for dashboard queries (Vercel KV if warranted)
3. Module extraction for tools if they need independent scaling

**From 5,000 to 50,000 students:**
1. Read replicas for PostgreSQL
2. Consider message queue for badge/certificate workflows
3. Evaluate microservice extraction for high-traffic modules

---

## Appendix

### Glossary

| Term | Definition |
|------|------------|
| Server Action | Next.js `"use server"` function — server-side data mutation called from the client |
| RSC | React Server Component — rendered on server, no client JS footprint |
| Module | Self-contained feature folder with own types, actions, services |
| SSO | Single Sign-On — shared authentication between PPC Companion and AMPH |
| Tool | Interactive practice simulator (Campaign Builder, Bid Elevator, Search Term Triage) |

### References

- PRD: `docs/bmad/prd.md`
- Product Brief: `docs/bmad/product-brief.md`
- UX Design: `docs/bmad/ux-design.md`
- DESIGN.md (Visual Design System): `docs/bmad/DESIGN.md`
- PPC Companion Codebase: `/storage/emulated/0/Hermes Projects/projects/ppc-companion/`

### Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-02 | Ryan Dabao | Initial architecture document — modular monolith, 8 feature modules, SQLite, Vercel |

---

**END OF DOCUMENT**
