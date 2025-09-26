'use client'

import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { matchQuery, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@workspace/ui/components/Sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
    mutationCache: new MutationCache({
        onSuccess: (_data, _variables, _context, mutation) => {
            queryClient.invalidateQueries({
                predicate: query =>
                    // invalidate all matching tags at once
                    // or everything if no meta is provided
                    (mutation.meta?.invalidates as any)?.some((queryKey: any) => matchQuery({ queryKey }, query)) ??
                    true,
            })
        },
    }),
})

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableColorScheme>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
                <Toaster position="top-right" />
            </QueryClientProvider>
        </NextThemesProvider>
    )
}
