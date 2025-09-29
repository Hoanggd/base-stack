'use client'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/navigation'
import { RouterProvider } from 'react-aria-components'
import { Toaster } from '@workspace/ui/components/Sonner'
import { I18nProvider as ReactAriaI18nProvider } from 'react-aria-components'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ConfirmDialog } from '@workspace/ui/components/ConfirmDialog'

dayjs.extend(isoWeek)

declare module 'react-aria-components' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
})

export function Providers({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    return (
        <RouterProvider navigate={router.push}>
            <ReactAriaI18nProvider locale="en-GB">
                <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableColorScheme>
                    <NuqsAdapter>
                        <QueryClientProvider client={queryClient}>
                            {children}
                            <ReactQueryDevtools initialIsOpen={false} />
                        </QueryClientProvider>
                    </NuqsAdapter>
                    <Toaster />
                    <ConfirmDialog />
                </ThemeProvider>
            </ReactAriaI18nProvider>
        </RouterProvider>
    )
}
