# Product Requirements Document (PRD) — Adcraft Academy

- **Project Name:** Adcraft Academy
- **Document Version:** 1.0
- **Date:** 2026-07-02
- **Author:** Ryan Roland Dabao
- **Status:** Draft

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-02 | Ryan Dabao | Initial PRD — reconciled from Product Brief and existing project docs |

---

## Executive Summary

**Problem Statement:** Filipino virtual assistants complete foundational PPC training but hit a ceiling. They lack the advanced skills (bid optimization, portfolio strategy, agency-level reporting) and credentials needed to land ₱60k–₱80k+/month agency roles. Existing advanced training is either too expensive ($500–$2,000 Western courses) or too theoretical.

**Proposed Solution:** Adcraft Academy — an advanced Amazon advertising skills training platform combining live online classes, interactive practice tools (Campaign Builder, Bid Elevator, Search Term Triage), gamified progression, and a certification-to-placement pipeline. Built on Next.js with PPC Companion integration.

**Business Value:**
- Creates an up-sell path from PPC Companion (foundations → advanced specialization)
- Positions Ryan as the definitive authority (13yr VA + 8yr PPC) in the Philippine Amazon training market
- Generates recurring course revenue while raising the earning potential of Filipino VAs
- Strengthens the ProjectAmazonPH ecosystem (training → certification → placement)

**Success Metrics:**
- 60%+ module completion rate (vs. 10–15% industry average)
- 40%+ graduate job placement rate within 3 months
- Revenue-positive within 6 months

**Target Launch:** 6–8 weeks from project start (Sprint 3)

---

## 1. Project Overview

### Background

Ryan Dabao has spent 13 years as a virtual assistant and 8 years as an Amazon PPC specialist, managing over ₱50M in ad spend. Through PPC Companion (the foundational training platform) and ProjectAmazonPH (the brand and community), he has built an audience of Filipino VAs seeking to specialize in Amazon advertising. Adcraft Academy is the next logical tier — advanced training for those who have mastered the basics and are ready for agency-level roles.

### Current State

- PPC Companion delivers foundational PPC Manager training (Phases 1–6 complete)
- ProjectAmazonPH has a 15k+ Facebook community audience
- Existing "advanced" resources are scattered: YouTube, expensive Western courses, inconsistent local groups
- No structured platform exists that combines live classes, interactive tools, and job placement for the Philippine VA market
- Adcraft Academy scaffold exists (Next.js project structure) but no feature implementation

### Desired State

- Students enroll in structured advanced PPC curriculum
- They practice with interactive tools in a sandbox environment
- They earn badges and certificates as they progress
- Graduates get connected with partner agencies for placement
- The platform grows through word-of-mouth from placed graduates

### Stakeholders

| Stakeholder | Role | Interest | Influence |
|-------------|------|----------|-----------|
| Ryan Dabao | Product Owner / Instructor | Revenue, brand authority, student outcomes | High |
| PPC Companion Users | Existing student base | Advanced learning path continuation | Medium |
| Partner Agencies | Employer partners | Pipeline of trained specialists | Medium |
| Filipino VA Community | Target market | Career advancement | Low (indirect) |

---

## 2. Goals and Objectives

### Business Goals

1. Establish Adcraft Academy as the definitive advanced Amazon PPC training platform for Filipino VAs
2. Create a sustainable revenue stream through course enrollment (₱2,999–₱9,999 tiers)
3. Build agency partnerships to create a placement pipeline that validates the training

### User Goals

1. Acquire agency-ready Amazon PPC skills through structured learning and hands-on practice
2. Earn verifiable credentials (badges, certificates) that prove competence to employers
3. Land a higher-paying role (₱60k–₱80k+/month) through the placement pipeline

### Success Criteria

- MVP launched within 8 weeks with curriculum + Campaign Builder + badges
- 100+ enrolled students in first 3 months
- 5+ agency partnerships established within 6 months
- Revenue-positive within 6 months
- Student NPS > 50

---

## 3. User Personas

### Primary Persona: Maria — The PPC Companion Grad

