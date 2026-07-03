# Architecture — AMPH Academy

## Directory Structure

```
AMPH-Academy/
├── project/                    ← Next.js application
│   ├── src/                    ← App Router pages, components, API
│   ├── docs/                   ← Project-level docs (README, conventions, deploy)
│   ├── fixtures/               ← JSON data (badges, quiz questions, tool packs)
│   ├── downloads/              ← Downloadable resources
│   └── hooks/                  ← Campaign hooks data
├── .omh/                       ← OMH planning artifacts
│   ├── plans/                  ← ralplan implementation plan
│   └── specs/                  ← Specification document
├── .github/workflows/          ← CI/CD pipeline
├── codegraphs/                 ← Dependency visualization
├── docs/                       ← Project-level documentation (new)
│   ├── architecture.md         ← This file
│   └── decisions.md            ← ADRs
├── AGENTS.md                    ← AI agent context
├── KANBAN.md                    ← Task board
├── TODO.md                      ← Active tasks
├── PRD.md                       ← Product requirements
├── DEV-PLAN.md                  ← Development plan
└── WORKLOG.md                   ← Session log
```

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| UI | Tailwind CSS + shadcn/ui |
| Database | SQLite via Prisma |
| Auth | JWT (jose) HttpOnly cookies |
| CI/CD | GitHub Actions → Vercel |
| Data (fixtures) | Static JSON for tools, quizzes, badges |
