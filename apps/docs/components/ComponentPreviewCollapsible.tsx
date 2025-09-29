'use client'
import React from 'react'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/Button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ComponentPreviewCollapsibleProps {
    html: string
}

export function ComponentPreviewCollapsible({ html }: ComponentPreviewCollapsibleProps) {
    const [previewHeight, setPreviewHeight] = React.useState(0)
    const previewRef = React.useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const showCollapseButton = previewHeight > 200

    React.useEffect(() => {
        if (previewRef.current) {
            const preTag = previewRef.current.querySelector('pre')
            if (preTag) {
                setPreviewHeight(preTag.clientHeight)
            }
        }
    }, [])

    return (
        <div>
            <div
                ref={previewRef}
                dangerouslySetInnerHTML={{ __html: html }}
                className={cn('relative [&>pre]:my-0 [&>pre]:rounded-none [&>pre]:pb-8', !isOpen && 'max-h-[200px]')}
            />
            {showCollapseButton && (
                <div className="absolute bottom-0 right-0 left-0 h-16 flex items-center justify-center bg-gradient-to-t from-background-secondary to-transparent pointer-events-none">
                    <Button variant="outline" onClick={() => setIsOpen(!isOpen)} className="pointer-events-auto">
                        {isOpen ? (
                            <>
                                <ChevronUp />
                                Collapse code
                            </>
                        ) : (
                            <>
                                <ChevronDown />
                                Expand code
                            </>
                        )}
                    </Button>
                </div>
            )}
        </div>
    )
}
