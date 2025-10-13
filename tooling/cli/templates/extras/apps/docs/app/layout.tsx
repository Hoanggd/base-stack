import '@workspace/ui/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PROJECT_DESCRIPTION, PROJECT_NAME } from '@/shared/consts/common'
import { Providers } from '@/shared/components/Providers'

const fontSans = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: {
        default: PROJECT_NAME,
        template: `%s | ${PROJECT_NAME}`,
    },
    description: PROJECT_DESCRIPTION,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" translate="no" suppressHydrationWarning className={`${fontSans.className}`}>
            <head>
                <link rel="icon" href="/logo.png" sizes="any" />
            </head>
            <body className={`antialiased text-foreground`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
