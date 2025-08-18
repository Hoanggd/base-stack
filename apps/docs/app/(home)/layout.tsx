import { LandingPageLayout } from "@/layouts/LandingPageLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <LandingPageLayout>{children}</LandingPageLayout>;
}