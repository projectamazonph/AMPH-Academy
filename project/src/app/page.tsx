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
  Flame,
  ShieldCheck,
  Brain,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export const dynamic = "force-dynamic";

const modules = [
  { num: 0, title: "Onboarding & Mindset", lessons: 3, desc: "Master the platform tools, set your financial goals, and adopt the high-value PPC specialist mindset." },
  { num: 1, title: "Foundations of Amazon PPC", lessons: 5, desc: "Learn the core mathematics of advertising: master CPC, ACoS, TACoS, and RoAS to speak the client's language fluently." },
  { num: 2, title: "Precision Keyword Research", lessons: 4, desc: "Master match types, search intent, research workflows, and negative matching to build highly targeted, profitable audiences." },
  { num: 3, title: "High-Converting Listing Optimization", lessons: 3, desc: "Analyze the anatomy of a converting listing, optimize listing quality scores, and design high-impact A+ Content layouts." },
  { num: 4, title: "Advanced Campaign Architecture", lessons: 4, desc: "Architect elite-level setups utilizing Sponsored Products, Sponsored Brands, and Sponsored Display for absolute coverage." },
  { num: 5, title: "Strategic Portfolio Management", lessons: 3, desc: "Deploy the standard 60/20/10/10 budget allocation, handle pacing, and implement aggressive seasonal campaign strategies." },
  { num: 6, title: "The Bidding Laboratory", lessons: 3, desc: "Master manual bidding strategies, calculate placement bid multipliers, and maintain control over budget utilization." },
  { num: 7, title: "Search Term Triage", lessons: 3, desc: "Analyze search term reports under pressure, eliminate ad waste, and isolate profitable new search terms systematically." },
  { num: 8, title: "Competitive Intelligence", lessons: 3, desc: "Leverage Amazon Brand Analytics, benchmark against competitor Share of Voice (SOV), and secure market dominance." },
];

const tools = [
  {
    name: "Campaign Builder",
    desc: "Build entire campaign structures — keywords, initial bids, and budgets — across 5 realistic product niches. Work with raw market data.",
    scenarios: "5 campaign packs included",
    color: "#FF6B35",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    name: "Bid Elevator",
    desc: "Simulate high-pressure bidding sessions using actual market snapshots. Learn precisely when to escalate, de-escalate, or hold your position.",
    scenarios: "10 live scenarios included",
    color: "#FF6B35",
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    name: "STR Triage Arena",
    desc: "Classify search terms against a ticking clock. Our expert grading system instantly highlights exactly where to trim spend or double down.",
    scenarios: "20 high-priority terms",
    color: "#FF6B35",
    icon: <Target className="w-6 h-6" />,
  },
];