**Demographics:**
- Filipino VA, 1–3 years experience, ₱15k–₱30k/month current income
- Completed PPC Companion foundations training
- Working from home, has basic PPC knowledge but limited hands-on experience
- Has a laptop and stable internet connection

**Goals:**
- Move from ₱20k/month to ₱60k+/month by specializing in Amazon PPC
- Get a certificate she can show agencies to prove her skills
- Practice with real campaign scenarios before touching live accounts

**Pain Points:**
- Knows PPC theory but has never built a real campaign structure
- Doesn't know how to prove her skills to agencies beyond saying "I took a course"
- Current online classes are too expensive or not tailored to the Philippine market
- Fear of making expensive mistakes on real client accounts

**Behaviors:**
- Active in VA Facebook groups
- Has taken online courses before (PPC Companion, some free courses)
- Willing to invest ₱3k–₱10k in training if it leads to better income
- Prefers evening/weekend learning (daytime client work)

### Secondary Persona: Juan — The Experienced Specialist

**Demographics:**
- PPC Specialist, 1–2 years managing ₱50k–₱100k/month ad spend
- ₱40k–₱60k/month current income
- Already has live campaign experience but wants formal credentials and advanced techniques

**Goals:**
- Get certified to command ₱80k+/month agency or direct-client roles
- Master advanced strategies: portfolio bidding, placement optimization, competitive intelligence
- Join a network that connects him with better opportunities

**Pain Points:**
- No formal credentials to show prospective employers
- Knows "what works" but lacks structured understanding of why
- Hitting a knowledge plateau — self-study no longer enough
- Wants agency connections but doesn't know where to start

---

## 4. Functional Requirements

### FR-001: Course Curriculum with Live Classes [MUST]

**Description:**
The platform shall deliver structured advanced PPC course modules viewable by enrolled students. Each module includes pre-recorded content, scheduled live class sessions (via external link integration), and downloadable resources.

**Acceptance Criteria:**
- Admin can create, edit, and reorder modules in a curriculum tree
- Each module has: title, description, video/content URL, live session schedule, resource attachments
- Students see a progression path — modules unlock sequentially
- Live class schedule shows upcoming sessions with timezone-aware display (PH time)
- Students receive enrollment confirmation and module notifications

**Priority:** Critical
**Related Epic:** EPIC-001 (Course Delivery)

---

### FR-002: Interactive Campaign Builder [MUST]

**Description:**
An interactive tool that lets students practice building Amazon campaign structures (Sponsored Products, Sponsored Brands, Sponsored Display) in a sandbox environment. Reuse components from PPC Companion's Campaign Builder where feasible.

**Acceptance Criteria:**
- Student can create a campaign from scratch: set name, targeting type, budget, bidding strategy
- Student can add ad groups with keywords and product targeting
- Student can set bid adjustments by placement, demographics, and schedule
- Tool validates the campaign structure and provides feedback on completeness
- Campaign structure can be exported as a reference PDF
- No real Amazon API calls — all logic is client-side simulation

**Priority:** Critical
**Related Epic:** EPIC-002 (Interactive Tools)

---

### FR-003: Interactive Bid Elevator [MUST]

**Description:**
A bid optimization practice tool that presents realistic bidding scenarios and lets students practice making bid adjustments. Shows the impact of decisions on spend, impressions, and estimated conversions.

**Acceptance Criteria:**
- Tool presents a scenario with campaign metrics (impressions, clicks, spend, ACoS, ROAS)
- Student can adjust bids at campaign, ad group, and keyword level
- Tool calculates and displays the projected impact of bid changes
- Scenarios range from simple (single keyword) to complex (portfolio with multiple ad groups)
- Performance feedback is shown after each decision round

**Priority:** High
**Related Epic:** EPIC-002 (Interactive Tools)

---

### FR-004: Search Term Triage Tool [MUST]

**Description:**
A keyword analysis practice tool where students classify search terms, identify negative keywords, and find expansion opportunities. Develops the analytical eye that separates junior from senior optimizers.

