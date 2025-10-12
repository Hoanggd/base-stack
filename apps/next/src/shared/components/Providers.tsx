'use client'

import React from 'react'
import { ThemeProvider } from 'next-themes'
import { matchQuery, MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BsProvider } from '@workspace/ui/components/Provider'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
    mutationCache: new MutationCache({
        onSuccess: async (_data, _variables, _context, mutation) => {
            await queryClient.invalidateQueries({
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
        <BsProvider>
            <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange enableColorScheme>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </ThemeProvider>
        </BsProvider>
    )
}
