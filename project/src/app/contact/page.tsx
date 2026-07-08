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
            Got questions? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Contact Info */}
        <Card className="mb-8 border-primary/20">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mail" className="h-5 w-5 text-primary" />
              Get in Touch
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Icon name="mail" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Email</strong>
                  <p>support@amphacademy.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Response Time</strong>
                  <p>We typically respond within 24-48 hours on business days.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="users" className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-foreground">Community</strong>
                  <p>Join our Discord or Facebook group to connect with fellow Amazon PPC learners.</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Contact Form Placeholder */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="mail" className="h-5 w-5 text-primary" />
              Send us a Message
            </h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your full name"
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  placeholder="How can we help?"
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Or email us directly at{' '}
              <a href="mailto:support@amphacademy.com" className="text-primary hover:underline">
                support@amphacademy.com
              </a>
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
