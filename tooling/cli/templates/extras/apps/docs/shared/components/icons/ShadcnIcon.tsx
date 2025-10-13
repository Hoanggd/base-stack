import { cn } from '@workspace/ui/lib/utils'
import * as React from 'react'

export function ShadcnIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={cn('size-5', className)} viewBox="0 0 256 256">
            <path fill="none" d="M0 0h256v256H0z"></path>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="m208 128-80 80M192 40 40 192"
            ></path>
        </svg>
    )
}
