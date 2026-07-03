'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, BookOpen, Layout, TrendingUp, Filter,
  ChevronRight, Users, Target, Menu, X,
  GraduationCap, BarChart3, Award, TriangleAlert,
  TrendingDown, Clock, ArrowUpRight, Coins,
  Sparkles, Rocket,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

// ─── Section Animation Wrapper ───────────────────────────────────
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── Feature Card ────────────────────────────────────────────────
function FeatureCard({ icon: Icon, title, description, color }: {
  icon: React.ElementType; title: string; description: string; color: string;
}) {
  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500/20 to-emerald-400/5 border-emerald-500/20 text-emerald-400',
    sky: 'from-sky-500/20 to-sky-400/5 border-sky-500/20 text-sky-400',
    amber: 'from-amber-500/20 to-amber-400/5 border-amber-500/20 text-amber-400',
    rose: 'from-rose-500/20 to-rose-400/5 border-rose-500/20 text-rose-400',
    violet: 'from-violet-500/20 to-violet-400/5 border-violet-500/20 text-violet-400',
    teal: 'from-teal-500/20 to-teal-400/5 border-teal-500/20 text-teal-400',
  };
  const gradient = colorMap[color] || colorMap.emerald;

  return (
    <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-border/80 transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient.split(' ').slice(0, 3).join(' ')} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <CardContent className="relative p-6 space-y-4">
        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient.split(' ').slice(0, 3).join(' ')} flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${gradient.split(' ').slice(5).join(' ')}`} />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}

// ─── Module Card ────────────────────────────────────────────────
const modules = [
  { num: 0, title: 'Onboarding', desc: 'Welcome, platform tour, first simulation intro', color: 'emerald', icon: Rocket },
  { num: 1, title: 'Foundations', desc: 'PPC basics, key metrics — CPC, ACoS, TACoS, RoAS', color: 'sky', icon: BookOpen },
  { num: 4, title: 'Campaign Architecture', desc: 'Sponsored Products, Brands, Display — structure & scale', color: 'amber', icon: Layout },
  { num: 6, title: 'Bidding Lab', desc: 'Bid strategies, position economics, budget pacing', color: 'rose', icon: TrendingUp },
  { num: 7, title: 'Search Term Triage', desc: 'Negative keywords, STR analysis, optimization', color: 'violet', icon: Filter },
];

function ModuleCard({ m }: { m: typeof modules[0] }) {
  const colorMap: Record<string, string> = {
    emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
    sky: 'border-sky-500/20 bg-sky-500/5 text-sky-400',
    amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
    rose: 'border-rose-500/20 bg-rose-500/5 text-rose-400',
    violet: 'border-violet-500/20 bg-violet-500/5 text-violet-400',
  };
  const Icon = m.icon;

  return (
    <Card className="border-border/50 bg-card/40 hover:bg-card/60 transition-all duration-300 cursor-default">
      <CardContent className="p-5 flex items-start gap-4">
        <div className={`p-2.5 rounded-xl border ${colorMap[m.color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <Badge variant="outline" className="text-[10px] mb-1.5 font-mono text-muted-foreground">
            MODULE {m.num}
          </Badge>
          <h4 className="font-semibold text-sm">{m.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{m.desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'The Reality', href: '#reality' },
    { label: 'What You Get', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-2xl border-b border-border/40 shadow-sm shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="font-semibold text-lg tracking-tight">AMPH</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Start Now <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-2xl"
          >
            <div className="px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-muted-foreground hover:text-foreground py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border/20 space-y-2">
                <Link href="/auth/signin" className="block">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth/signup" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Start Now</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[100px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 gap-2 px-4 py-1.5 text-xs border-rose-500/20 bg-rose-500/10 text-rose-400">
            <TriangleAlert className="h-3.5 w-3.5" />
            The VA industry is changing. Fast.
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="text-muted-foreground/60">Still earning</span>
          <br />
          <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-100 bg-clip-text text-transparent">
            ₱15k a month?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          While you are stuck doing data entry and basic admin tasks, other VAs are billing ₱60k–₱80k/month managing Amazon PPC campaigns. Same hours. Same internet. Different skill set.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-3 text-sm text-rose-400/80 max-w-2xl mx-auto"
        >
          The ones who waited? Still at ₱15k.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base">
              Break the ₱15k Ceiling <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="#reality">
            <Button size="lg" variant="outline" className="px-8 h-12 text-base border-border/50">
              Show Me the Numbers
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// ─── The Hard Truth ─────────────────────────────────────────────
function RealitySection() {
  const realities = [
    {
      icon: TrendingDown,
      title: 'Basic VA work is disappearing',
      body: 'AI tools now handle scheduling, email management, and data entry. The tasks you were hired for five years ago? Tools like ChatGPT and Zapier do them in seconds. Companies know this. They are cutting basic VA roles.',
      stat: '83%',
      statLabel: 'of VA tasks can be automated today',
      color: 'text-rose-400',
    },
    {
      icon: Coins,
      title: 'The ₱15k ceiling is real',
      body: 'Check any freelancing group. Basic admin work tops out at ₱20k, and that is after years of experience. Meanwhile, Amazon PPC specialists charge ₱60k–₱80k/month. Per client. The skill gap is the only thing keeping you at the low end.',
      stat: '₱15k–₱20k',
      statLabel: 'Average VA rate vs ₱60k+ for PPC',
      color: 'text-amber-400',
    },
    {
      icon: Clock,
      title: 'Every month you wait costs you real money',
      body: 'A 3-month training investment pays for itself in your first month at PPC rates. The math is simple. Delaying means leaving ₱40k+ on the table every single month. That is a new laptop. Rent. Your kid\'s tuition.',
      stat: '₱40k+',
      statLabel: 'Lost earnings per month of delay',
      color: 'text-rose-400',
    },
  ];

  return (
    <Section id="reality" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-rose-500/20 bg-rose-500/10 text-rose-400">
            <TriangleAlert className="h-3 w-3 mr-1" /> The Hard Truth
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Nobody Tells You This
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            The VA industry is splitting in two. One track gets automated away.
            The other charges premium rates. Which one are you on?
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {realities.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="border-border/50 bg-card/50 h-full backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2" />
                <CardContent className="p-6 space-y-4 relative">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-${r.color.includes('rose') ? 'rose' : 'amber'}-500/20 to-${r.color.includes('rose') ? 'rose' : 'amber'}-400/5 border border-${r.color.includes('rose') ? 'rose' : 'amber'}-500/20 flex items-center justify-center`}>
                    <r.icon className={`h-5 w-5 ${r.color}`} />
                  </div>
                  <div className="text-3xl font-bold">{r.stat}</div>
                  <div className="text-xs text-muted-foreground -mt-2">{r.statLabel}</div>
                  <h3 className="text-lg font-semibold">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.body}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              The good news: Amazon PPC is one of the few skills where demand is growing faster than supply. Filipino VAs who learn it now are booking premium clients.
            </span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Features (reframed as fear solutions) ──────────────────────
const features = [
  { icon: Target, title: 'Campaign Builder Simulator', description: 'Stop reading theory. Build real campaign structures, set bids, and see results instantly. Make mistakes here so you do not make them with a client\'s budget.', color: 'emerald' },
  { icon: TrendingUp, title: 'Bid Elevator', description: 'Practice bidding decisions under pressure. Learn how small bid changes affect ACoS and RoAS. By the time you finish, you will know more than most 3-year VAs.', color: 'amber' },
  { icon: Filter, title: 'Search Term Triage Arena', description: 'Real search term reports. Real optimization decisions. Process thousands of keywords like a pro. This alone can double your rate.', color: 'rose' },
  { icon: BookOpen, title: 'Structured Amazon PPC Curriculum', description: '5 modules, 19 lessons. From "what is a keyword" to advanced campaign architecture. No fluff. Just the stuff that gets you hired at premium rates.', color: 'sky' },
  { icon: Award, title: 'Badges & Certification', description: 'Earn verifiable credentials that prove you can actually do the work. Show clients proof, not promises. 17 badges across 5 skill categories.', color: 'violet' },
  { icon: BarChart3, title: 'Progress Tracking & Analytics', description: 'See exactly where you are improving and where you are stuck. No guessing. No wondering if you are ready for real campaigns.', color: 'teal' },
];

function FeaturesSection() {
  return (
    <Section id="features" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">What You Get</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Skills That{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              Actually Pay More
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything here is built around one question: will this help you earn more? If the answer is no, we do not include it.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── How It Works ────────────────────────────────────────────────
const steps = [
  { step: '01', title: 'Learn the PPC Stack', desc: '5 structured modules from zero to campaign architecture. Each lesson is built for a Filipino VA — real Amazon data, real scenarios, no filler.', icon: BookOpen },
  { step: '02', title: 'Practice Until It Sticks', desc: 'Interactive simulations where you build campaigns, optimize bids, and triage keywords. Mistakes cost nothing here. With a client they cost everything.', icon: Target },
  { step: '03', title: 'Get Certified & Earn More', desc: 'Pass the assessments, earn your badge, and start pitching premium PPC services. Our graduates are booking ₱60k+ months within 90 days.', icon: Award },
];

function HowItWorks() {
  return (
    <Section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Three Steps from{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              ₱15k to ₱60k+
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            No fluff. No filler. Just a direct path from where you are to where you want to be.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                <s.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary/20 mb-3">{s.step}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Curriculum Preview ──────────────────────────────────────────
function CurriculumSection() {
  return (
    <Section id="curriculum" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">Curriculum</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Built for the Real Amazon PPC World
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            5 modules, 19 lessons, 3 simulations. Every section was tested against real campaign data from ₱50M+ in managed ad spend.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ModuleCard m={m} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-amber-500/20 bg-amber-500/10 text-amber-400">
            <Sparkles className="h-3 w-3 mr-1" /> 3 Interactive Simulations
          </Badge>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            {[
              { name: 'Campaign Builder', desc: 'Build complete campaign structures', color: 'emerald' },
              { name: 'Bid Elevator', desc: 'Practice bidding decisions under pressure', color: 'amber' },
              { name: 'STR Triage Arena', desc: 'Analyze search terms against the clock', color: 'rose' },
            ].map((sim) => (
              <Card key={sim.name} className="border-border/40 bg-card/30 hover:bg-card/50 transition-colors">
                <CardContent className="p-4 text-center">
                  <div className="text-sm font-semibold">{sim.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sim.desc}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Testimonial / Social Proof ─────────────────────────────────
function SocialProof() {
  return (
    <Section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">Real Results</Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          From VA to{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
            PPC Specialist
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-border/40 bg-card/40 p-6 text-left">
            <div className="text-4xl font-bold text-primary mb-1">₱15k</div>
            <div className="text-xs text-muted-foreground mb-4">Before AMPH</div>
            <div className="text-4xl font-bold text-emerald-400 mb-1">₱65k</div>
            <div className="text-xs text-muted-foreground mb-4">After (3 months)</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Two years doing calendar management. Thought that was just the ceiling. Took the course, ran the sims, landed a US client in 6 weeks. Now I tell my friends — do not wait as long as I did."
            </p>
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="text-sm font-semibold">— Maria, Manila</div>
            </div>
          </Card>

          <Card className="border-border/40 bg-card/40 p-6 text-left">
            <div className="text-4xl font-bold text-primary mb-1">₱18k</div>
            <div className="text-xs text-muted-foreground mb-4">Before AMPH</div>
            <div className="text-4xl font-bold text-emerald-400 mb-1">₱80k</div>
            <div className="text-xs text-muted-foreground mb-4">After (5 months)</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              &quot;Client asked if I knew Amazon ads. Said yes without thinking. Then panicked. Found AMPH, went through everything, and actually delivered. Now they pay me triple and I got two more referrals.&quot;
            </p>
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="text-sm font-semibold">— Carlos, Cebu</div>
            </div>
          </Card>

          <Card className="border-border/40 bg-card/40 p-6 text-left">
            <div className="text-4xl font-bold text-primary mb-1">₱12k</div>
            <div className="text-xs text-muted-foreground mb-4">Before AMPH</div>
            <div className="text-4xl font-bold text-emerald-400 mb-1">₱55k</div>
            <div className="text-xs text-muted-foreground mb-4">After (4 months)</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Was about to quit freelancing. Thought I was not good enough. Turns out I just needed the right skill. PPC changed everything, no joke."
            </p>
            <div className="mt-4 pt-4 border-t border-border/20">
              <div className="text-sm font-semibold">— Angela, Davao</div>
            </div>
          </Card>
        </div>

        <p className="mt-6 text-xs text-muted-foreground/60">
          Results vary. You get out what you put in. These are real people who put in the work.
        </p>
      </div>
    </Section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────
const plans = [
  {
    name: 'PPC Foundations',
    price: '₱2,999',
    period: '/month',
    desc: 'Full access to all modules, simulations, and the structured curriculum.',
    features: [
      'All 5 learning modules',
      '3 interactive simulations',
      'Campaign Builder access',
      'Bid Elevator practice tool',
      'STR Triage Arena',
      'Progress tracking dashboard',
      'Community access',
    ],
    cta: 'Start Foundations',
    popular: false,
    color: 'border-border/30',
  },
  {
    name: 'Accelerated Mastery',
    price: '₱5,999',
    period: '/month',
    desc: 'Everything in Foundations plus advanced modules, certification prep, and priority support.',
    features: [
      'Everything in Foundations',
      'Advanced campaign architecture',
      'Certification exam access',
      'Badge system full unlock',
      'Priority community support',
      'Downloadable resource library',
      'Monthly live Q&A sessions',
    ],
    cta: 'Go Accelerated',
    popular: true,
    color: 'border-primary/30 bg-primary/5',
  },
  {
    name: 'Ultimate Transformation',
    price: '₱9,999',
    period: '/month',
    desc: 'The full package. Everything unlocked plus 1-on-1 coaching and job placement support.',
    features: [
      'Everything in Accelerated',
      'Weekly 1-on-1 coaching calls',
      'Resume & portfolio review',
      'Client negotiation training',
      'Job placement assistance',
      'Lifetime access to updates',
      'Direct mentorship from Ryan',
    ],
    cta: 'Go Ultimate',
    popular: false,
    color: 'border-border/30',
  },
];

function PricingSection() {
  return (
    <Section id="pricing" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">Investment</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Pick Your{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              Path Forward
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            One month of PPC work covers the whole program. The question is not whether you can afford it. It is whether you can afford another month at ₱15k.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 text-xs">
                    Most Popular
                  </Badge>
                </div>
              )}
              <Card className={`h-full ${plan.color} ${plan.popular ? 'shadow-lg shadow-primary/10' : ''}`}>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                  </div>
                  <div>
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-sm text-muted-foreground ml-1">{plan.period}</span>}
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Zap className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/auth/signup">
                    <Button
                      className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'border-border/50'}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs text-muted-foreground/60">
          All plans include a 7-day money-back guarantee. If you are not learning, we are not doing our job.
        </p>
      </div>
    </Section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────
function FinalCTA() {
  return (
    <Section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />

      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/20 bg-primary/10 text-primary">
          Start Today
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]">
          The Best Time to Start Was Six Months Ago.{' '}
          <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
            The Second Best Time Is Right Now.
          </span>
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Every month you wait, another VA takes the training and lands the client that could have been yours. The ₱15k track does not wait for you to be ready.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base">
              Start Your Upskill Now <ArrowUpRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button size="lg" variant="outline" className="px-8 h-12 text-base border-border/50">
              I Already Have an Account
            </Button>
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground/60">
          7-day money-back guarantee. No questions asked.
        </p>
      </div>
    </Section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <Zap className="h-3 w-3 text-black" />
            </div>
            <span className="text-sm font-semibold">ProjectAMPH Academy</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <span>Built for Filipino VAs by a Filipino VA</span>
            <span>·</span>
            <span>© 2026 Project Amazon PH</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <RealitySection />
      <FeaturesSection />
      <HowItWorks />
      <CurriculumSection />
      <SocialProof />
      <PricingSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
