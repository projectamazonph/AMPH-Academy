"use client";
import Link from "next/link";
import { useState } from "react";

// Curriculum modules data
const curriculumModules = [
  {
    title: "Amazon Fundamentals",
    description: "Understanding the Amazon ecosystem, seller central, and marketplace dynamics.",
  },
  {
    title: "PPC Basics & Campaign Types",
    description: "SP, SB, SD campaigns explained with practical examples.",
  },
  {
    title: "Keyword Research Mastery",
    description: "Finding high-converting keywords using Helium 10 and MerchantWords.",
  },
  {
    title: "Campaign Structure",
    description: "Organizing campaigns for maximum efficiency and ROI.",
  },
  {
    title: "Bidding Strategies",
    description: "Manual vs. automatic bidding, ACOS optimization, and bid adjustments.",
  },
  {
    title: "Reporting & Analytics",
    description: "Creating actionable reports and data-driven decisions.",
  },
  {
    title: "Scaling & Optimization",
    description: "Advanced techniques to scale campaigns profitably.",
  },
  {
    title: "Client Acquisition",
    description: "Finding and retaining high-paying Amazon seller clients.",
  },
];

// Tools data
const tools = [
  {
    icon: "🔍",
    name: "Helium 10",
    description: "Keyword research, competitor analysis, and trend tracking worth $127/month",
  },
  {
    icon: "📊",
    name: "MerchantWords",
    description: "Amazon keyword search volume data worth $59/month",
  },
  {
    icon: "📈",
    name: "DataBox Dashboard",
    description: "Custom reporting templates to impress clients worth $49/month",
  },
];

// Social proof data
const testimonials = [
  {
    name: "Maria Santos",
    former: "Former: General Admin VA",
    before: "₱15k/mo",
    after: "₱65k/mo",
    quote: "I went from struggling with basic VA tasks to managing full Amazon PPC accounts. The ROI was incredible — I paid off my enrollment in just 2 weeks of work!",
  },
  {
    name: "Carlos Reyes",
    former: "Former: Data Entry Clerk",
    before: "₱18k/mo",
    after: "₱80k/mo",
    quote: "The curriculum is so thorough that I landed my first client before even finishing the course. Now I have 3 recurring clients and still growing.",
  },
];