**Acceptance Criteria:**
- Tool presents a search term report with metrics (impressions, clicks, spend, sales, ACoS)
- Student can tag terms: add as keyword, add as negative exact, add as negative phrase, or take no action
- Tool scores the student's decisions against an "expert answer" for each scenario
- Multiple difficulty levels: beginner (clear-cut terms) to advanced (ambiguous edge cases)
- Session history shows improvement over time

**Priority:** High
**Related Epic:** EPIC-002 (Interactive Tools)

---

### FR-005: Badge and Achievement System [SHOULD]

**Description:**
A gamified badge system that rewards students for completing modules, achieving scores on tools, and reaching milestones. Uses PPC Companion's badge system as reference for implementation.

**Acceptance Criteria:**
- Badges are awarded automatically when criteria met
- Students see their badge collection on their profile
- Each badge has a name, icon, description, and unlock criteria
- Shareable badges (via image download or link) for social proof
- Badge criteria include: module completion, tool proficiency scores, quiz passing, streak milestones

**Priority:** Medium
**Related Epic:** EPIC-003 (Engagement)

---

### FR-006: Progress Tracking and Dashboard [MUST]

**Description:**
A student dashboard showing overall progress through the curriculum, completed modules, earned badges, tool performance scores, and upcoming live classes.

**Acceptance Criteria:**
- Dashboard displays: overall completion %, modules completed/total, badges earned, next action
- Each module shows its internal lesson completion status
- Tool usage history shows performance trends
- Live class calendar shows upcoming and past sessions
- Admin can view aggregate progress data across all students

**Priority:** Critical
**Related Epic:** EPIC-001 (Course Delivery)

---

### FR-007: Certificate Generation [MUST]

**Description:**
Students who complete all required modules and pass assessments receive a verifiable certificate of completion that can be shared with employers and agencies.

**Acceptance Criteria:**
- Certificate is generated automatically upon meeting all completion criteria
- Certificate includes: student name, course name, completion date, certificate ID
- Certificate can be downloaded as PDF
- Certificate ID is verifiable (QR code or unique URL)
- Admin can revoke and regenerate certificates if needed

**Priority:** High
**Related Epic:** EPIC-001 (Course Delivery)

---

### FR-008: PPC Companion Integration [MUST]

**Description:**
Adcraft Academy must integrate with the existing PPC Companion platform for shared authentication (SSO), enabling users to navigate between platforms seamlessly.

**Acceptance Criteria:**
- Users authenticated in PPC Companion can access Adcraft Academy without re-login
- User account data (name, email, enrollment status) syncs between platforms
- PPC Companion graduates see an "Advance to Adcraft" call-to-action in their dashboard
- Component reuse: Campaign Builder components shared where applicable
- Design system consistency: Project Aurora design tokens used across both platforms

**Priority:** Critical
**Related Epic:** EPIC-004 (Integration)

---

### FR-009: Quiz and Knowledge Checks [SHOULD]

**Description:**
Module-level quizzes that test student understanding before they can progress to the next module.

**Acceptance Criteria:**
- Each module has a quiz (5–10 questions) at the end
- Question types: multiple choice, true/false, scenario-based
- Passing score of 70% required to unlock next module
- Failed quizzes can be retaken (different question set each attempt)
- Results feed into the progress dashboard

**Priority:** Medium
**Related Epic:** EPIC-001 (Course Delivery)

---

### FR-010: Downloadable Resources Library [SHOULD]

**Description:**
A library of downloadable templates, checklists, and guides that students can use in their actual client work.

**Acceptance Criteria:**
- Admin can upload and categorize resources (templates, checklists, guides, frameworks)
- Resources are tagged by module for contextual relevance
- Students can browse, search, and download resources
- Download counts are tracked for popularity insights

**Priority:** Medium
**Related Epic:** EPIC-003 (Engagement)

---

## 5. Non-Functional Requirements

### Performance Requirements

#### NFR-001: Page Load Performance [MUST]

**Description:**
The application shall deliver fast page loads to maintain student engagement, especially for interactive tool sessions.

**Acceptance Criteria:**
- Initial page load completes within 2 seconds on a standard broadband connection (PH typical)
- Interactive tool operations respond within 500ms
- No full-page reloads on module navigation (client-side transitions)

