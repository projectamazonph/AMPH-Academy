import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication — ProjectAMPH Academy",
  description:
    "Sign in or create your ProjectAMPH Academy account to access Amazon PPC training, simulations, and certifications.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
