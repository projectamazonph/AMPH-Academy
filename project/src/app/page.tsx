import Link from "next/link";
import {
  ChartLine,
  Target,
  Trophy,
  CheckCircle,
  GraduationCap,
  Zap,
  Users,
  ArrowRight,
  Play,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export const dynamic = "force-dynamic";

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
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    name: "Bid Elevator",
    desc: "High-pressure bidding decisions using real market snapshots. Learn when to raise, lower, and hold.",
    scenarios: "10 scenarios",
    color: "#007EFF",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    name: "STR Triage Arena",
    desc: "Classify search terms against the clock. Expert scoring shows you exactly where to draw the line.",
    scenarios: "20 search terms",
    color: "#FFD700",
    icon: <Target className="w-6 h-6" />,
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
    badge: null,
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
    badge: "Most Popular",
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
    badge: null,
  },
];

const stats = [
  { stat: "83%", label: "of VA tasks can be automated", sub: "AI handles scheduling, email, data entry. Basic VA roles are shrinking." },
  { stat: "₱15k", label: "is the general VA ceiling", sub: "Admin and support work tops out at ₱20k — even after years." },
  { stat: "₱60k–₱80k", label: "is what PPC specialists charge", sub: "Per client, per month. The skill gap is the only thing keeping you low." },
  { stat: "₱40k+", label: "costs you every month you wait", sub: "A 3-month investment pays for itself in your first month at PPC rates." },
];