**Measurement Method:** Lighthouse performance audit, RUM (Real User Monitoring)

---

#### NFR-002: Interactive Tool Responsiveness [MUST]

**Description:**
Interactive tools (Campaign Builder, Bid Elevator, Search Term Triage) must feel instantaneous to maintain the learning flow.

**Acceptance Criteria:**
- Tool state updates in < 500ms after user action
- Scenario loading completes in < 1 second
- No visible UI jank during tool interactions
- Tool state is preserved on page refresh (local storage or server save)

**Measurement Method:** Browser DevTools performance profiler

---

### Security Requirements

#### NFR-003: Authentication and Authorization [MUST]

**Description:**
User authentication shall use the same JWT-based system as PPC Companion (HttpOnly cookies with jose library).

**Acceptance Criteria:**
- All authenticated routes require valid JWT token
- JWT tokens are stored in HttpOnly cookies (XSS-safe)
- Session timeout after 24 hours of inactivity
- Role-based access: student, admin
- PPC Companion SSO token exchange is secure

**Compliance:** OWASP Top 10 (2021) A1–A7 covered

---

#### NFR-004: Data Privacy [MUST]

**Description:**
Student personal data must be stored and handled in compliance with the Philippine Data Privacy Act (RA 10173).

**Acceptance Criteria:**
- User data (name, email, progress) stored in encrypted database
- No personal data in client-side code or logs
- Data export available for users upon request
- Data deletion (right to be forgotten) workflow implemented
- Clear privacy policy and terms of use presented at registration

**Compliance:** RA 10173 (Philippine Data Privacy Act)

---

### Scalability Requirements

#### NFR-005: Concurrent Student Load [SHOULD]

**Description:**
The platform shall handle expected growth without performance degradation.

**Acceptance Criteria:**
- Supports 50 concurrent interactive tool sessions without lag
- Supports 200 registered students without query performance issues
- Database indexing optimized for progress and enrollment queries

**Load Profile:** 100–500 students in year one; peak concurrent usage during live classes (20–50 users)

---

### Usability Requirements

#### NFR-006: Mobile Responsiveness [SHOULD]

**Description:**
The platform shall be usable on mobile devices for course consumption (video watching, resource browsing) even if interactive tools are desktop-optimized.

**Acceptance Criteria:**
- Course content displays correctly on mobile screens (320px+)
- Video content plays on mobile
- Resources downloadable on mobile
- Interactive tools gracefully degrade (show "best on desktop" notice)

**Accessibility Standard:** WCAG 2.1 Level A

---

### Maintainability Requirements

#### NFR-007: Code Reusability with PPC Companion [MUST]

**Description:**
Components shared between Adcraft Academy and PPC Companion shall be reusable to minimize duplicate effort.

**Acceptance Criteria:**
- UI components (Button, Card, Navigation, Badge, Modal) use shared design tokens
- Campaign Builder logic is packaged as a reusable module
- Common utilities (auth, database helpers, API patterns) are shared via internal library
- Changes to shared components are backward-compatible

---

## 6. Epics and User Stories

### Epic 1: Course Delivery (EPIC-001)

**Epic ID:** EPIC-001
**Business Value:** Core value proposition — students come to learn. Without course delivery, nothing else matters.
**User Segments:** All students (Maria, Juan, and career-switchers)

**Success Metrics:**
- Module completion rate > 60%
- Average time per module < 2 weeks
- Course NPS > 50

**Related Requirements:** FR-001, FR-006, FR-007, FR-009, NFR-001, NFR-006

#### STORY-001: Browse and Enroll in Courses

```
As a Filipino VA looking to advance my PPC skills,
I want to browse available courses, see what they cover, and enroll,
so I can start my advanced training journey.
```

**Acceptance Criteria:**
- **Given** I am a visitor on Adcraft Academy,
  **when** I visit the course catalog page,
  **then** I see course titles, descriptions, and pricing.

- **Given** I am interested in a course shown in the catalog,
  **when** I click "Enroll" and complete payment,
  **then** my dashboard appears with my first module unlocked.

