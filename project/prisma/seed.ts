import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding ProjectAMPH Academy...");

  // Clean existing data
  await prisma.eventLog.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.moduleProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.toolResult.deleteMany();
  await prisma.toolSession.deleteMany();
  await prisma.simulationAttempt.deleteMany();
  await prisma.simulation.deleteMany();
  await prisma.liveClassRegistration.deleteMany();
  await prisma.liveClass.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
  await prisma.course.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // ── DEMO ADMIN ──
  const admin = await prisma.user.create({
    data: {
      email: "admin@amph.academy",
      name: "Ryan Dabao",
      role: "ADMIN",
      xp: 9999,
      level: 50,
    },
  });
  console.log(`  ✓ Admin user: ${admin.email}`);

  // ── BADGES ──
  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        slug: "first-lesson",
        title: "First Steps",
        description: "Complete your first lesson",
        icon: "BookOpen",
        category: "ENGAGEMENT",
        tier: "BRONZE",
        xpReward: 50,
        criteria: JSON.stringify({ type: "lesson_completed", count: 1 }),
        order: 1,
      },
    }),
    prisma.badge.create({
      data: {
        slug: "quiz-ace",
        title: "Quiz Ace",
        description: "Score 100% on any quiz",
        icon: "Brain",
        category: "MASTERY",
        tier: "SILVER",
        xpReward: 100,
        criteria: JSON.stringify({ type: "quiz_perfect_score", count: 1 }),
        order: 2,
      },
    }),
    prisma.badge.create({
      data: {
        slug: "campaign-architect",
        title: "Campaign Architect",
        description: "Build your first campaign in the Campaign Builder",
        icon: "Rocket",
        category: "MASTERY",
        tier: "SILVER",
        xpReward: 150,
        criteria: JSON.stringify({ type: "tool_completed", tool: "campaign_builder", count: 1 }),
        order: 3,
      },
    }),
    prisma.badge.create({
      data: {
        slug: "module-master",
        title: "Module Master",
        description: "Complete all lessons in a module",
        icon: "Trophy",
        category: "MASTERY",
        tier: "GOLD",
        xpReward: 250,
        criteria: JSON.stringify({ type: "module_completed", count: 1 }),
        order: 4,
      },
    }),
    prisma.badge.create({
      data: {
        slug: "streak-7",
        title: "Week Warrior",
        description: "Maintain a 7-day learning streak",
        icon: "Flame",
        category: "STREAK",
        tier: "SILVER",
        xpReward: 200,
        criteria: JSON.stringify({ type: "streak", days: 7 }),
        order: 5,
      },
    }),
    prisma.badge.create({
      data: {
        slug: "course-graduate",
        title: "Course Graduate",
        description: "Complete all modules in a course",
        icon: "Award",
        category: "MASTERY",
        tier: "GOLD",
        xpReward: 500,
        criteria: JSON.stringify({ type: "course_completed", count: 1 }),
        order: 6,
      },
    }),
  ]);
  console.log(`  ✓ ${badges.length} badges created`);

  // ── COURSES & MODULES ──
  // Tier 1: PPC Foundations (₱2,999)
  const foundationsCourse = await prisma.course.create({
    data: {
      title: "PPC Foundations",
      slug: "ppc-foundations",
      description:
        "Master the fundamentals of Amazon PPC — campaign structure, keyword research, bidding basics, and performance analysis. The essential starting point for every Filipino VA.",
      icon: "Compass",
      difficulty: "FOUNDATIONS",
      tier: "PPC_FOUNDATIONS",
      price: 2999,
      estimatedHours: 8,
      isPublished: true,
      sortOrder: 1,
    },
  });

  const foundationsModules = await Promise.all([
    prisma.module.create({
      data: {
        courseId: foundationsCourse.id,
        moduleNumber: 1,
        title: "Amazon PPC Landscape",
        slug: "ppc-landscape",
        description: "Understand the Amazon advertising ecosystem and where PPC fits",
        icon: "Globe",
        color: "orange",
        order: 1,
        isPublished: true,
        estimatedMinutes: 45,
      },
    }),
    prisma.module.create({
      data: {
        courseId: foundationsCourse.id,
        moduleNumber: 2,
        title: "Campaign Architecture",
        slug: "campaign-architecture",
        description: "Learn how to structure campaigns, ad groups, and targeting",
        icon: "Layers",
        color: "orange",
        order: 2,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
    prisma.module.create({
      data: {
        courseId: foundationsCourse.id,
        moduleNumber: 3,
        title: "Keyword Research & Strategy",
        slug: "keyword-research",
        description: "Discover how to find high-converting keywords and build winning lists",
        icon: "Search",
        color: "orange",
        order: 3,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
  ]);
  console.log(`  ✓ Course "${foundationsCourse.title}" with ${foundationsModules.length} modules`);

  // Tier 2: Accelerated Mastery (₱5,999)
  const masteryCourse = await prisma.course.create({
    data: {
      title: "Accelerated Mastery",
      slug: "accelerated-mastery",
      description:
        "Level up with advanced bidding strategies, portfolio management, search term optimization, and data-driven decision making. For VAs ready to command higher rates.",
      icon: "Zap",
      difficulty: "INTERMEDIATE",
      tier: "ACCELERATED_MASTERY",
      price: 5999,
      estimatedHours: 15,
      isPublished: true,
      sortOrder: 2,
    },
  });

  const masteryModules = await Promise.all([
    prisma.module.create({
      data: {
        courseId: masteryCourse.id,
        moduleNumber: 1,
        title: "Advanced Bidding Strategies",
        slug: "advanced-bidding",
        description: "Dynamic bidding, portfolio bidding, and campaign-level bid adjustments",
        icon: "TrendingUp",
        color: "orange",
        order: 1,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
    prisma.module.create({
      data: {
        courseId: masteryCourse.id,
        moduleNumber: 2,
        title: "Search Term Optimization",
        slug: "str-optimization",
        description: "Master the STR Triage process — identify, categorize, and action search terms",
        icon: "Filter",
        color: "orange",
        order: 2,
        isPublished: true,
        estimatedMinutes: 75,
      },
    }),
    prisma.module.create({
      data: {
        courseId: masteryCourse.id,
        moduleNumber: 3,
        title: "Portfolio Management",
        slug: "portfolio-management",
        description: "Manage multiple accounts, set budgets, and optimize across portfolios",
        icon: "Briefcase",
        color: "orange",
        order: 3,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
    prisma.module.create({
      data: {
        courseId: masteryCourse.id,
        moduleNumber: 4,
        title: "Performance Analysis & Reporting",
        slug: "performance-analysis",
        description: "Read the data, build reports, and make decisions that impress clients",
        icon: "BarChart3",
        color: "orange",
        order: 4,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
  ]);
  console.log(`  ✓ Course "${masteryCourse.title}" with ${masteryModules.length} modules`);

  // Tier 3: Ultimate Transformation (₱9,999)
  const ultimateCourse = await prisma.course.create({
    data: {
      title: "Ultimate Transformation",
      slug: "ultimate-transformation",
      description:
        "The complete agency-owner track. From client acquisition to team building, advanced strategy to business systems. Graduate ready to lead and earn ₱80k+/month.",
      icon: "Rocket",
      difficulty: "ADVANCED",
      tier: "ULTIMATE_TRANSFORMATION",
      price: 9999,
      estimatedHours: 25,
      isPublished: true,
      sortOrder: 3,
    },
  });

  const ultimateModules = await Promise.all([
    prisma.module.create({
      data: {
        courseId: ultimateCourse.id,
        moduleNumber: 1,
        title: "Agency-Grade Campaign Management",
        slug: "agency-campaigns",
        description: "Multi-account structures, advanced segmentation, and automation",
        icon: "Building2",
        color: "orange",
        order: 1,
        isPublished: true,
        estimatedMinutes: 90,
      },
    }),
    prisma.module.create({
      data: {
        courseId: ultimateCourse.id,
        moduleNumber: 2,
        title: "Client Acquisition & Retention",
        slug: "client-acquisition",
        description: "How to find, pitch, and retain high-paying PPC clients",
        icon: "Handshake",
        color: "orange",
        order: 2,
        isPublished: true,
        estimatedMinutes: 75,
      },
    }),
    prisma.module.create({
      data: {
        courseId: ultimateCourse.id,
        moduleNumber: 3,
        title: "Scaling Your PPC Practice",
        slug: "scaling-practice",
        description: "Systems, SOPs, and team building for the independent PPC pro",
        icon: "TrendingUp",
        color: "orange",
        order: 3,
        isPublished: true,
        estimatedMinutes: 90,
      },
    }),
    prisma.module.create({
      data: {
        courseId: ultimateCourse.id,
        moduleNumber: 4,
        title: "Capstone: Live Account Audit",
        slug: "capstone-audit",
        description: "Apply everything you've learned in a real account audit simulation",
        icon: "ClipboardCheck",
        color: "orange",
        order: 4,
        isPublished: true,
        estimatedMinutes: 120,
      },
    }),
    prisma.module.create({
      data: {
        courseId: ultimateCourse.id,
        moduleNumber: 5,
        title: "Certification & Placement Prep",
        slug: "certification-prep",
        description: "Prepare for the certification exam and position yourself for agency roles",
        icon: "Award",
        color: "gold",
        order: 5,
        isPublished: true,
        estimatedMinutes: 60,
      },
    }),
  ]);
  console.log(`  ✓ Course "${ultimateCourse.title}" with ${ultimateModules.length} modules`);

  // ── LESSONS ──
  // Create a few lessons per module for the foundations course
  const foundationsLessons = await Promise.all([
    // Module 1 lessons
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[0].id,
        lessonNumber: 1,
        title: "What is Amazon PPC?",
        slug: "1.1-what-is-ppc",
        content: `# What is Amazon PPC?\n\nAmazon PPC (Pay-Per-Click) is an advertising model where sellers pay only when a shopper clicks their ad. It's the primary way to drive visibility in Amazon's crowded marketplace.\n\n## Key Concepts\n\n- **Impressions** — How many times your ad was shown\n- **Clicks** — How many times shoppers clicked\n- **Spend** — Total cost of clicks\n- **Sales** — Revenue attributed to ads\n- **ACoS** — Advertising Cost of Sales (Spend ÷ Sales)\n\n## Why It Matters for Filipino VAs\n\nThe global Amazon PPC management market is growing rapidly. Western agencies are actively hiring skilled Filipino VAs to manage campaigns. A specialist earning ₱80k+/month is the norm, not the exception.`,
        type: "READING",
        estimatedMinutes: 15,
        xpReward: 50,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[0].id,
        lessonNumber: 2,
        title: "PPC vs Organic: When to Use Each",
        slug: "1.2-ppc-vs-organic",
        content: `# PPC vs Organic Traffic\n\nBoth organic (SEO) and paid (PPC) traffic are essential, but they serve different purposes.\n\n## Comparison\n\n| Factor | PPC | Organic |\n|--------|-----|--------|\n| Speed | Instant | Weeks to months |\n| Cost | Per click | Time/SEO investment |\n| Control | High | Limited |\n| Scalability | Linear | Algorithm-dependent |\n\n## The PPC Advantage\n\nPPC lets you test products, keywords, and messaging instantly. It's the fastest path to sales data.`,
        type: "READING",
        estimatedMinutes: 10,
        xpReward: 50,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[0].id,
        lessonNumber: 3,
        title: "Module 1 Knowledge Check",
        slug: "1.3-module-1-quiz",
        content: `# Module 1 Knowledge Check\n\nAnswer the following questions to test your understanding of the Amazon PPC landscape.`,
        type: "QUIZ",
        estimatedMinutes: 10,
        xpReward: 100,
        isPublished: true,
      },
    }),
    // Module 2 lessons
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[1].id,
        lessonNumber: 1,
        title: "Campaign Structure Fundamentals",
        slug: "2.1-campaign-structure",
        content: `# Campaign Structure\n\nA well-organized campaign structure is the foundation of PPC success.\n\n## Hierarchy\n\n1. **Campaign** — Budget, targeting type, bid strategy\n2. **Ad Group** — Keywords, bids, product targeting\n3. **Ad** — Creative, copy\n\n## Best Practices\n\n- Separate Auto and Manual campaigns\n- Use thematic ad groups (5-10 keywords each)\n- One product per ad group for tight relevance`,
        type: "READING",
        estimatedMinutes: 20,
        xpReward: 50,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[1].id,
        lessonNumber: 2,
        title: "Campaign Builder Practice",
        slug: "2.2-campaign-builder",
        content: `# Campaign Builder Simulation\n\nLaunch the Campaign Builder below to practice creating your first campaign structure.`,
        type: "SIMULATION",
        estimatedMinutes: 25,
        xpReward: 150,
        isPublished: true,
      },
    }),
    // Module 3 lessons
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[2].id,
        lessonNumber: 1,
        title: "Keyword Match Types",
        slug: "3.1-match-types",
        content: `# Keyword Match Types\n\nUnderstanding match types is critical for controlling your ad spend.\n\n## Types\n\n- **Broad** — Maximum reach, least control\n- **Phrase** — Moderate reach and control\n- **Exact** — Most control, narrowest reach\n\n## Strategy\n\nStart with Auto campaigns to gather data, then build Manual campaigns using exact match keywords from your high-performing search terms.`,
        type: "READING",
        estimatedMinutes: 15,
        xpReward: 50,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[2].id,
        lessonNumber: 2,
        title: "Keyword Research Tools",
        slug: "3.2-keyword-tools",
        content: `# Keyword Research Tools\n\nDiscover the tools that top PPC managers use to build winning keyword lists.\n\n## Tools Covered\n\n1. Amazon Search Term Report\n2. Brand Analytics (ABA)\n3. Helium 10 / Jungle Scout\n4. Sonar Tool`,
        type: "READING",
        estimatedMinutes: 20,
        xpReward: 50,
        isPublished: true,
      },
    }),
    prisma.lesson.create({
      data: {
        moduleId: foundationsModules[2].id,
        lessonNumber: 3,
        title: "Module 3 Knowledge Check",
        slug: "3.3-module-3-quiz",
        content: `# Module 3 Knowledge Check\n\nTest your keyword research knowledge.`,
        type: "QUIZ",
        estimatedMinutes: 10,
        xpReward: 100,
        isPublished: true,
      },
    }),
  ]);
  console.log(`  ✓ ${foundationsLessons.length} lessons created`);

  // ── RESOURCES ──
  const resources = await Promise.all([
    prisma.resource.create({
      data: {
        moduleId: foundationsModules[0].id,
        title: "Amazon PPC Glossary",
        description: "Complete glossary of Amazon PPC terms every VA should know",
        type: "PDF",
        fileUrl: "/resources/ppc-glossary.pdf",
        sortOrder: 1,
        isPublished: true,
      },
    }),
    prisma.resource.create({
      data: {
        moduleId: foundationsModules[1].id,
        title: "Campaign Structure Template",
        description: "Google Sheet template for planning campaign architecture",
        type: "SPREADSHEET",
        fileUrl: "/resources/campaign-template.xlsx",
        sortOrder: 1,
        isPublished: true,
      },
    }),
    prisma.resource.create({
      data: {
        moduleId: foundationsModules[2].id,
        title: "Keyword Research Cheat Sheet",
        description: "Quick reference for keyword match types and best practices",
        type: "CHEAT_SHEET",
        fileUrl: "/resources/keyword-cheatsheet.pdf",
        sortOrder: 1,
        isPublished: true,
      },
    }),
    prisma.resource.create({
      data: {
        title: "ACoS Calculator",
        description: "Break-even ACoS calculator for pricing analysis",
        type: "SPREADSHEET",
        fileUrl: "/resources/acos-calculator.xlsx",
        sortOrder: 1,
        isPublished: true,
      },
    }),
  ]);
  console.log(`  ✓ ${resources.length} resources created`);

  // ── SUMMARY ──
  const counts = {
    users: await prisma.user.count(),
    courses: await prisma.course.count(),
    modules: await prisma.module.count(),
    lessons: await prisma.lesson.count(),
    badges: await prisma.badge.count(),
    resources: await prisma.resource.count(),
  };
  console.log("\n━━━ Seed Complete ━━━");
  console.log(`  Users:     ${counts.users}`);
  console.log(`  Courses:   ${counts.courses}`);
  console.log(`  Modules:   ${counts.modules}`);
  console.log(`  Lessons:   ${counts.lessons}`);
  console.log(`  Badges:    ${counts.badges}`);
  console.log(`  Resources: ${counts.resources}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
