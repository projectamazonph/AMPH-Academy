import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons';

export default function ContactPage() {
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
          <h1 className="text-4xl font-bold mb-4">Contact AMPH Academy</h1>
          <p className="text-muted-foreground text-lg">
            Have questions or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Contact Info */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mail" className="h-5 w-5 text-primary" />
              Get in Touch
            </h2>
            <p className="text-muted-foreground mb-6">
              Whether you have questions about the curriculum, need help with your account, 
              or want to explore partnership opportunities, our team is here to help.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="mail" className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Email:</strong> support@amph-academy.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="clock" className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span><strong className="text-foreground">Response Time:</strong> We typically respond within 24-48 hours</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="help-circle" className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li>
                <strong className="text-foreground block mb-1">How do I reset my password?</strong>
                Click &quot;Forgot Password&quot; on the sign-in page and enter your registered email. 
                You&apos;ll receive a reset link within a few minutes.
              </li>
              <li>
                <strong className="text-foreground block mb-1">Is AMPH Academy free to use?</strong>
                Yes — AMPH Academy offers free access to all core PPC training modules. 
                Premium features may be added in future updates.
              </li>
              <li>
                <strong className="text-foreground block mb-1">How do I track my learning progress?</strong>
                Your XP, level, and module progress are automatically saved as you complete 
                lessons and pass checkpoint quizzes.
              </li>
              <li>
                <strong className="text-foreground block mb-1">Can I suggest new content or features?</strong>
                Absolutely! We welcome feedback from our community. 
                Email us anytime with your suggestions.
              </li>
            </ul>
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