**Priority:** P1 (MVP)
**Estimate:** 3 story points

---

#### STORY-002: Navigate Module Curriculum

```
As an enrolled student,
I want to see my learning path with sequential modules,
so I know what to study next and what I've completed.
```

**Acceptance Criteria:**
- **Given** I am an enrolled student on my dashboard,
  **when** I view the curriculum,
  **then** I see a progression tree showing all modules with locked/completed/active status.

- **Given** I have completed module N,
  **when** I click on module N+1,
  **then** it unlocks and I can access its content.

**Priority:** P1 (MVP)
**Estimate:** 5 story points

---

#### STORY-003: Attend Live Class Session

```
As a student,
I want to see scheduled live class dates and join them,
so I can learn interactively with Ryan and other students.
```

**Acceptance Criteria:**
- **Given** I am on my dashboard,
  **when** I look at the schedule section,
  **then** I see upcoming live classes with dates and times (PH timezone).

- **Given** a live class is starting now,
  **when** I click "Join Class,"
  **then** I am redirected to the external meeting link (e.g., Zoom/Google Meet).

**Priority:** P1 (MVP)
**Estimate:** 3 story points

---

#### STORY-004: Earn Certificate on Completion

```
As a graduating student,
I want to receive a verifiable certificate when I finish all modules,
so I can prove my skills to agencies and employers.
```

**Acceptance Criteria:**
- **Given** I have completed all required modules and passed all quizzes,
  **when** I visit my dashboard,
  **then** I see a "Download Certificate" button.

- **Given** I click "Download Certificate,"
  **when** the PDF is generated,
  **then** it contains my name, course name, completion date, and a verifiable QR code.

**Priority:** P1 (MVP)
**Estimate:** 5 story points

---

### Epic 2: Interactive Practice Tools (EPIC-002)

**Epic ID:** EPIC-002
**Business Value:** The hands-on practice is what differentiates Adcraft from theory-only courses. Students build real skills without risking real ad spend.
**User Segments:** All students (especially Maria — needs practical experience)

**Success Metrics:**
- Tool usage frequency > 3 sessions per student per week
- Tool proficiency scores improve over time (tracked per student)
- Students report increased confidence in campaign management

**Related Requirements:** FR-002, FR-003, FR-004, NFR-002

#### STORY-005: Build a Campaign Structure

```
As a student,
I want to build a campaign from scratch using the Campaign Builder,
so I can practice campaign architecture in a risk-free environment.
```

**Acceptance Criteria:**
- **Given** I open the Campaign Builder tool,
  **when** I create a new campaign,
  **then** I can set name, type (SP/SB/SD), targeting, budget, and bidding strategy.

- **Given** I have created a campaign,
  **when** I add ad groups with keywords and product targeting,
  **then** the tool validates my structure and shows completeness score.

- **Given** I am satisfied with my campaign,
  **when** I export it,
  **then** I receive a PDF summary of my campaign structure.

**Priority:** P1 (MVP)
**Estimate:** 8 story points

---

#### STORY-006: Optimize Bids in Scenarios

```
As a student,
I want to practice bid adjustments in realistic scenarios,
so I can master bid optimization without spending real money.
```

**Acceptance Criteria:**
- **Given** I open the Bid Elevator tool,
  **when** a scenario loads,
  **then** I see campaign metrics and can adjust bids at multiple levels.

- **Given** I submit my bid adjustments,
  **when** the tool calculates projected impact,
  **then** I see how my changes affect spend, impressions, and conversions.

**Priority:** P2 (MVP)
**Estimate:** 8 story points

---

#### STORY-007: Triage Search Terms

```
As a student,
I want to classify search terms from a real-life report,
so I can develop the analytical skills for keyword optimization.
```

**Acceptance Criteria:**
- **Given** I open Search Term Triage,
  **when** a search term report loads,
  **then** I can tag each term as add/keyword, negative exact, negative phrase, or no action.

- **Given** I submit my classifications,
  **when** the tool scores them,
  **then** I see how my decisions compare to expert answers and learn from mistakes.

