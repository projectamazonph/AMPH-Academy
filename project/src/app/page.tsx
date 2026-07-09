import Link from "next/link";

const modules = [
  { num: 0, title: "Onboarding", lessons: 3, desc: "Platform setup, goals, and the PPC specialist mindset" },
  { num: 1, title: "Foundations — CPC, ACoS, TACoS, RoAS", lessons: 5, desc: "The language of Amazon advertising and how the money flows" },
  { num: 2, title: "Keyword Research", lessons: 4, desc: "Match types, workflow, negative keywords — build clean audiences" },
  { num: 3, title: "Listing Optimization", lessons: 3, desc: "Quality score, anatomy of a converting listing, A+ Content" },
  { num: 4, title: "Campaign Architecture", lessons: 4, desc: "Sponsored Products, Brands, and Display — when to use each" },
  { num: 5, title: "Portfolio Strategy", lessons: 3, desc: "60/20/10/10 allocation, pacing, and seasonal campaign handling" },
  { num: 6, title: "Bidding Lab", lessons: 3, desc: "Bidding strategies, position economics, and budget pacing decisions" },
  { num: 7, title: "Search Term Triage", lessons: 3, desc: "Negatives, STR analysis, and ongoing optimization routines" },
  { num: 8, title: "Competitive Intelligence", lessons: 3, desc: "Brand Analytics, SOV, and benchmarking against competitors" },
];

const tools = [
  {
    name: "Campaign Builder",
    desc: "Build complete campaign structures — keywords, bids, budgets — across 5 product niches. Real data, no theory.",
    scenarios: "5 packs",
    color: "#FF6B35",
  },
  {
    name: "Bid Elevator",
    desc: "High-pressure bidding decisions using real market snapshots. Learn when to raise, lower, and hold.",
    scenarios: "10 scenarios",
    color: "#007EFF",
  },
  {
    name: "STR Triage Arena",
    desc: "Classify search terms against the clock. Expert scoring shows you exactly where to draw the line.",
    scenarios: "20 search terms",
    color: "#FFD700",
  },
];

const tiers = [
  {
    name: "PPC Foundations",
    price: "₱2,999",
    period: "/mo",
    desc: "Everything you need to start your PPC specialist journey.",
    features: [
      "All 8 modules — 31 lessons",
      "Campaign Builder (all 5 packs)",
      "Bid Elevator (all 10 scenarios)",
      "STR Triage Arena (all 20 terms)",
      "17 badges + XP tracking",
      "Progress dashboard",
      "Certificate on completion",
    ],
    cta: "Start Foundations",
    href: "https://projectamazonph-courses.netlify.app",
    accent: false,
  },
  {
    name: "Accelerated Mastery",
    price: "₱5,999",
    period: "/mo",
    desc: "The flagship program. Coaching + community + structured 60-day path.",
    features: [
      "Everything in Foundations",
      "Certification prep modules",
      "Resource library (templates, checklists)",
      "Weekly live Q&A sessions",
      "PPC VA Income Accelerator Kit (₱8,000 value)",
      "6-Figure VA Business System (₱25,000 value)",
    ],
    cta: "Choose Accelerated",
    href: "https://projectamazonph-courses.netlify.app",
    accent: true,
  },
  {
    name: "Ultimate Transformation",
    price: "₱9,999",
    period: "/mo",
    desc: "1-on-1 with Coach Ryan. Resume review. Job placement support.",
    features: [
      "Everything in Accelerated",
      "4x 1-on-1 coaching sessions",
      "Personal resume + portfolio review",
      "Direct job placement support",
      "Elite PPC Specialist Authority Package (₱50,000 value)",
      "Priority access to new modules",
    ],
    cta: "Go Ultimate",
    href: "https://projectamazonph-courses.netlify.app",
    accent: false,
  },
];

