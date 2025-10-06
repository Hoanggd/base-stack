
import { Providers } from '@/components/Providers'
import '@workspace/ui/globals.css'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`font-sans antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
