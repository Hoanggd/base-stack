import React from 'react'
import { usePathname } from 'next/navigation'

type RouteChangeListener = (currentPath: string, previousPath: string | null) => void

class RouteChangeManager {
    private listeners: Set<RouteChangeListener> = new Set()
    private currentPath: string | null = null

    subscribe(listener: RouteChangeListener) {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }

    notify(currentPath: string, previousPath: string | null) {
        this.currentPath = currentPath
        this.listeners.forEach(listener => {
            try {
                listener(currentPath, previousPath)
            } catch (error) {
                console.error('Error in route change listener:', error)
            }
        })
    }

    getCurrentPath() {
        return this.currentPath
    }
}

// Global instance
export const routeChangeManager = new RouteChangeManager()

export function useGlobalRouteChange(listener: RouteChangeListener) {
    const pathname = usePathname()
    const previousPathRef = React.useRef<string | null>(null)

    React.useEffect(() => {
        const currentPath = pathname
        const previousPath = previousPathRef.current

        // Notify global manager
        routeChangeManager.notify(currentPath, previousPath)

        // Update previous path reference
        previousPathRef.current = currentPath
    }, [pathname])

    React.useEffect(() => {
        // Subscribe to global route changes
        return routeChangeManager.subscribe(listener)
    }, [listener])
}

// Hook for components that just want to listen without being a source
export function useRouteChangeListener(listener: RouteChangeListener) {
    React.useEffect(() => {
        return routeChangeManager.subscribe(listener)
    }, [listener])
}

// Hook to get current route info
export function useCurrentRoute() {
    const pathname = usePathname()
    return {
        currentPath: pathname,
        globalCurrentPath: routeChangeManager.getCurrentPath(),
    }
}
