// @ts-nocheck
'use client'

import * as React from 'react'

import { TableOfContents } from '@/lib/toc'
import { cn } from '@workspace/ui/lib/utils'
import { useMounted } from '@/hooks/useMounted'
interface TocProps {
  toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
  const itemIds = React.useMemo(
    () =>
      toc.items
        ? toc.items
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc],
  )
  const activeHeading = useActiveItem(itemIds)
  const mounted = useMounted()

  if (!toc?.items?.length) {
    return null
  }

  return (
    <div>
      <h3 className="text-sm px-4 mb-2 font-semibold">Table of contents</h3>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  )
}

function useActiveItem(itemIds: string[]) {
  const [activeId, setActiveId] = React.useState(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` },
    )

    itemIds?.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      itemIds?.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [itemIds])

  return activeId
}

interface TreeProps {
  tree: TableOfContents
  level?: number
  activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree?.items?.length && level < 3 ? (
    <ul className={cn('list-none')}>
      {tree.items.map((item, index) => {
        return (
          <li key={index}>
            <a
              href={item.url}
              className={cn(
                'flex text-[13px] items-center min-h-7 py-0.5 text-muted-foreground border-l border-transparent',
                item.url === `#${activeItem}`
                  ? 'text-foreground border-foreground'
                  : 'hover:text-foreground hover:border-foreground/20',
              )}
              style={{ paddingLeft: `${level * 16}px` }}
            >
              {item.title}
            </a>
            {item.items?.length ? <Tree tree={item} level={level + 1} activeItem={activeItem} /> : null}
          </li>
        )
      })}
    </ul>
  ) : null
}
