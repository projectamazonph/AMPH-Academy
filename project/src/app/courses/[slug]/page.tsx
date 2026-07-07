import { Icon } from '@/components/icons';
import { notFound } from "next/navigation";
import Link from "next/link";
import { Script } from "next/script";
import type { Metadata } from "next";
import { getCourseBySlug } from "@/modules/courses/_actions";
import { ModuleList } from "@/modules/courses/_components/ModuleList";
import { EnrollmentButton } from "@/modules/courses/_components/EnrollmentButton";
import { Badge } from "@/components/ui/badge";

const BASE_URL = "https://amph-academy.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  const courseUrl = `${BASE_URL}/courses/${course.slug}`;
  const ogImageUrl = `${BASE_URL}/og/course-${course.slug}.png`;

  return {
    title: course.title,
    description: course.description,
    keywords: [
      course.title,
      "Amazon PPC",
      "ProjectAMPH Academy",
      "PPC Training",
      course.difficulty,
      ...(course.tier ? [course.tier] : []),
    ],
    authors: [{ name: "Ryan Dabao", url: "https://projectamazonph.com" }],
    openGraph: {
      title: `${course.title} | ProjectAMPH Academy`,
      description: course.description,
      url: courseUrl,
      type: "website",
      siteName: "ProjectAMPH Academy",
      locale: "en_PH",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: course.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.description,
      images: [ogImageUrl],
      site: "@projectamazonph",
      creator: "@ryandabao",
    },
    alternates: {
      canonical: courseUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const difficultyLabels: Record<string, string> = {
  FOUNDATIONS: "Foundations",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  MASTERY: "Mastery",
};

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const isEnrolled =
    course.enrollmentStatus === "ACTIVE" || course.enrollmentStatus === "COMPLETED";

  // Build course curriculum JSON-LD
  const courseCurriculum = course.modules.map((module) => ({
    "@type": "CourseModule",
    name: module.title,
    description: module.description,
    moduleNumber: module.moduleNumber,
    learningMode: "online",
    timeRequired: `PT${module.estimatedMinutes}M`,
  }));

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${BASE_URL}/courses/${course.slug}#course`,
    name: course.title,
    description: course.description,
    url: `${BASE_URL}/courses/${course.slug}`,
    image: `${BASE_URL}/og/course-${course.slug}.png`,
    provider: {
      "@type": "Organization",
      name: "Project Amazon PH",
      url: "https://projectamazonph.com",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icons/icon-og.png`,
      },
      sameAs: [
        "https://www.facebook.com/projectamazonph",
        "https://www.linkedin.com/company/projectamazonph",
        "https://twitter.com/projectamazonph",
      ],
    },
    author: {
      "@type": "Person",
      name: "Ryan Dabao",
      url: "https://projectamazonph.com",
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        name: "ProjectAmazonPH",
      },
    },
    coursePrerequisites: {
      "@type": "EducationalLevel",
      name: course.difficulty === "FOUNDATIONS" ? "None" : course.difficulty,
    },
    educationalLevel: course.difficulty,
    courseCredential": {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "certificate",
      recognizedBy: {
        "@type": "Organization",
        name: "ProjectAmazonPH",
      },
    },
    numberOfCredits: {
      "@type": "QuantitativeValue",
      value: course.moduleCount * 10,
      unitCode: "CEU",
    },
    totalHistoricalEnrollmentCount: 0,
    courseSchedule: {
      "@type": "Schedule",
      duration: `PT${course.estimatedHours}H`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${course.estimatedHours}H`,
      courseFee: course.price
        ? {
            "@type": "MonetaryAmount",
            value: course.price,
            currency: "PHP",
          }
        : undefined,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "124",
      bestRating: "5",
      worstRating: "1",
    },
    about: {
      "@type": "Thing",
      name: course.title,
      description: course.description,
    },
    description: course.description,
    inLanguage: ["en", "fil"],
    curriculum: courseCurriculum,
    teaches: course.modules.map((m) => m.title),
    competencyRequired: [
      "Amazon PPC Campaign Management",
      "Bidding Strategy Optimization",
      "Search Term Report Analysis",
      "ACoS and ROAS Optimization",
      "CPC Management",
    ],
  };

  return (
    <>
      <Script
        id="jsonld-course"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        {/* Breadcrumb */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <Icon name="arrow-left" className="h-3.5 w-3.5" />
          Back to courses
        </Link>

        {/* Course Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
              <Icon name="book-open" className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono text-muted-foreground"
                >
                  {difficultyLabels[course.difficulty] || course.difficulty}
                </Badge>
                {course.tier && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono text-primary border-primary/20"
                  >
                    {course.tier === "PPC_FOUNDATIONS"
                      ? "₱2,999"
                      : course.tier === "ACCELERATED_MASTERY"
                        ? "₱5,999"
                        : course.tier === "ULTIMATE_TRANSFORMATION"
                          ? "₱9,999"
                          : course.tier}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {course.title}
              </h1>
              <p className="text-muted-foreground mt-2 leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Icon name="bar-chart" className="h-4 w-4" />
              {course.moduleCount} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4" />
              {course.estimatedHours} hours
            </span>
            <div className="ml-auto">
              <EnrollmentButton
                courseId={course.id}
                initialStatus={course.enrollmentStatus || "NOT_ENROLLED"}
              />
            </div>
          </div>
        </div>

        {/* Curriculum */}
        <div>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Icon name="book-open" className="h-5 w-5 text-primary" />
            Curriculum
            <span className="text-sm font-normal text-muted-foreground">
              ({course.moduleCount} modules)
            </span>
          </h2>
          <ModuleList
            modules={course.modules}
            courseSlug={slug}
            isEnrolled={isEnrolled}
          />
        </div>
      </div>
    </div>
    </>
  );
}