export default function LandingPage() {
  return (
    <main style={{ background: "#1A1A2E", color: "#FFFFFF", fontFamily: "'Inter', system-ui, sans-serif", minHeight: "100vh" }}>

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <svg width="32" height="32" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="400" rx="40" fill="#FF6B35"/>
            <path d="M200 60 L320 320 L280 320 L240 240 L160 240 L120 320 L80 320 L200 60Z" fill="#1A1A2E"/>
            <rect x="155" y="195" width="22" height="55" rx="3" fill="#1A1A2E"/>
            <rect x="189" y="165" width="22" height="85" rx="3" fill="#1A1A2E"/>
            <rect x="223" y="135" width="22" height="115" rx="3" fill="#1A1A2E"/>
          </svg>
          <span style={{ fontWeight: 700, fontSize: "18px", letterSpacing: "-0.5px" }}>
            Project<span style={{ color: "#FF6B35" }}>AmazonPH</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px" }}>
          <a href="#curriculum" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Curriculum</a>
          <a href="#tools" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Tools</a>
          <a href="#pricing" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>Pricing</a>
          <a
            href="https://amph-academy.vercel.app"
            style={{
              background: "#FF6B35",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: 600,
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Open Academy
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ textAlign: "center", padding: "100px 24px 80px", maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,107,53,0.12)", border: "1px solid rgba(255,107,53,0.3)", borderRadius: "100px", padding: "6px 16px", fontSize: "13px", color: "#FF6B35", marginBottom: "28px", fontWeight: 500 }}>
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FF6B35", display: "inline-block" }} />
          AMPH Academy — Now Live with 8 Modules, 31 Lessons
        </div>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-2px", marginBottom: "24px" }}>
          Still earning ₱15k/month?<br />
          <span style={{ color: "#FF6B35" }}>Other VAs are billing ₱60k–₱80k</span><br />
          managing Amazon PPC.
        </h1>
        <p style={{ fontSize: "20px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "40px", maxWidth: "620px", margin: "0 auto 40px" }}>
          Same hours. Same internet. Different skill set.<br />
          AMPH Academy trains you to become a job-ready PPC specialist — not with videos you'll forget, but with real campaigns, real tools, and a proven progression system.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="https://amph-academy.vercel.app"
            style={{
              background: "#FF6B35",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "10px",
              fontWeight: 700,
              fontSize: "16px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Break the ₱15k Ceiling →
          </a>
          <a
            href="#curriculum"
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: "10px",
              fontWeight: 600,
              fontSize: "16px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            See the Curriculum
          </a>
        </div>
        <p style={{ marginTop: "20px", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
          Built by a 14-year VA · ₱50M+ managed ad spend · 8 modules · 31 lessons · 35+ scenarios
        </p>
      </section>

      {/* THE GAP */}
      <section style={{ padding: "80px 24px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, textAlign: "center", marginBottom: "48px", letterSpacing: "-1px" }}>
            The income gap is a <span style={{ color: "#FF6B35" }}>skill gap</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {[
              { stat: "83%", label: "of VA tasks can be automated", sub: "AI handles scheduling, email, data entry. Basic VA roles are shrinking." },
              { stat: "₱15k", label: "is the general VA ceiling", sub: "Admin and support work tops out at ₱20k — even after years." },
              { stat: "₱60k–₱80k", label: "is what PPC specialists charge", sub: "Per client, per month. The skill gap is the only thing keeping you low." },
              { stat: "₱40k+", label: "costs you every month you wait", sub: "A 3-month investment pays for itself in your first month at PPC rates." },
            ].map((item) => (
              <div key={item.stat} style={{ background: "rgba(255,107,53,0.06)", border: "1px solid rgba(255,107,53,0.2)", borderRadius: "12px", padding: "28px 24px" }}>
                <div style={{ fontSize: "40px", fontWeight: 800, color: "#FF6B35", lineHeight: 1, marginBottom: "8px" }}>{item.stat}</div>
                <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "8px" }}>{item.label}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "48px", letterSpacing: "-0.5px" }}>Real results from real students</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", textAlign: "left" }}>
              <div style={{ color: "#FF6B35", fontSize: "28px", marginBottom: "12px", fontWeight: 800 }}>"</div>
              <p style={{ fontSize: "18px", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
                Two years doing calendar management. Thought that was just the ceiling. Took the course, ran the sims, landed a US client in 6 weeks.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#FF6B35", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#1A1A2E" }}>M</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Maria, Manila</div>
                  <div style={{ fontSize: "13px", color: "#28A745", fontWeight: 600 }}>₱15k → ₱65k/month</div>
                </div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "32px", textAlign: "left" }}>
              <div style={{ color: "#FF6B35", fontSize: "28px", marginBottom: "12px", fontWeight: 800 }}>"</div>
              <p style={{ fontSize: "18px", lineHeight: 1.7, marginBottom: "20px", fontStyle: "italic" }}>
                Client asked if I knew Amazon ads. Said yes without thinking. Then panicked. Found AMPH Academy, went through everything, and actually delivered.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#007EFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff" }}>C</div>
                <div>
                  <div style={{ fontWeight: 600 }}>Carlos, Cebu</div>
                  <div style={{ fontSize: "13px", color: "#28A745", fontWeight: 600 }}>₱18k → ₱80k/month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "16px" }}>
              8 Modules. 31 Lessons. <span style={{ color: "#FF6B35" }}>Zero fluff.</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)" }}>
              Every lesson built from real campaigns — not copied from Amazon's documentation.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "12px" }}>
            {modules.map((m) => (
              <div
                key={m.num}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "#FF6B35", borderRadius: "0 2px 2px 0" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#FF6B35", letterSpacing: "1px", textTransform: "uppercase" }}>
                    Module {m.num}
                  </span>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{m.lessons} lessons</span>
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "8px", lineHeight: 1.3 }}>{m.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.5, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section id="tools" style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "16px" }}>
              Practice on <span style={{ color: "#FF6B35" }}>real data</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)" }}>
              Not quizzes. Not videos. Interactive tools that simulate actual PPC decisions.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {tools.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid ${t.color}33`,
                  borderRadius: "16px",
                  padding: "32px 28px",
                  position: "relative",
                }}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: `${t.color}20`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={t.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {t.name === "Campaign Builder" && <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>}
                    {t.name === "Bid Elevator" && <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>}
                    {t.name === "STR Triage Arena" && <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>}
                  </svg>
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "10px" }}>{t.name}</h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, marginBottom: "20px" }}>{t.desc}</p>
                <span style={{ display: "inline-block", background: `${t.color}20`, color: t.color, fontSize: "12px", fontWeight: 700, padding: "4px 10px", borderRadius: "100px" }}>
                  {t.scenarios}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAMIFICATION */}
      <section style={{ padding: "80px 24px", background: "rgba(255,215,0,0.04)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "16px" }}>
            Track every step of your <span style={{ color: "#FFD700" }}>progress</span>
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)", marginBottom: "48px" }}>
            Gamified progression keeps you consistent — badges, XP, streaks, and a leaderboard.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "16px" }}>
            {[
              { num: "17", label: "Badges" },
              { num: "XP", label: "Leveling System" },
              { num: "Streaks", label: "Daily Tracking" },
              { num: "Leaderboard", label: "Competitive" },
              { num: "Certs", label: "Verifiable" },
              { num: "11", label: "Dashboard Tabs" },
            ].map((item) => (
              <div key={item.label} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "24px 16px" }}>
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#FFD700", marginBottom: "6px" }}>{item.num}</div>
                <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 24px", background: "rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "16px" }}>
              Choose your <span style={{ color: "#FF6B35" }}>path</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.55)" }}>
              All tiers include full platform access. Pick based on how much support you need.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", alignItems: "start" }}>
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: tier.accent ? "rgba(255,107,53,0.08)" : "rgba(255,255,255,0.04)",
                  border: tier.accent ? "2px solid #FF6B35" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "20px",
                  padding: "36px 28px",
                  position: "relative",
                }}
              >
                {tier.accent && (
                  <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#FF6B35", color: "#fff", fontSize: "12px", fontWeight: 700, padding: "4px 16px", borderRadius: "100px", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#FF6B35", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>
                  {tier.name}
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <span style={{ fontSize: "44px", fontWeight: 800, color: "#fff" }}>{tier.price}</span>
                  <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{tier.period}</span>
                </div>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", marginBottom: "24px", lineHeight: 1.5 }}>{tier.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "grid", gap: "10px" }}>
                  {tier.features.map((f) => (
                    <li key={f} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#28A745" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.href}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: tier.accent ? "#FF6B35" : "rgba(255,255,255,0.1)",
                    color: "#fff",
                    padding: "14px 24px",
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "15px",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: "100px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: "20px" }}>
            Your next <span style={{ color: "#FF6B35" }}>client conversation</span> could be your last interview.
          </h2>
          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", marginBottom: "36px", lineHeight: 1.6 }}>
            AMPH Academy opens every Tuesday. The ₱15k ceiling doesn't lift itself.
          </p>
          <a
            href="https://amph-academy.vercel.app"
            style={{
              display: "inline-block",
              background: "#FF6B35",
              color: "#fff",
              padding: "18px 40px",
              borderRadius: "12px",
              fontWeight: 800,
              fontSize: "18px",
              textDecoration: "none",
            }}
          >
            Start Free → Enroll Anytime
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginBottom: "16px", flexWrap: "wrap" }}>
          <a href="https://facebook.com/projectamazonph" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>Facebook</a>
          <a href="https://youtube.com/@RyanRolandDabao" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>YouTube</a>
          <a href="https://ph.linkedin.com/in/ryandabao" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>LinkedIn</a>
          <a href="https://amph-academy.vercel.app" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "13px" }}>AMPH Academy</a>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>
          © 2026 ProjectAmazonPH · Built by Ryan Roland Dabao · 14yr VA · ₱50M+ managed ad spend
        </p>
      </footer>
    </main>
  );
}
