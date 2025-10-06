import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Provider } from '@/components/Provider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Provider>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </Provider>
  )
}
