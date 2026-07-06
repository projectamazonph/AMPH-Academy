import { getCourses } from "@/modules/courses/_actions";
import { CourseCard } from "@/modules/courses/_components/CourseCard";
import { BookOpen, Sparkle } from '@phosphor-icons/react';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses — ProjectAMPH Academy",
  description:
    "Browse Amazon PPC courses built for Filipino VAs. From campaign foundations to advanced optimization — structured, hands-on, and simulation-backed training.",
  openGraph: {
    title: "Amazon PPC Courses — ProjectAMPH Academy",
    description:
      "Structured Amazon advertising courses with interactive simulations. Built for Filipino VAs by ProjectAmazonPH.",
    type: "website",
  },
};

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Course Catalog
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your path. From foundations to advanced strategy — every course
            is designed to take your Amazon PPC skills to the next level.
          </p>
        </div>

        {/* Course Grid */}
        {courses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Sparkle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Courses Coming Soon</h2>
            <p className="text-muted-foreground">
              We&apos;re building something amazing. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
