import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, BarChart3 } from "lucide-react";
import type { Metadata } from "next";
import { getCourseBySlug } from "@/modules/courses/_actions";
import { ModuleList } from "@/modules/courses/_components/ModuleList";
import { EnrollmentButton } from "@/modules/courses/_components/EnrollmentButton";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };
  return {
    title: `${course.title} — ProjectAMPH Academy`,
    description: course.description,
    openGraph: {
      title: `${course.title} — ProjectAMPH Academy`,
      description: course.description,
      type: "website",
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        {/* Breadcrumb */}
        <Link
          href="/courses"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to courses
        </Link>

        {/* Course Header */}
        <div className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0">
              <BookOpen className="h-7 w-7 text-primary" />
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
              <BarChart3 className="h-4 w-4" />
              {course.moduleCount} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
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
            <BookOpen className="h-5 w-5 text-primary" />
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
  );
}
