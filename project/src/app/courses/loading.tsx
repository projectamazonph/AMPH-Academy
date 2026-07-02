export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-16">
        <div className="text-center mb-12">
          <div className="w-12 h-12 rounded-2xl bg-muted mx-auto mb-4 animate-pulse" />
          <div className="h-10 w-64 bg-muted rounded-lg mx-auto mb-3 animate-pulse" />
          <div className="h-5 w-96 bg-muted rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
