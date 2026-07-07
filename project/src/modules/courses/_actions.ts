"use server";

import { db } from "@/lib/db";
import { getSession } from "@/modules/auth/_actions";
import type {
  CourseSummary,
  CourseDetail,
  ModuleSummary,
  ModuleDetail,
  LessonSummary,
  EnrollmentStatus,
  EnrollmentResponse,
  UserProgress,
} from "./_types";

/**
 * Get all published courses.
 */
export async function getCourses(): Promise<CourseSummary[]> {
  const courses = await db.course.findMany({
    where: { isPublished: true },
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { modules: true } },
    },
  });

  return courses.map((c) => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    description: c.description,
    icon: c.icon,
    difficulty: c.difficulty,
    price: c.price,
    tier: c.tier,
    estimatedHours: c.estimatedHours,
    moduleCount: c._count.modules,
    isPublished: c.isPublished,
  }));
}

/**
 * Get a single course by slug with modules and enrollment status.
 */
export async function getCourseBySlug(slug: string): Promise<CourseDetail | null> {
  const session = await getSession();
  const userId = session.authenticated ? session.user!.id : null;

  const course = await db.course.findUnique({
    where: { slug, isPublished: true },
    include: {
      modules: {
        where: { isPublished: true },
        orderBy: { order: "asc" },
        include: {
          _count: { select: { lessons: true } },
          progress: userId ? { where: { userId } } : false,
        },
      },
    },
  });

  if (!course) return null;

  // Determine enrollment status
  let enrollmentStatus: EnrollmentStatus = "NOT_ENROLLED";
  if (userId) {
    const enrollment = await db.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } },
    });
    if (enrollment) {
      enrollmentStatus = enrollment.status === "COMPLETED" ? "COMPLETED" : "ACTIVE";
    }
  }

  const modules: ModuleSummary[] = course.modules.map((m) => {
    const prog = Array.isArray(m.progress) ? m.progress[0] : null;
    return {
      id: m.id,
      moduleNumber: m.moduleNumber,
      title: m.title,
      slug: m.slug,
      description: m.description,
      icon: m.icon,
      color: m.color,
      order: m.order,
      estimatedMinutes: m.estimatedMinutes,
      lessonCount: m._count.lessons,
      progressStatus: prog
        ? (prog.status as "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED")
        : "NOT_STARTED",
    };
  });

  return {
    id: course.id,
    title: course.title,
    slug: course.slug,
    description: course.description,
    icon: course.icon,
    difficulty: course.difficulty,
    price: course.price,
    tier: course.tier,
    estimatedHours: course.estimatedHours,
    moduleCount: modules.length,
    isPublished: course.isPublished,
    modules,
    enrollmentStatus,
  };
}

/**
 * Get a specific module with its lessons.
 */
export async function getModule(
  courseSlug: string,
  moduleId: string,
): Promise<ModuleDetail | null> {
  const session = await getSession();
  const userId = session.authenticated ? session.user!.id : null;

  // eslint-disable-next-line @next/next/no-assign-module-variable
  const module = await db.module.findFirst({
    where: {
      id: moduleId,
      course: { slug: courseSlug, isPublished: true },
      isPublished: true,
    },
    include: {
      lessons: {
        where: { isPublished: true },
        orderBy: { lessonNumber: "asc" },
      },
      progress: userId ? { where: { userId } } : false,
    },
  });

  if (!module) return null;

  const prog = Array.isArray(module.progress) ? module.progress[0] : null;

  const lessons: LessonSummary[] = module.lessons.map((l) => ({
    id: l.id,
    lessonNumber: l.lessonNumber,
    title: l.title,
    slug: l.slug,
    type: l.type,
    videoUrl: l.videoUrl,
    estimatedMinutes: l.estimatedMinutes,
    xpReward: l.xpReward,
    progressStatus: "NOT_STARTED",
  }));

  return {
    id: module.id,
    moduleNumber: module.moduleNumber,
    title: module.title,
    slug: module.slug,
    description: module.description,
    icon: module.icon,
    color: module.color,
    order: module.order,
    estimatedMinutes: module.estimatedMinutes,
    lessonCount: lessons.length,
    progressStatus: prog
      ? (prog.status as "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED")
      : "NOT_STARTED",
    lessons,
  };
}

/**
 * Enroll the current user in a course.
 */
export async function enrollCourse(courseId: string): Promise<EnrollmentResponse> {
  const session = await getSession();
  if (!session.authenticated || !session.user) {
    return { success: false, status: "NOT_ENROLLED", error: "You must be logged in to enroll" };
  }

  try {
    const existing = await db.enrollment.findUnique({
      where: { userId_courseId: { userId: session.user.id, courseId } },
    });

    if (existing) {
      return {
        success: true,
        status: existing.status === "COMPLETED" ? "COMPLETED" : "ACTIVE",
      };
    }

    await db.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
        status: "ACTIVE",
      },
    });

    return { success: true, status: "ACTIVE" };
  } catch (error) {
    return { success: false, error: "Failed to enroll. Please try again." };
  }
}

/**
 * Get user progress across all enrolled courses.
 */
export async function getUserProgress(): Promise<UserProgress[]> {
  const session = await getSession();
  if (!session.authenticated || !session.user) return [];

  const enrollments = await db.enrollment.findMany({
    where: { userId: session.user.id },
    include: {
      course: {
        include: {
          modules: {
            where: { isPublished: true },
            include: {
              _count: { select: { lessons: true } },
            },
          },
        },
      },
    },
  });

  return enrollments.map((enrollment) => {
    const totalModules = enrollment.course.modules.length;
    const totalLessons = enrollment.course.modules.reduce(
      (sum, m) => sum + m._count.lessons,
      0,
    );
    const completedModules = enrollment.course.modules.filter(
      (m) => false, // Sprint 1 — no progress tracking yet
    ).length;

    return {
      courseId: enrollment.courseId,
      completedModules,
      totalModules,
      completedLessons: 0,
      totalLessons,
      overallPercent: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0,
    };
  });
}
