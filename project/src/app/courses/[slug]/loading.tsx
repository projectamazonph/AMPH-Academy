export default function CourseDetailLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-8" />
        <div className="flex gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-muted animate-pulse shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-32 bg-muted rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        </div>
        <div className="space-y-3 mt-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
