import { DocsLayout } from "@/layouts/Docs/DocsLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DocsLayout tocs={<div id="toc"></div>}>{children}</DocsLayout>;
}