**Priority:** P2 (MVP)
**Estimate:** 8 story points

---

### Epic 3: Student Engagement (EPIC-003)

**Epic ID:** EPIC-003
**Business Value:** Retention and motivation — students who feel rewarded stay engaged and complete the program.
**User Segments:** All students (especially needed for self-paced learners)

**Success Metrics:**
- Badge earn rate > 2 badges per student in first month
- Resource download rate > 5 per student
- Module drop-off rate < 20%

**Related Requirements:** FR-005, FR-010

#### STORY-008: Earn Badges for Achievements

```
As a student,
I want to earn badges when I achieve milestones,
so I stay motivated and have shareable proof of my skills.
```

**Acceptance Criteria:**
- **Given** I complete a module or achieve a tool score threshold,
  **when** the milestone is met,
  **then** a badge appears in my collection with an animation/notification.

- **Given** I view my badge collection,
  **when** I click on a badge,
  **then** I see its name, icon, description, and unlock date.

**Priority:** P2 (MVP)
**Estimate:** 5 story points

---

### Epic 4: PPC Companion Integration (EPIC-004)

**Epic ID:** EPIC-004
**Business Value:** Creates a seamless student journey from foundations (PPC Companion) to advanced (Adcraft Academy). Reduces friction and increases enrollment conversion.
**User Segments:** PPC Companion graduates (Maria persona)

**Success Metrics:**
- SSO success rate > 99%
- PPC Companion → Adcraft enrollment conversion > 15%

**Related Requirements:** FR-008, NFR-003

#### STORY-009: Single Sign-On from PPC Companion

```
As a PPC Companion graduate,
I want to log into Adcraft Academy using my existing PPC Companion account,
so I don't have to create yet another account.
```

**Acceptance Criteria:**
- **Given** I am logged into PPC Companion,
  **when** I click "Advance to Adcraft,"
  **then** I am redirected to Adcraft Academy and automatically authenticated.

- **Given** I visit Adcraft Academy directly,
  **when** I click "Login,"
  **then** I can use my PPC Companion credentials via SSO.

**Priority:** P1 (MVP)
**Estimate:** 5 story points

---

## 7. Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Baseline | Target | Measurement Method | Frequency |
|--------|----------|--------|-------------------|-----------|
| Module Completion Rate | 10–15% (industry avg) | 60%+ | Platform analytics — students who enroll vs. complete | Weekly |
| Job Placement Rate | N/A | 40%+ within 3 months | Post-certification surveys, agency partner reports | Quarterly |
| Course Revenue | N/A | Revenue-positive by month 6 | Payment processor reports | Monthly |
| Student NPS | N/A | 50+ | In-platform survey after module 3 | Continuous |
| Interactive Tool Usage | N/A | 3+ sessions/student/week | Platform analytics | Weekly |
| Badge Earn Rate | N/A | 2+ badges/student in month 1 | Platform analytics | Monthly |

### Business Metrics
- Monthly recurring revenue trajectory
- Customer acquisition cost (via Facebook/community)
- Agency partner count (5+ within 6 months)
- Referral rate from placed graduates

### User Metrics
- Average time to complete the program
- Module drop-off rate (identify hardest modules)
- Tool proficiency score improvement over time
- Certificate download rate

### Technical Metrics
- Page load time (target < 2s)
- Tool response time (target < 500ms)
- Uptime (target 99.9%)
- Error rate (target < 0.1% of page views)

---

## 8. Assumptions and Dependencies

### Assumptions

1. PPC Companion graduates are willing to pay ₱3k–₱10k for advanced training
2. Agencies are actively hiring trained PPC specialists
3. Interactive tools provide sufficient value without AI-powered features
4. Live classes (via external meeting link) create enough accountability to drive completion
5. The existing ProjectAmazonPH Facebook community (15k+) will drive initial enrollment
6. Students have access to a laptop/desktop for interactive tool use

### Dependencies

