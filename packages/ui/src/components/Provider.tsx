'use client'

import { Toaster } from '@workspace/ui/components/Sonner'
import { I18nProvider as ReactAriaI18nProvider } from 'react-aria-components'
import { ConfirmDialog } from '@workspace/ui/components/ConfirmDialog'
import '@workspace/ui/components/NProgress'
import 'nprogress/nprogress.css'

interface BsProviderProps {
    children: React.ReactNode
    locale?: string
}

/**
 * The BsProvider component supplies locale and theme context to the application, as well as toaster and confirm dialog functionality.
 */
export function BsProvider({ children, locale = 'en-GB' }: BsProviderProps) {
    return (
        <ReactAriaI18nProvider locale={locale}>
            {children}
            <Toaster />
            <ConfirmDialog />
        </ReactAriaI18nProvider>
    )
}
