import { DashboardLayout } from './DashboardLayout'
import { cookies } from 'next/headers'

interface LayoutProps {
    children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
    const cookieStore = await cookies()
    const defaultOpen = cookieStore.get('sidebar_state')?.value !== 'false'

    return <DashboardLayout defaultOpen={defaultOpen}>{children}</DashboardLayout>
}
