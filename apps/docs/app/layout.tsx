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
    openGraph: {
        title: PROJECT_DESCRIPTION,
        description: PROJECT_DESCRIPTION,
        images: [{ url: '/images/og-image-2.jpg' }],
        siteName: PROJECT_NAME,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" translate="no" suppressHydrationWarning className={`${fontSans.className}`}>
            <head>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            </head>
            <body className={`antialiased text-secondary-foreground`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
