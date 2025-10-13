import { DocsLayout } from '@/shared/layouts/DocsLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
    return <DocsLayout tocs={<div id="toc"></div>}>{children}</DocsLayout>
}
