import * as React from 'react'

export function CrossIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="none"
            viewBox="0 0 23 23"
            className={className}
        >
            <path fill="var(--background)" d="M0 0h23v23H0z"></path>
            <path stroke="var(--color-border)" d="M4 11.5h8M11 11.5h8M11.5 11v8M11.5 4v8"></path>
        </svg>
    )
}
