'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BsProvider } from '@workspace/ui/components/Provider'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

dayjs.extend(isoWeek)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
})

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <BsProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableColorScheme>
                <NuqsAdapter>
                    <QueryClientProvider client={queryClient}>
                        {children}
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </NuqsAdapter>
            </ThemeProvider>
        </BsProvider>
    )
}
