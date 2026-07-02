export default function ModuleLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-12">
        <div className="h-4 w-32 bg-muted rounded animate-pulse mb-8" />
        <div className="h-6 w-48 bg-muted rounded animate-pulse mb-3" />
        <div className="h-4 w-full bg-muted rounded animate-pulse mb-8" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
