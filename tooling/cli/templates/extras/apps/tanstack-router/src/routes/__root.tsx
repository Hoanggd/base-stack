import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Providers } from '@/shared/components/Providers'

export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <Providers>
            <Outlet />
            <TanStackRouterDevtools position="bottom-right" />
        </Providers>
    )
}
