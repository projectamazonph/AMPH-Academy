import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — ProjectAMPH Academy",
  description:
    "Your ProjectAMPH Academy dashboard. Track learning progress, access PPC simulations (Campaign Builder, Bid Elevator, STR Triage), view leaderboards, and manage your certifications.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