| Dependency | Type | Owner | Status | Risk Level | Mitigation |
|------------|------|-------|--------|------------|------------|
| PPC Companion codebase | Internal | Ryan | Available | Low | Read access established |
| Project Aurora design system | Internal | Ryan | Available | Low | Components ready for reuse |
| Vercel deployment | External | Ryan | Available | Low | Existing account configured |
| Payment gateway | External | Ryan | Not configured | Medium | Standard merchant account setup |
| Agency partnerships | External | Ryan | Not started | High | Start outreach during development |
| Live class platform (Zoom/Meet) | External | Ryan | Available | Low | Personal account sufficient |

---

## 9. Constraints

### Technical Constraints
- **No budget for AI services** — interactive tools must be logic-based (no LLM-powered mentors or automated grading)
- **Must reuse PPC Companion components** — no building from scratch where shared components exist
- **Lightweight deployment** — Vercel-compatible; no dedicated server infrastructure
- **SQLite via Prisma** — same database pattern as PPC Companion for consistency (defer PostgreSQL unless needed)

### Business Constraints
- **Solo operation** — Ryan is the sole developer, instructor, and manager
- **No paid marketing** — launch distribution relies on existing community and word-of-mouth
- **Pricing must align with ProjectAmazonPH tiers** (₱2,999–₱9,999) for brand consistency

### Timeline Constraints
- **ASAP launch** — momentum risk is the #1 threat; must ship within 8 weeks
- **Live classes start immediately** — no waiting for full platform completion

---

## 10. Out of Scope

### Explicitly Excluded Features

1. **AI-powered mentors or automated coaching** — Requires budget that doesn't exist. Manual instruction via live classes instead.
2. **Community forum or social features** — Students have Facebook groups already. Not building an in-platform community.
3. **Agency-direct application portal** — Placement handled manually through Ryan's network and partnerships. Build this later if scale demands it.
4. **Native mobile app** — Mobile-responsive web is sufficient for course consumption. Interactive tools are desktop-focused.
5. **Real Amazon Ads API integration** — All tools are simulated. No live API calls to Amazon.
6. **Multi-language support** — English and Taglish during live classes. Platform UI in English only initially.

### Future Considerations
- AI-driven practice scenarios (requires budget)
- Direct agency application board
- Student community forum
- Advanced analytics for partner agencies
- Multi-language content (Tagalog modules)
- Tiered pricing with enterprise/agency plans

---

## 11. Release Planning

### Phase 1: MVP (Sprint 1–3 | Weeks 1–8)

**Core Features — what ships first:**
- Course curriculum with sequential modules and content delivery
- Campaign Builder interactive tool (reuse from PPC Companion)
- Progress tracking dashboard
- Badge system for module completion
- Certificate generation (PDF with verification)
- PPC Companion SSO integration
- Quiz system for module gating

**Success Criteria:**
- A student can enroll, complete a course, and earn a certificate
- Campaign Builder works as a standalone practice tool
- SSO between PPC Companion and Adcraft works end-to-end

**Sprint Breakdown:**
- **Sprint 1** (Weeks 1–2): Database schema, auth/SSO, base UI scaffold, project structure
- **Sprint 2** (Weeks 3–5): Course delivery system, module content, Campaign Builder port
- **Sprint 3** (Weeks 6–8): Badges, certificates, quizzes, dashboard, deployment

---

### Phase 2: Enhancement (Weeks 9–16)

**Additional Features:**
- Bid Elevator tool
- Search Term Triage tool
- Downloadable resources library
- Student analytics dashboard for Ryan
- Email notification system (enrollment, module completion, live class reminders)

**Success Criteria:**
- All three interactive tools operational
- Students actively using tools 3+ times/week
- Email workflow reduces manual communication

---

### Phase 3: Scaling (Weeks 17–24)

**Growth Features:**
- Agency partnership portal (basic)
- Advanced analytics (student cohort performance, placement tracking)
- Content expansion (additional modules based on student feedback)
- Performance optimization based on real usage data

**Success Criteria:**
- 100+ enrolled students
- 5+ active agency partners
- Revenue-positive operations

---

## 12. Risks and Mitigations

