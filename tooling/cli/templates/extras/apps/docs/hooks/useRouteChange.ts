import React from 'react'
import { usePathname } from 'next/navigation'

interface UseRouteChangeOptions {
    onRouteChange?: (currentPath: string, previousPath: string | null) => void
    onRouteEnter?: (path: string) => void
    onRouteLeave?: (path: string) => void
    logChanges?: boolean
}

export function useRouteChange(options: UseRouteChangeOptions = {}) {
    const pathname = usePathname()
    const previousPathRef = React.useRef<string | null>(null)
    const { onRouteChange, onRouteEnter, onRouteLeave, logChanges = false } = options

    React.useEffect(() => {
        const currentPath = pathname
        const previousPath = previousPathRef.current

        // Log route changes if enabled
        if (logChanges) {
            console.log('Route changed:', {
                from: previousPath,
                to: currentPath,
                timestamp: new Date().toISOString(),
            })
        }

        // Call onRouteChange callback
        if (onRouteChange) {
            onRouteChange(currentPath, previousPath)
        }

        // Call onRouteLeave callback for previous route
        if (onRouteLeave && previousPath) {
            onRouteLeave(previousPath)
        }

        // Call onRouteEnter callback for current route
        if (onRouteEnter) {
            onRouteEnter(currentPath)
        }

        // Update previous path reference
        previousPathRef.current = currentPath
    }, [pathname, onRouteChange, onRouteEnter, onRouteLeave, logChanges])

    return {
        currentPath: pathname,
        previousPath: previousPathRef.current,
        hasChanged: previousPathRef.current !== null && previousPathRef.current !== pathname,
    }
}
