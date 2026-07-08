import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2">
            <Icon name="lightning" className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">AMPH Academy</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About AMPH Academy</h1>
          <p className="text-muted-foreground text-lg">
            Your Amazon PPC Command Center for mastering sponsored advertising.
          </p>
        </div>

        {/* Mission */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="target" className="h-5 w-5 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground">
              AMPH Academy empowers Amazon sellers and marketing professionals with 
              hands-on training through interactive PPC simulations. We believe the best 
              way to learn advertising is by doing — practicing bid decisions, keyword 
              triage, and campaign building in a risk-free environment.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="zap" className="h-5 w-5 text-primary" />
              What We Offer
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Interactive Simulations</strong> — Practice Campaign Builder, Bid Elevator, and STR Triage with instant feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Progress Tracking</strong> — Earn XP, level up, and track your mastery across all modules</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Expert Curriculum</strong> — Learn from 9 comprehensive modules covering PPC fundamentals to advanced strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="check" className="h-4 w-4 text-emerald-400 mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Mentor Support</strong> — Get AI-powered guidance and live class access for personalized learning</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="users" className="h-5 w-5 text-primary" />
              Built by Amazon PPC Experts
            </h2>
            <p className="text-muted-foreground">
              AMPH Academy was created by a team of Amazon advertising professionals 
              with combined experience managing millions in ad spend. Our simulations 
              are based on real-world scenarios and best practices from the frontlines 
              of Amazon PPC.
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mail" className="h-5 w-5 text-primary" />
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Have questions or feedback? We&apos;d love to hear from you. 
              Reach out to our team and we&apos;ll get back to you as soon as possible.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Icon name="lightning" className="h-4 w-4 text-primary" />
            <span>AMPH — Amazon PPC Command Center</span>
          </div>
          <p>&copy; {new Date().getFullYear()} AMPH Academy. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
}
