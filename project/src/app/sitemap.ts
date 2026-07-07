import { MetadataRoute } from "next";
import { getCourses } from "@/modules/courses/_actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = "https://amph-academy.vercel.app";

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.1,
    },
    {
      url: `${BASE_URL}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.1,
    },
  ];

  // Dynamic course routes
  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const courses = await getCourses();
    courseRoutes = courses
      .filter((c) => c.isPublished)
      .map((course) => ({
        url: `${BASE_URL}/courses/${course.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
        images: [
          {
            url: `${BASE_URL}/og/course-${course.slug}.png`,
            title: course.title,
            caption: course.description,
          },
        ],
      }));
  } catch {
    // If DB is unavailable, skip dynamic routes
    courseRoutes = [];
  }

  return [...staticRoutes, ...courseRoutes];
}

export const dynamic = "force-dynamic";