| Risk | Impact | Probability | Mitigation Strategy | Owner | Status |
|------|--------|-------------|---------------------|-------|--------|
| **Project loses momentum** (goes nowhere) | Critical | High | Ship MVP in 8 weeks. Weekly sprint cadence. One-person operation = no coordination overhead. | Ryan | Active |
| **Low enrollment** | High | Medium | Launch to existing 15k+ Facebook community. Offer launch discount. Leverage PPC Companion user base. | Ryan | Active |
| **Students don't complete** | Medium | High | Gamification (badges), live classes (accountability), sequential module unlocking. Industry baseline is 10–15% — target 60% is aggressive. | Ryan | Active |
| **Agency partnerships fail** | Medium | Medium | Start outreach during development. Leverage Ryan's existing industry connections. Don't make placement a hard promise in MVP. | Ryan | Active |
| **Technical debt slows iteration** | Medium | Medium | Reuse PPC Companion patterns. Prisma migrations for schema. Component library consistency. | Ryan | Active |
| **Live class attendance drops** | Low | High | Record sessions for async viewing. Send reminders. Build community accountability. | Ryan | Monitor |

---

## 13. Traceability Matrix

| Requirement ID | Business Goal | Epic | User Story | Status |
|----------------|---------------|------|------------|--------|
| FR-001 | 1, 2 | EPIC-001 | STORY-001, STORY-002, STORY-003 | Planned |
| FR-002 | 1, 2 | EPIC-002 | STORY-005 | Planned |
| FR-003 | 1 | EPIC-002 | STORY-006 | Planned |
| FR-004 | 1 | EPIC-002 | STORY-007 | Planned |
| FR-005 | 1, 3 | EPIC-003 | STORY-008 | Planned |
| FR-006 | 1, 3 | EPIC-001 | STORY-002 | Planned |
| FR-007 | 2 | EPIC-001 | STORY-004 | Planned |
| FR-008 | 1, 2 | EPIC-004 | STORY-009 | Planned |
| FR-009 | 1 | EPIC-001 | — | Planned |
| FR-010 | 3 | EPIC-003 | — | Planned |
| NFR-001 | 3 | — | — | Planned |
| NFR-002 | 1 | — | — | Planned |
| NFR-003 | 2, 3 | EPIC-004 | STORY-009 | Planned |
| NFR-004 | 2, 3 | — | — | Planned |
| NFR-005 | 3 | — | — | Planned |
| NFR-006 | 3 | — | — | Planned |
| NFR-007 | 2 | — | — | Active |

---

## Appendix

### A. Glossary

| Term | Definition |
|------|------------|
| SP | Sponsored Products — Amazon ad type for individual product listings |
| SB | Sponsored Brands — Amazon ad type featuring brand logo and multiple products |
| SD | Sponsored Display — Amazon ad type for retargeting and cross-sell |
| ACoS | Advertising Cost of Sale — ad spend divided by attributed sales |
| ROAS | Return on Ad Spend — revenue divided by ad spend |
| SSO | Single Sign-On — shared authentication across platforms |
| NPS | Net Promoter Score — customer satisfaction metric (-100 to +100) |
| MVP | Minimum Viable Product — the smallest functional version for launch |
| SHALL | Normative verb indicating a mandatory requirement |

### B. References

1. **Product Brief: Adcraft Academy** — `docs/bmad/product-brief.md`
2. **PPC Companion Codebase** — `/storage/emulated/0/Hermes Projects/projects/ppc-companion/`
3. **Project Aurora Design System** — documented in PPC Companion AGENTS.md
4. **ProjectAmazonPH Brand Docs** — `/storage/emulated/0/Hermes Projects/projects/ProjectAmazonPH/`
5. **BMAD Workflow Status** — `bmad/workflow-status.yaml`

### C. Open Questions

- Pricing tier structure (₱2,999 single course vs. ₱9,999 full access?) → resolved in Product Brief as aligned with ProjectAmazonPH tiers
- Live class format and schedule (weekly? bi-weekly?) → Ryan's call based on content production capacity
- Agency partner initial outreach list → Ryan's existing network

---

**Document End**

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-07-02 | Ryan Dabao | Initial PRD — reconciled from Product Brief, interview findings, and existing project docs |
