import { Icon } from '@/components/icons';
import { notFound } from "next/navigation";
import Link from "next/link";
import { getModule } from "@/modules/courses/_actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default async function ModuleContentPage({
  params,
}: {
  params: Promise<{ slug: string; moduleId: string }>;
}) {
  const { slug, moduleId } = await params;
  const mod = await getModule(slug, moduleId);

  if (!mod) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        {/* Breadcrumb */}
        <Link
          href={`/courses/${slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <Icon name="arrow-left" className="h-3.5 w-3.5" />
          Back to course
        </Link>

        {/* Module Header */}
        <div className="mb-8">
          <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground mb-3">
            Module {mod.moduleNumber} of {mod.lessonCount} lessons
          </Badge>
          <div className="flex items-center gap-3 mb-2">
            <Icon name="book-open" className="h-6 w-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{mod.title}</h1>
          </div>
          <p className="text-muted-foreground">{mod.description}</p>
          <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Icon name="play" className="h-3.5 w-3.5" />
              {mod.lessonCount} lessons
            </span>
            <span className="flex items-center gap-1">
              <Icon name="clock" className="h-3.5 w-3.5" />
              {mod.estimatedMinutes} minutes
            </span>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-4">
          {mod.lessons.map((lesson) => (
            <Card
              key={lesson.id}
              className="border-border/40 bg-card/50 hover:bg-card/80 transition-colors"
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="mt-0.5">
                    {lesson.type === "QUIZ" ? (
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-amber-400">Q</span>
                      </div>
                    ) : lesson.type === "SIMULATION" ? (
                      <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-violet-400">S</span>
                      </div>
                    ) : lesson.type === "VIDEO" ? (
                      <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <Icon name="play" className="h-4 w-4 text-sky-400" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon name="book-open" className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{lesson.title}</h3>
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 font-mono text-muted-foreground"
                      >
                        {lesson.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="clock" className="h-3 w-3" />
                        {lesson.estimatedMinutes} min
                      </span>
                      <span className="flex items-center gap-1">
                        +{lesson.xpReward} XP
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Content Body (placeholder) */}
        <Card className="mt-8 border-border/40 bg-card/30">
          <CardContent className="p-8 text-center">
            <Icon name="book-open" className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Lesson Content Coming Soon</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Lesson content with MDX rendering, video embeds, and interactive
              components will be available in Sprint 2.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