const gamification = [
  { num: "17", label: "Badges", icon: <Trophy className="w-6 h-6" /> },
  { num: "XP", label: "Leveling System", icon: <Zap className="w-6 h-6" /> },
  { num: "Streaks", label: "Daily Tracking", icon: <TrendingUp className="w-6 h-6" /> },
  { num: "Board", label: "Competitive", icon: <Users className="w-6 h-6" /> },
  { num: "Certs", label: "Verifiable", icon: <GraduationCap className="w-6 h-6" /> },
  { num: "11", label: "Dashboard Tabs", icon: <ChartLine className="w-6 h-6" /> },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/4 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-orange-border)] bg-[var(--color-orange-bg)] text-[var(--color-orange)] text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--color-orange)] animate-pulse" />
            AMPH Academy — Now Live with 8 Modules, 31 Lessons
          </div>
          
          {/* Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Still earning ₱15k/month?
            <br />
            <span className="text-[var(--color-orange)]">Other VAs are billing ₱60k–₱80k</span>
            <br />
            managing Amazon PPC.
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Same hours. Same internet. Different skill set.
            <br className="hidden sm:block" />
            AMPH Academy trains you to become a job-ready PPC specialist — not with videos you&apos;ll forget, 
            but with real campaigns, real tools, and a proven progression system.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="https://amph-academy.vercel.app"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] transition-all duration-200 shadow-lg shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30 hover:-translate-y-0.5"
            >
              Break the ₱15k Ceiling
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white/8 hover:bg-white/12 border border-white/10 transition-all duration-200"
            >
              <Play className="w-5 h-5" />
              See the Curriculum
            </Link>
          </div>
          
          {/* Trust line */}
          <p className="text-sm text-muted-foreground/50">
            Built by a 14-year VA · ₱50M+ managed ad spend · 8 modules · 31 lessons · 35+ scenarios
          </p>
        </div>
      </section>

      {/* THE GAP SECTION */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-tight"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            The income gap is a <span className="text-[var(--color-orange)]">skill gap</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((item) => (
              <div
                key={item.stat}
                className="bg-[var(--color-orange-bg)] border border-[var(--color-orange-border)] rounded-2xl p-6 md:p-8"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-orange)] leading-none mb-3">
                  {item.stat}
                </div>
                <div className="font-semibold text-base mb-3">{item.label}</div>
                <div className="text-sm text-muted-foreground/70 leading-relaxed">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold mb-12 tracking-tight"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Real results from real students
          </h2>
          
          <div className="space-y-5">
            {/* Testimonial 1 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <div className="text-5xl text-[var(--color-orange)] font-serif mb-4">"</div>
              <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                Two years doing calendar management. Thought that was just the ceiling. Took the course, 
                ran the sims, landed a US client in 6 weeks.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-orange)] flex items-center justify-center font-bold text-[var(--color-orange-dark)] text-lg">
                  M
                </div>
                <div>
                  <div className="font-semibold">Maria, Manila</div>
                  <div className="text-sm font-semibold text-green-accent">₱15k → ₱65k/month</div>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <div className="text-5xl text-[var(--color-orange)] font-serif mb-4">"</div>
              <p className="text-lg md:text-xl leading-relaxed mb-6 italic">
                Client asked if I knew Amazon ads. Said yes without thinking. Then panicked. Found AMPH Academy, 
                went through everything, and actually delivered.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white text-lg">
                  C
                </div>
                <div>
                  <div className="font-semibold">Carlos, Cebu</div>
                  <div className="text-sm font-semibold text-green-accent">₱18k → ₱80k/month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-cabinet)" }}
            >
              8 Modules. 31 Lessons. <span className="text-[var(--color-orange)]">Zero fluff.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/70">
              Every lesson built from real campaigns — not copied from Amazon&apos;s documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((m) => (
              <div
                key={m.num}
                className="bg-white/[0.04] border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:bg-white/[0.06] transition-colors"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[var(--color-orange)] rounded-r" />
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider">
                    Module {m.num}
                  </span>
                  <span className="text-xs text-muted-foreground/50 font-medium">{m.lessons} lessons</span>
                </div>
                <h3 className="text-base font-bold mb-2 leading-snug">{m.title}</h3>
                <p className="text-sm text-muted-foreground/60 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section id="tools" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-cabinet)" }}
            >
              Practice on <span className="text-[var(--color-orange)]">real data</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/70">
              Not quizzes. Not videos. Interactive tools that simulate actual PPC decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tools.map((t) => (
              <div
                key={t.name}
                className="bg-white/[0.04] border rounded-2xl p-8 relative transition-transform hover:-translate-y-1"
                style={{ borderColor: `${t.color}33` }}
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${t.color}20` }}
                >
                  <span style={{ color: t.color }}>{t.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3">{t.name}</h3>
                <p className="text-sm text-muted-foreground/70 leading-relaxed mb-5">{t.desc}</p>
                <span 
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-bold"
                  style={{ backgroundColor: `${t.color}20`, color: t.color }}
                >
                  {t.scenarios}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GAMIFICATION SECTION */}
      <section className="py-20 md:py-28 bg-[var(--color-orange-bg)]">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Track every step of your <span className="text-[#FFD700]">progress</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground/70 mb-12">
            Gamified progression keeps you consistent — badges, XP, streaks, and a leaderboard.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {gamification.map((item) => (
              <div
                key={item.label}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <div className="text-[#FFD700] mb-3 flex justify-center">{item.icon}</div>
                <div className="text-3xl font-extrabold text-[#FFD700] mb-2">{item.num}</div>
                <div className="text-xs text-muted-foreground/60 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4"
              style={{ fontFamily: "var(--font-cabinet)" }}
            >
              Choose your <span className="text-[var(--color-orange)]">path</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground/70">
              All tiers include full platform access. Pick based on how much support you need.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 relative ${
                  tier.accent 
                    ? "bg-[var(--color-orange-bg)] border-2 border-[var(--color-orange)]" 
                    : "bg-white/[0.04] border border-white/10"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-orange)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    {tier.badge}
                  </div>
                )}
                
                <div className="text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider mb-2">
                  {tier.name}
                </div>
                
                <div className="mb-2">
                  <span className="text-5xl font-extrabold">{tier.price}</span>
                  <span className="text-base text-muted-foreground/50 font-medium">{tier.period}</span>
                </div>
                
                <p className="text-sm text-muted-foreground/70 mb-6 leading-relaxed">{tier.desc}</p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground/90">{f}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={tier.href}
                  className={`block text-center py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
                    tier.accent
                      ? "bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)]"
                      : "bg-white/10 text-white hover:bg-white/15"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "var(--font-cabinet)" }}
          >
            Your next <span className="text-[var(--color-orange)]">client conversation</span> could be your last interview.
          </h2>
          <p className="text-lg text-muted-foreground/70 mb-10 leading-relaxed">
            AMPH Academy opens every Tuesday. The ₱15k ceiling doesn&apos;t lift itself.
          </p>
          <Link
            href="https://amph-academy.vercel.app"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-extrabold text-xl bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] transition-all duration-200 shadow-xl shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30 hover:-translate-y-0.5"
          >
            Start Free → Enroll Anytime
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a 
              href="https://facebook.com/projectamazonph" 
              className="text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a 
              href="https://youtube.com/@RyanRolandDabao" 
              className="text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a 
              href="https://ph.linkedin.com/in/ryandabao" 
              className="text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a 
              href="https://amph-academy.vercel.app" 
              className="text-sm text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            >
              AMPH Academy
            </a>
          </div>
          <p className="text-xs text-muted-foreground/30 text-center">
            © 2026 ProjectAmazonPH · Built by Ryan Roland Dabao · 14yr VA · ₱50M+ managed ad spend
          </p>
        </div>
      </footer>
    </main>
  );
}