// Pricing tiers data
const pricingTiers = [
  {
    name: "Starter",
    price: "₱2,999",
    features: [
      { text: "8 Course Modules", included: true },
      { text: "31 Video Lessons", included: true },
      { text: "Basic Templates", included: true },
      { text: "Tool Access", included: false },
      { text: "Badge System", included: false },
      { text: "1-on-1 Mentorship", included: false },
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "₱5,999",
    features: [
      { text: "8 Course Modules", included: true },
      { text: "31 Video Lessons", included: true },
      { text: "Premium Templates", included: true },
      { text: "Helium 10 Access", included: true },
      { text: "All 17 Badges", included: true },
      { text: "1-on-1 Mentorship", included: false },
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "₱9,999",
    features: [
      { text: "8 Course Modules", included: true },
      { text: "31 Video Lessons", included: true },
      { text: "Premium Templates", included: true },
      { text: "All 3 Tool Access", included: true },
      { text: "All 17 Badges", included: true },
      { text: "1-on-1 Mentorship", included: true },
    ],
    popular: false,
  },
];

// Gap problems data
const gapProblems = [
  {
    icon: "💸",
    title: "Low-Paying Generic VA Work",
    description:
      "Stuck with data entry, admin tasks, or customer service earning ₱15k-25k/month with no growth path.",
  },
  {
    icon: "📉",
    title: "No Specialized Skills",
    description:
      "Generic skills mean competing with thousands of VAs for the same limited jobs.",
  },
  {
    icon: "🚫",
    title: "No Clear Career Path",
    description:
      "Uncertainty about how to level up and command higher rates in the VA industry.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#1A1A2E] text-white">
      {/* HERO SECTION */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A2E] via-[#16213E] to-[#1A1A2E]" />
        <div className="pointer-events-none absolute -left-1/2 -top-1/2 h-[200%] w-[200%] rounded-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,107,53,0.1)_0%,transparent_50%)]" />
        <div className="relative z-10 mx-auto max-w-[900px]">
          <span className="mb-8 inline-block rounded-full bg-[rgba(255,107,53,0.2)] px-6 py-2 text-sm font-semibold uppercase tracking-wider text-[#FF6B35]">
            For Filipino Virtual Assistants
          </span>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-7xl">
            Master Amazon PPC
          </h1>
          <h1 className="mb-10 text-5xl font-extrabold leading-tight text-[#FF6B35] md:text-7xl">
            Start Earning $500+/Month
          </h1>
          <p className="mx-auto mb-10 max-w-[600px] text-xl text-[#B0B0B0]">
            The complete Amazon PPC training program that transforms Filipino
            VAs into high-earning Amazon advertising specialists.
          </p>
          <div className="mb-16 flex flex-wrap justify-center gap-5">
            <Link
              href="#pricing"
              className="rounded-lg bg-[#FF6B35] px-12 py-4 text-lg font-bold text-white shadow-[0_4px_24px_rgba(255,107,53,0.4)] transition-all hover:bg-[#E55A28]"
            >
              Start Your Journey
            </Link>
            <Link
              href="#curriculum"
              className="rounded-lg border-2 border-white px-12 py-4 text-lg font-semibold text-white transition-all hover:bg-white hover:text-[#1A1A2E]"
            >
              View Curriculum
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-16">
            <div>
              <div className="text-5xl font-extrabold text-[#FF6B35]">8</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-[#B0B0B0]">
                Modules
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF6B35]">31</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-[#B0B0B0]">
                Lessons
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF6B35]">17</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-[#B0B0B0]">
                Badges
              </div>
            </div>
            <div>
              <div className="text-5xl font-extrabold text-[#FF6B35]">3</div>
              <div className="mt-1 text-sm uppercase tracking-wider text-[#B0B0B0]">
                Tools
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE GAP SECTION */}
      <section className="bg-[#0F0F1A] px-5 py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[3px] text-[#FF6B35]">
              The Problem
            </span>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              The Gap Holding You Back
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {gapProblems.map((problem, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A1A2E] to-[#16213E] p-10"
              >
                <div className="mb-6 flex h-[60px] w-[60px] items-center justify-center rounded-xl bg-[rgba(255,107,53,0.2)] text-3xl">
                  {problem.icon}
                </div>
                <h3 className="mb-4 text-xl font-bold text-white">
                  {problem.title}
                </h3>
                <p className="text-[#B0B0B0]">{problem.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 rounded-3xl border-2 border-[#FF6B35] bg-gradient-to-br from-[rgba(255,107,53,0.1)] to-[rgba(255,107,53,0.05)] p-16 text-center">
            <h3 className="mb-4 text-2xl font-bold text-[#FF6B35]">
              The Solution: Amazon PPC Specialization
            </h3>
            <p className="mx-auto max-w-[700px] text-lg text-white">
              Amazon sellers desperately need skilled PPC specialists, but
              there&apos;s a massive talent gap. Master this skill and position
              yourself in the top 5% of VAs.
            </p>
          </div>
        </div>
      </section>

      {/* CURRICULUM TIMELINE SECTION */}
      <section id="curriculum" className="bg-[#1A1A2E] px-5 py-32">
        <div className="mx-auto max-w-[1000px]">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[3px] text-[#FF6B35]">
              What You&apos;ll Learn
            </span>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              8-Module Complete Curriculum
            </h2>
          </div>
          <div className="flex flex-col gap-10">
            {curriculumModules.map((module, index) => (
              <div key={index} className="flex items-start gap-10">
                {index % 2 === 0 ? (
                  <>
                    <div className="flex-1 text-right pr-14">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {module.title}
                      </h3>
                      <p className="text-[#B0B0B0]">{module.description}</p>
                    </div>
                    <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-lg font-bold text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                      {index + 1}
                    </div>
                    <div className="flex-1" />
                  </>
                ) : (
                  <>
                    <div className="flex-1" />
                    <div className="relative z-10 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-lg font-bold text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]">
                      {index + 1}
                    </div>
                    <div className="flex-1 pl-14 text-left">
                      <h3 className="mb-2 text-xl font-bold text-white">
                        {module.title}
                      </h3>
                      <p className="text-[#B0B0B0]">{module.description}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section className="bg-[#0F0F1A] px-5 py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[3px] text-[#FF6B35]">
              Included Tools
            </span>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              Industry-Standard Tools Worth $500+/Year
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {tools.map((tool, index) => (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-[#1A1A2E] p-10 text-center transition-transform hover:-translate-y-1"
              >
                <div className="mx-auto mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF6B35] to-[#FF8F6B] text-4xl">
                  {tool.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{tool.name}</h3>
                <p className="text-[#B0B0B0]">{tool.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-xl bg-[rgba(255,107,53,0.1)] p-8 text-center">
            <p className="text-lg text-white">
              All tools included with your enrollment —{" "}
              <span className="font-bold text-[#FF6B35]">
                save over $2,800/year
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="bg-gradient-to-br from-[#1A1A2E] to-[#16213E] px-5 py-32">
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[3px] text-[#FF6B35]">
              Success Stories
            </span>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl">
              Real Results from Real VAs
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative rounded-3xl border-2 border-[rgba(255,107,53,0.3)] bg-[#0F0F1A] p-12"
              >
                <div className="absolute -top-5 left-10 rounded-full bg-[#FF6B35] px-5 py-2 text-sm font-bold text-white">
                  Featured Success
                </div>
                <div className="mb-6 flex items-center gap-5">
                  <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-br from-[#FF6B35] to-[#FF8F6B] text-3xl">
                    {index === 0 ? "👩‍💼" : "👨‍💻"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-[#B0B0B0]">
                      {testimonial.former}
                    </p>
                  </div>
                </div>
                <div className="mb-6 flex items-center justify-between rounded-xl bg-[rgba(255,107,53,0.1)] p-5">
                  <div className="text-center">
                    <div className="mb-1 text-sm text-[#B0B0B0]">Before</div>
                    <div className="text-2xl font-bold text-[#B0B0B0]">
                      {testimonial.before}
                    </div>
                  </div>
                  <div className="text-2xl text-[#FF6B35]">→</div>
                  <div className="text-center">
                    <div className="mb-1 text-sm text-[#B0B0B0]">After</div>
                    <div className="text-2xl font-bold text-[#FF6B35]">
                      {testimonial.after}
                    </div>
                  </div>
                </div>
                <p className="text-base italic text-white">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TIERS SECTION */}
      <section id="pricing" className="bg-[#0F0F1A] px-5 py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-20 text-center">
            <span className="mb-4 inline-block text-sm font-bold uppercase tracking-[3px] text-[#FF6B35]">
              Investment
            </span>
            <h2 className="mb-4 text-4xl font-extrabold text-white md:text-5xl">
              Choose Your Path
            </h2>
            <p className="mx-auto max-w-[600px] text-lg text-[#B0B0B0]">
              All plans include lifetime access to course materials and community
              support.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-3xl p-10 ${
                  tier.popular
                    ? "scale-105 bg-gradient-to-br from-[#FF6B35] to-[#E55A28] shadow-[0_8px_40px_rgba(255,107,53,0.4)]"
                    : "border border-white/10 bg-[#1A1A2E]"
                }`}
              >
                <div className="border-b border-white/10 pb-8 text-center">
                  {tier.popular && (
                    <span className="mb-4 inline-block rounded-full bg-white px-4 py-1 text-xs font-bold uppercase text-[#FF6B35]">
                      Most Popular
                    </span>
                  )}
                  <h3 className="mb-4 text-xl font-bold text-white">
                    {tier.name}
                  </h3>
                  <div className="text-5xl font-extrabold text-white">
                    {tier.price}
                  </div>
                  <div
                    className={`mt-2 text-sm ${
                      tier.popular ? "text-white/80" : "text-[#B0B0B0]"
                    }`}
                  >
                    one-time payment
                  </div>
                </div>
                <ul className="space-y-4 py-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`flex items-center gap-3 ${
                        feature.included ? "text-white" : "text-[#B0B0B0]"
                      }`}
                    >
                      <span
                        className={
                          feature.included
                            ? tier.popular
                              ? "text-white"
                              : "text-[#FF6B35]"
                            : "text-[#666]"
                        }
                      >
                        {feature.included ? "✓" : "✗"}
                      </span>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#"
                  className={`block rounded-xl px-6 py-4 text-center font-semibold transition-all ${
                    tier.popular
                      ? "bg-white text-[#FF6B35] hover:bg-white/90"
                      : "border-2 border-white text-white hover:bg-white hover:text-[#1A1A2E]"
                  } ${tier.name === "Elite" ? "bg-[#FF6B35] font-bold shadow-[0_4px_24px_rgba(255,107,53,0.4)] hover:bg-[#E55A28]" : ""}`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-gradient-to-br from-[#FF6B35] via-[#E55A28] to-[#FF6B35] px-5 py-32 text-center">
        <div className="mx-auto max-w-[800px]">
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Ready to Transform Your VA Career?
          </h2>
          <p className="mx-auto mb-10 max-w-[600px] text-xl text-white/90">
            Join hundreds of Filipino VAs who have already made the switch to
            high-earning Amazon PPC specialists.
          </p>
          <div className="mb-10 flex flex-wrap justify-center gap-5">
            <Link
              href="#pricing"
              className="rounded-xl bg-[#1A1A2E] px-14 py-5 text-lg font-bold text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)] transition-all hover:bg-[#16213E]"
            >
              Enroll Now
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">✓</span>
              <span>Lifetime Access</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">✓</span>
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span className="text-xl">✓</span>
              <span>Zero Risk</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F0F1A] px-5 py-10 text-center">
        <p className="text-sm text-[#B0B0B0]">
          © 2026 ProjectAmazonPH Academy. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
