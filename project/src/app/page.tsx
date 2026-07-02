'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, BookOpen, Layout, TrendingUp, Filter,
  ChevronRight, Star, Shield, Users, Code2, Rocket,
 ArrowUpRight, Menu, X, CheckCircle2, PlayCircle,
 GraduationCap, BarChart3, Award,
 Sparkles, Target, Clock, MousePointerClick,
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

// ─── Stats Counter ───────────────────────────────────────────────
function Counter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-foreground">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
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

// ─── Module Card (for Curriculum) ────────────────────────────────
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
    { label: 'Features', href: '#features' },
    { label: 'Curriculum', href: '#curriculum' },
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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
              <Zap className="h-4 w-4 text-black" />
            </div>
            <span className="font-semibold text-lg tracking-tight">AdCraft</span>
          </Link>

          {/* Desktop nav */}
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

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                Get Started <ChevronRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
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
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-6 gap-2 px-4 py-1.5 text-xs border-primary/20 bg-primary/10 text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Master Amazon PPC Through Interactive Simulations
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          <span className="bg-gradient-to-r from-orange-300 via-amber-200 to-orange-100 bg-clip-text text-transparent">
            Command Your
          </span>
          <br />
          Amazon PPC Future
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Train hands-on with real-world simulations and master
          campaign architecture, bidding strategy, and search term optimization — all in one platform.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/signup">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-12 text-base">
              Start Learning Free <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="px-8 h-12 text-base border-border/50">
              Explore Features
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
        >
          <Counter end={5} suffix="" label="Learning Modules" />
          <Counter end={3} suffix="" label="Interactive Sims" />
          <Counter end={19} suffix="" label="Video Lessons" />
          <Counter end={3} suffix="" label="Interactive Simulations" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features ────────────────────────────────────────────────────
const features = [
  { icon: MousePointerClick, title: 'Interactive Simulations', description: 'Build campaigns, optimize bids, and triage search terms in a risk-free sandbox. Practice until you master it.', color: 'sky' },
  { icon: BookOpen, title: 'Structured Curriculum', description: '5 modules from foundations to advanced tactics. Bite-sized lessons with real Amazon PPC examples and data.', color: 'amber' },
  { icon: BarChart3, title: 'Real-time Analytics', description: 'Track your XP, completion rate, and weak areas. Leaderboards and personal dashboards keep you motivated.', color: 'rose' },
  { icon: Award, title: 'Gamification & Badges', description: '17 achievement badges across 5 categories. Earn XP, unlock rewards, and prove your PPC mastery.', color: 'violet' },
  { icon: GraduationCap, title: 'Certification', description: 'Earn verifiable certificates upon completion. Prove your Amazon PPC expertise to employers and clients.', color: 'teal' },
];

function FeaturesSection() {
  return (
    <Section id="features" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">Features</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              Master PPC
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From interactive simulations to structured curriculum — every tool is designed to
            turn theory into real-world skill.
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
  { step: '01', title: 'Learn', desc: 'Watch bite-sized lessons covering every aspect of Amazon PPC — from keyword basics to advanced bidding strategy.', icon: BookOpen },
  { step: '02', title: 'Practice', desc: 'Jump into interactive simulations. Build campaigns, adjust bids, and triage search terms with instant feedback.', icon: Target },
  { step: '03', title: 'Master', desc: 'Solidify your skills with quizzes and real-world scenarios. Earn badges and certification.', icon: Award },
];

function HowItWorks() {
  return (
    <Section className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">How It Works</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            From Zero to{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              PPC Pro
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A proven three-step path that takes you from complete beginner to confident Amazon PPC manager.
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
              {/* Connector line */}
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
            Structured Learning Path
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            5 modules, 19 lessons, 3 interactive simulations — designed to build your PPC expertise module by module.
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

        {/* Simulation preview */}
        <div className="mt-10 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-amber-500/20 bg-amber-500/10 text-amber-400">
            <PlayCircle className="h-3 w-3 mr-1" /> 3 Interactive Simulations
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

// ─── Pricing ─────────────────────────────────────────────────────
const plans = [
  {
    name: 'Free',
    price: '₱0',
    desc: 'Get started with the basics and see if AdCraft is right for you.',
    features: ['Module 0: Onboarding', 'Module 1: Foundations', 'First simulation access', 'Basic progress tracking', 'Community access'],
    cta: 'Start Free',
    popular: false,
    color: 'border-border/30',
  },
  {
    name: 'Pro',
    price: '₱2,999',
    period: '/month',
    desc: 'Full access to all modules, simulations, and structured curriculum.',
    features: ['All 5 learning modules', 'All 3 simulations', 'Quizzes & achievements', 'Badges & leaderboards', 'Certificate on completion', 'Priority support'],
    cta: 'Start Pro',
    popular: true,
    color: 'border-primary/30',
  },
  {
    name: 'Enterprise',
    price: '₱9,999',
    period: '/month',
    desc: 'Team management, custom content, and dedicated support.',
    features: ['Everything in Pro', 'Team dashboard & management', 'Custom content modules', 'Client roleplay scenarios', 'Advanced analytics & reporting', 'White-label certificates'],
    cta: 'Contact Sales',
    popular: false,
    color: 'border-border/30',
  },
];

function PricingSection() {
  return (
    <Section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-border/40 text-muted-foreground">Pricing</Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Invest in Your{' '}
            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
              PPC Career
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you grow. No hidden fees, no long-term contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-2xl border ${plan.popular ? plan.color + ' ring-1 ring-orange-500/20' : plan.color} bg-card/50 backdrop-blur-sm p-6 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground text-xs px-3 py-0.5 font-medium">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{plan.desc}</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Link href={plan.name === 'Enterprise' ? '#' : '/auth/signup'}>
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                      : 'bg-card/80 hover:bg-card border border-border/40'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────
function FinalCTA() {
  return (
    <Section className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-slate-500/5 p-12 md:p-16 overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />

          <div className="relative">
            <Badge variant="outline" className="mb-4 px-3 py-1 text-xs border-primary/20 text-primary">
              <Zap className="h-3 w-3 mr-1" /> Get Started Today
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Ready to Command{' '}
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-200 bg-clip-text text-transparent">
                Your PPC Future?
              </span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Join thousands of Filipino VAs and agency owners who are mastering Amazon PPC with AdCraft.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 h-13 text-base">
                  Start Free <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="px-10 h-13 text-base border-border/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function FooterSection() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-black" />
              </div>
              <span className="font-semibold">AdCraft</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Master Amazon PPC through interactive simulations and structured learning.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {['Features', 'Curriculum', 'Pricing', 'FAQ'].map((l) => (
                <li key={l}>
                  <Link href={`#${l.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2.5">
              {['About', 'Blog', 'Contact', 'Privacy', 'Terms'].map((l) => (
                <li key={l}>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground/60">
            &copy; {new Date().getFullYear()} AdCraft Academy. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/40">
            Built for Filipino VAs, agency owners, and e-commerce professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <CurriculumSection />
      <PricingSection />
      <FinalCTA />
      <FooterSection />
    </div>
  );
}
