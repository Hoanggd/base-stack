import { BsProvider } from '@workspace/ui/components/Provider'
import { ThemeProvider } from './ThemeProvider'

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <BsProvider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                {children}
            </ThemeProvider>
        </BsProvider>
    )
}
