import { Card, CardContent } from '@/components/ui/card';
import { Icon } from '@/components/icons';

export default function TermsPage() {
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              Welcome to AMPH Academy. These Terms of Service (&quot;Terms&quot;) govern your use of 
              the AMPH Academy website and services. By accessing or using our platform, 
              you agree to be bound by these Terms.
            </p>
          </CardContent>
        </Card>

        {/* Sections */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By creating an account or using AMPH Academy, you acknowledge that you have 
              read, understood, and agree to be bound by these Terms. If you do not agree 
              to these Terms, you may not access or use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">2. Account Registration</h2>
            <p className="text-muted-foreground mb-3">
              To access certain features, you must create an account. You agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">3. Educational Services</h2>
            <p className="text-muted-foreground mb-3">
              AMPH Academy provides:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Interactive PPC advertising simulations</li>
              <li>Learning modules and educational content</li>
              <li>Progress tracking and achievement systems</li>
              <li>AI-powered mentor assistance</li>
            </ul>
            <p className="text-muted-foreground mt-3">
              We strive to provide accurate and helpful content, but we do not guarantee 
              that simulations or materials will precisely reflect real-world advertising outcomes.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">4. User Conduct</h2>
            <p className="text-muted-foreground mb-3">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Share your account credentials with others</li>
              <li>Use automated tools to scrape or extract content</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Upload malicious code or content</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              All content, simulations, and materials on AMPH Academy are owned by us or 
              our licensors and are protected by copyright and other intellectual property 
              laws. You may not reproduce, distribute, or create derivative works without 
              our permission.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">6. Disclaimer of Warranties</h2>
            <p className="text-muted-foreground">
              AMPH Academy is provided &quot;as is&quot; and &quot;as available&quot; without warranties of 
              any kind. We do not guarantee that our services will be uninterrupted, 
              error-free, or completely secure. The educational content provided should 
              not be considered professional advice for your specific business situation.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">7. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              To the maximum extent permitted by law, we shall not be liable for any 
              indirect, incidental, special, consequential, or punitive damages resulting 
              from your use of or inability to use our services.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">8. Account Termination</h2>
            <p className="text-muted-foreground">
              We reserve the right to suspend or terminate your account if you violate 
              these Terms or engage in prohibited conduct. You may also delete your account 
              at any time through your account settings.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms from time to time. We will notify you of significant 
              changes by posting a notice on our website or through email. Your continued 
              use after changes constitutes acceptance of the updated Terms.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-3">10. Contact Information</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@amph.academy" className="text-primary hover:underline">
                legal@amph.academy
              </a>
              .
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
