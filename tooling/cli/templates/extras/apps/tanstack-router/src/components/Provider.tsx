import { BsProvider } from '@workspace/ui/components/Provider'

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return <BsProvider>{children}</BsProvider>
}
