'use client'
import { useMounted } from '@/hooks/useMounted'
import * as Portal from '@radix-ui/react-portal'

export function TocPortal({ children }: { children: React.ReactNode }) {
  const mounted = useMounted()

  if (!mounted) return null

  return <Portal.Root container={document.getElementById('toc') as HTMLDivElement}>{children}</Portal.Root>
}
