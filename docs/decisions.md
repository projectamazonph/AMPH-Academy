# Architecture Decision Records — AMPH Academy

---

## ADR-001: Next.js with App Router

**Status:** ✅ ACCEPTED

**Context:** Need interactive tools (Campaign Builder, Bid Elevator) alongside static content pages.

**Decision:** Next.js App Router for hybrid SSR + static content delivery.

**Consequences:**
- ✅ Interactive tools via client components
- ✅ Static course content via server components
- ✅ API routes for tool data

---

## ADR-002: Static JSON for Tool Fixtures

**Status:** ✅ ACCEPTED

**Context:** Tools need structured data (campaign templates, bid scenarios, search terms) that changes infrequently.

**Decision:** Store tool data as static JSON fixtures in `fixtures/` directory.

**Consequences:**
- ✅ No database queries for tool data
- ✅ Version-controlled content
- ✅ Easy to extend with new scenarios
