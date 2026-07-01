# User Registration and Login Flow

- **ID:** STORY-004
- **Epic:** Authentication
- **Priority:** Must Have
- **Story Points:** 5
- **Status:** Not Started

## User Story

As a **student**
I want to **register an account and log in with my email and password**
So that **I can access course content and track my progress**

## Acceptance Criteria

- [ ] Registration form: name, email, password (min 8 chars), confirm password
- [ ] Registration form validates input (valid email, matching passwords, password strength)
- [ ] Registration creates User in database with hashed password (bcrypt/argon2)
- [ ] Registration returns error if email already exists
- [ ] Login form: email, password
- [ ] Login validates credentials against database
- [ ] Successful login creates JWT session stored in HttpOnly cookie (24h expiry)
- [ ] Unauthorized users redirected to login page
- [ ] Logout clears session cookie
- [ ] Auth context/provider gives client components access to user state
- [ ] `verifySession()` server action returns current user or null
- [ ] Password reset "forgot password" (link only — backend in Sprint 2)

## Technical Notes

### Implementation Approach
1. Create `modules/auth/_types.ts` — User, Session, AuthResult types
2. Create `modules/auth/_actions.ts` — register, login, logout, getSession server actions
3. Create `modules/auth/_service.ts` — password hashing (bcrypt), JWT sign/verify (jose), session management
4. Create `modules/auth/_components.tsx` — LoginForm, RegisterForm client components
5. Create `app/(auth)/login/page.tsx` and `app/(auth)/register/page.tsx`
6. Create `components/auth/AuthProvider.tsx` — React context for auth state
7. Create `middleware.ts` — route protection (redirect to /login if unauthenticated)
8. Match JWT + cookie config from PPC Companion for future SSO compatibility

### Files/Modules Affected
- `modules/auth/_types.ts` — New
- `modules/auth/_actions.ts` — New (register, login, logout, getSession)
- `modules/auth/_service.ts` — New (hashPassword, verifyPassword, signJWT, verifyJWT)
- `modules/auth/_components.tsx` — New (LoginForm, RegisterForm)
- `app/(auth)/login/page.tsx` — New
- `app/(auth)/register/page.tsx` — New
- `components/auth/AuthProvider.tsx` — New
- `middleware.ts` — New
- `lib/utils.ts` — Add JWT constants
- `package.json` — Add bcrypt (or argon2), jose dependencies

### Data Model Changes
- Uses User and Session models from STORY-002

### Edge Cases
- **Rate limiting:** Not implemented in Sprint 1. Acceptable for MVP.
- **Session expiry:** 24 hours. Redirect to login on expiry.
- **Concurrent sessions:** Single session per user (logout invalidates all). Improve in Sprint 2.
- **Cookie security:** HttpOnly, Secure, SameSite=Lax in production. SameSite=Strict in development.

### Security Considerations
- Passwords hashed with bcrypt (cost factor 12)
- JWT signed with HS256 using env var `JWT_SECRET` (min 32 chars)
- No password logging anywhere
- Input sanitization against XSS
- Prisma parameterized queries (no SQL injection risk)

## Dependencies

### Story Dependencies
- **Blocked by:** STORY-001 (project scaffold), STORY-002 (User model)
- **Blocks:** STORY-005

## Testing Requirements

### Manual Testing
- [ ] Register a new user — success
- [ ] Register with existing email — error shown
- [ ] Register with invalid email — validation error
- [ ] Register with short password — validation error
- [ ] Login with valid credentials — session set, redirect to dashboard
- [ ] Login with wrong password — error shown
- [ ] Login with unregistered email — error shown
- [ ] Access protected route while logged out — redirect to login
- [ ] Logout — cookie cleared, redirect to home
- [ ] Session persists across page reload (within 24h)

## Definition of Done

- [ ] Registration working end-to-end
- [ ] Login/logout working end-to-end
- [ ] Session persistence verified
- [ ] Route protection works
- [ ] All error states handled gracefully
- [ ] Merged to main, deployed to Vercel