const tiers = [
  {
    name: "PPC Foundations",
    price: "₱2,999",
    period: "/mo",
    desc: "All foundational lessons, core interactive tools, and progress tracking to begin your specialist transition.",
    features: [
      "Access to all 8 modules & 31 lessons",
      "Campaign Builder tool (all 5 niche packs)",
      "Bid Elevator tool (all 10 scenario packs)",
      "STR Triage Arena (all 20 search terms)",
      "17 gamified badges + XP tracking dashboard",
      "Official certificate upon final completion",
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
    desc: "The premier program. Includes direct peer community, structured 60-day path, and elite resource vaults.",
    features: [
      "Everything included in PPC Foundations",
      "Exclusive Certification Prep modules",
      "VIP Resource Library (calculators, templates, checklists)",
      "Weekly interactive live Q&A sessions",
      "PPC VA Income Accelerator Kit (₱8,000 value)",
      "6-Figure VA Business Playbook (₱25,000 value)",
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
    desc: "Intensive 1-on-1 mentorship with Coach Ryan. Personalized resume polish and direct client placement assistance.",
    features: [
      "Everything included in Accelerated Mastery",
      "4 private 1-on-1 strategic coaching sessions",
      "Custom resume & portfolio review & audit",
      "Direct partner agency and client placement support",
      "Elite PPC Specialist Authority Suite (₱50,000 value)",
      "Lifetime priority access to new module releases",
    ],
    cta: "Go Ultimate",
    href: "https://projectamazonph-courses.netlify.app",
    accent: false,
    badge: null,
  },
];

const stats = [
  { stat: "83%", label: "VA Tasks Automatable", sub: "Basic administrative chores like calendar management, data entry, and email handling are being rapidly replaced by AI agents. Basic VA wages are falling." },
  { stat: "₱15k", label: "The Admin Ceiling", sub: "Unspecialized general virtual assistants struggle to scale beyond ₱15,000 to ₱20,000 per month, even with multiple years of general experience." },
  { stat: "₱80k", label: "Specialist Premium", sub: "Certified Amazon PPC experts routinely bill between ₱60,000 and ₱80,000 per month, per client. The gap is purely a specialization gap." },
  { stat: "₱40k+", label: "Monthly Delay Cost", sub: "Each month you spend waiting or looking for basic general roles costs you over ₱40,000 in missed premium specialist billing opportunities." },
];

const gamification = [
  { num: "17", label: "Interactive Badges", icon: <Trophy className="w-6 h-6 text-[#FF6B35]" /> },
  { num: "XP", label: "Leveling System", icon: <Zap className="w-6 h-6 text-[#FF6B35]" /> },
  { num: "Streak", label: "Daily Consistency Tracker", icon: <TrendingUp className="w-6 h-6 text-[#FF6B35]" /> },
  { num: "Rank", label: "Active Leaderboard", icon: <Users className="w-6 h-6 text-[#FF6B35]" /> },
  { num: "Cert", label: "Verifiable Credential", icon: <GraduationCap className="w-6 h-6 text-[#FF6B35]" /> },
  { num: "11", label: "Comprehensive Dashboard Tabs", icon: <ChartLine className="w-6 h-6 text-[#FF6B35]" /> },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/4 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-orange-border)] bg-[var(--color-orange-bg)] text-[var(--color-orange)] text-sm font-semibold mb-8">
            <Flame className="w-4 h-4 text-[var(--color-orange)] animate-pulse" />
            The VA Industry is Splitting in Two. Choose Your Side.
          </div>
          
          {/* High-Impact Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-white">
            Still Stuck at ₱15k a Month?
            <br />
            <span className="text-[var(--color-orange)]">Master Amazon PPC</span>
            <br />
            and Bill ₱60k–₱80k.
          </h1>
          
          {/* Subheadline clarifying value-add */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
            Same working hours. Same internet connection. Completely different financial level.
            AI agents are aggressively automating basic VA jobs. AMPH Academy equips you with high-income,
            future-proof Amazon advertising skills using realistic interactive simulators, not boring slide-decks.
          </p>
          
          {/* Premium CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-lg bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] transition-all duration-200 shadow-lg shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30 hover:-translate-y-0.5"
            >
              Break the ₱15k Ceiling
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#curriculum"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200 text-white"
            >
              <Play className="w-5 h-5 text-muted-foreground" />
              Explore Curriculum
            </Link>
          </div>
          
          {/* Trust indicator */}
          <p className="text-sm text-muted-foreground/60 font-medium">
            Designed by an expert 14-year VA · ₱50M+ managed ad spend · 8 comprehensive modules · 31 simulated lessons
          </p>
        </div>
      </section>

      {/* CLINICAL URGENCY / GAP SECTION */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              The Reality of AI Automation: <span className="text-[var(--color-orange)]">Specialize or Shrink</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              AI tools can draft emails, organize calendars, and input spreadsheets. General admin tasks are rapidly being automated, lowering wages. The high-paying track belongs to PPC experts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item) => (
              <Card
                key={item.stat}
                className="hover:border-[var(--color-orange)]/40 transition-colors duration-200"
              >
                <CardHeader className="pb-2">
                  <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-orange)] leading-none mb-2">
                    {item.stat}
                  </div>
                  <CardTitle className="text-base font-bold text-[#1A1A2E] leading-snug">
                    {item.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#1A1A2E]/85 leading-relaxed">{item.sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PERSUASIVE VALUE PROP / SOCIAL PROOF */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Proven Transitions from Your Peers
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mt-4">
              Real virtual assistants who made the shift from general administrative work to high-demand advertising strategy.
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Testimonial 1 */}
            <Card className="hover:border-[var(--color-orange)]/40 transition-colors duration-200">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-orange-bg)] rounded-xl text-[var(--color-orange)] font-bold text-xl flex-shrink-0">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-[#1A1A2E] leading-relaxed italic mb-6">
                      &quot;I was doing calendar management and basic admin work for two years, thinking ₱15,000 per month was the absolute absolute VA ceiling. I took the courses at AMPH Academy, ran the interactive simulators, and successfully landed a US-based client in just six weeks.&quot;
                    </p>
                    <div className="flex justify-between items-center flex-wrap gap-2 border-t border-black/5 pt-4">
                      <div>
                        <div className="font-bold text-[#1A1A2E] text-base">Maria</div>
                        <div className="text-xs text-[#1A1A2E]/70 font-medium">Manila, PH</div>
                      </div>
                      <div className="bg-green-accent/15 text-[#28A745] font-bold text-sm px-3 py-1 rounded-full">
                        ₱15k &rarr; ₱65k/month
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card className="hover:border-[var(--color-orange)]/40 transition-colors duration-200">
              <CardContent className="pt-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--color-orange-bg)] rounded-xl text-[var(--color-orange)] font-bold text-xl flex-shrink-0">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-[#1A1A2E] leading-relaxed italic mb-6">
                      &quot;When an active client asked if I knew how to manage Amazon PPC ads, I said yes but panicked inside. Fortunately, I found AMPH Academy. I went through the entire interactive curriculum, practiced with realistic data banks, and delivered outstanding ad spend optimization immediately.&quot;
                    </p>
                    <div className="flex justify-between items-center flex-wrap gap-2 border-t border-black/5 pt-4">
                      <div>
                        <div className="font-bold text-[#1A1A2E] text-base">Carlos</div>
                        <div className="text-xs text-[#1A1A2E]/70 font-medium">Cebu, PH</div>
                      </div>
                      <div className="bg-green-accent/15 text-[#28A745] font-bold text-sm px-3 py-1 rounded-full">
                        ₱18k &rarr; ₱80k/month
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              8 Specialized Modules. 31 Dynamic Lessons. <span className="text-[var(--color-orange)]">Zero Fluff.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              Every lesson is built directly from real-world campaign data and optimized for job readiness. No filler theory.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((m) => (
              <Card
                key={m.num}
                className="hover:border-[var(--color-orange)]/40 transition-colors duration-200 flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider">
                      Module {m.num}
                    </span>
                    <span className="text-xs text-[#1A1A2E]/60 font-medium">{m.lessons} lessons</span>
                  </div>
                  <CardTitle className="text-lg font-bold text-[#1A1A2E] leading-snug">{m.title}</CardTitle>
                </CardHeader>
                <CardContent className="mt-auto">
                  <p className="text-sm text-[#1A1A2E]/80 leading-relaxed">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE PRACTICE TOOLS */}
      <section id="tools" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Stop Watching Videos. <span className="text-[var(--color-orange)]">Start Making Decisions.</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
              The only way to build job confidence is through hands-on interaction. AMPH Academy includes custom-coded interactive practice tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map((t) => (
              <Card
                key={t.name}
                className="hover:border-[var(--color-orange)]/40 transition-colors duration-200 flex flex-col justify-between"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-orange-bg)] text-[var(--color-orange)] mb-4">
                    {t.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-[#1A1A2E]">{t.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#1A1A2E]/85 leading-relaxed mb-6">{t.desc}</p>
                  <span className="inline-block px-3 py-1 bg-[var(--color-orange-bg)] text-[var(--color-orange)] rounded-full text-xs font-bold">
                    {t.scenarios}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GAMIFICATION & PROGRESS */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            Continuous Progress, <span className="text-[var(--color-orange)]">Gamified Motivation</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
            Stay consistent with verifiable daily progress dashboards, peer leaderboard metrics, skill badges, and official certifications.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {gamification.map((item) => (
              <Card
                key={item.label}
                className="hover:border-[var(--color-orange)]/40 transition-colors duration-200 flex flex-col items-center justify-center text-center p-6"
              >
                <CardHeader className="p-0 pb-3">
                  <div className="flex justify-center mb-1">{item.icon}</div>
                  <CardTitle className="text-2xl font-extrabold text-[var(--color-orange)]">{item.num}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-xs text-[#1A1A2E]/70 font-semibold leading-normal">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Select Your Specialization <span className="text-[var(--color-orange)]">Path</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the exact level of mentorship, coaching, and career support you need to scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl relative transition-all duration-200 ${
                  tier.accent 
                    ? "bg-[var(--color-orange-bg)] border-2 border-[var(--color-orange)] p-[2px]"
                    : "p-0"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-orange)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap z-10 shadow-lg">
                    {tier.badge}
                  </div>
                )}
                
                <Card className={`h-full border border-border/80 ${tier.accent ? "border-transparent bg-[#F5F5F5]" : "bg-[#F5F5F5]"}`}>
                  <CardHeader className="pb-4">
                    <div className="text-xs font-bold text-[var(--color-orange)] uppercase tracking-wider mb-2">
                      {tier.name}
                    </div>

                    <div className="mb-2 flex items-baseline">
                      <span className="text-4xl md:text-5xl font-extrabold text-[#1A1A2E]">{tier.price}</span>
                      <span className="text-sm text-[#1A1A2E]/60 font-medium ml-1">{tier.period}</span>
                    </div>

                    <p className="text-sm text-[#1A1A2E]/75 leading-relaxed mt-2 min-h-[40px]">{tier.desc}</p>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <ul className="space-y-3 border-t border-black/5 pt-4 mb-6">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <CheckCircle className="w-4 h-4 text-[#28A745] flex-shrink-0 mt-0.5" />
                          <span className="text-[#1A1A2E]/85">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter className="mt-auto">
                    <Link
                      href={tier.href}
                      className={`block w-full text-center py-4 px-6 rounded-xl font-bold text-base transition-all duration-200 ${
                        tier.accent
                          ? "bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] shadow-md shadow-[var(--color-orange)]/10"
                          : "bg-[#1A1A2E] text-white hover:bg-[#1A1A2E]/90"
                      }`}
                    >
                      {tier.cta}
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HIGH-CONVERTING CLOSING CALL TO ACTION */}
      <section className="py-24 md:py-32 bg-secondary/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white">
            Your Next Client Interview Could Be <span className="text-[var(--color-orange)]">Your Last.</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            The wage gap is purely a specialization gap. Break the ₱15k VA ceiling, master Amazon PPC, and command the premium compensation you deserve. Enrollments are open now.
          </p>
          <Link
            href="https://amph-academy.vercel.app"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-extrabold text-xl bg-[var(--color-orange)] text-white hover:bg-[var(--color-orange-dark)] transition-all duration-200 shadow-xl shadow-[var(--color-orange)]/20 hover:shadow-[var(--color-orange)]/30 hover:-translate-y-0.5"
          >
            Start Free &rarr; Enroll Anytime
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#0F0F1A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a 
              href="https://facebook.com/projectamazonph" 
              className="text-sm text-muted-foreground/60 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a 
              href="https://youtube.com/@RyanRolandDabao" 
              className="text-sm text-muted-foreground/60 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>
            <a 
              href="https://ph.linkedin.com/in/ryandabao" 
              className="text-sm text-muted-foreground/60 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a 
              href="https://amph-academy.vercel.app" 
              className="text-sm text-muted-foreground/60 hover:text-white transition-colors"
            >
              AMPH Academy Home
            </a>
          </div>
          <p className="text-xs text-muted-foreground/40 text-center leading-relaxed">
            © 2026 ProjectAmazonPH Academy · Designed for absolute professional excellence by Ryan Roland Dabao · 14yr Amazon PPC Specialist · ₱50M+ managed ad spend
          </p>
        </div>
      </footer>
    </main>
  );
}
