import { Zap, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
            <Zap className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Forgot Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we&apos;ll send you a reset link.
            <br />
            <span className="text-xs text-muted-foreground/60">
              Password reset is coming soon. Contact support for help.
            </span>
          </p>
        </div>

        <div className="rounded-lg border border-border/40 bg-card/50 p-6 text-center">
          <Mail className="h-8 w-8 text-primary mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Password reset functionality will be available in the next update.
          </p>
          <p className="text-xs text-muted-foreground/60 mt-2">
            In the meantime, please contact Ryan via the ProjectAmazonPH Facebook group.
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to sign in
          </Link>
        </div>

        <div className="text-center text-[10px] text-muted-foreground/50">
          ProjectAMPH Academy — Amazon PPC Command Center
        </div>
      </div>
    </div>
  );
}
