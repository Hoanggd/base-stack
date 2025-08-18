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

export function PhasorUiIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#4F46E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m13.01 2.92 5.9 2.62c1.7.75 1.7 1.99 0 2.74l-5.9 2.62c-.67.3-1.77.3-2.44 0l-5.9-2.62c-1.7-.75-1.7-1.99 0-2.74l5.9-2.62c.67-.3 1.77-.3 2.44 0"
      ></path>
      <path
        stroke="#4F46E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 11c0 .84.63 1.81 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.77-.34 1.4-1.31 1.4-2.15"
        opacity="0.4"
      ></path>
      <path
        stroke="#4F46E5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 16c0 .93.55 1.77 1.4 2.15l6.79 3.02c.52.23 1.11.23 1.62 0l6.79-3.02c.85-.38 1.4-1.22 1.4-2.15"
        opacity="0.4"
      ></path>
    </svg>
  )
}

export function PhasorFormIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#059669"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 4h1a3 3 0 0 1 3 3 3 3 0 0 1 3-3h1M13 20h-1a3 3 0 0 1-3-3 3 3 0 0 1-3 3H5"
      ></path>
      <path
        stroke="#059669"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1M13 8h7a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-7"
        opacity="0.4"
      ></path>
      <path stroke="#059669" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7v10"></path>
    </svg>
  )
}

export function PhasorTemplateIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        stroke="#F97316"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 4.5V18c0 1.08-.44 2.07-1.14 2.79l-.04.04c-.09.09-.19.18-.28.25-.3.26-.64.46-.99.6-.11.05-.22.09-.33.13-.39.13-.81.19-1.22.19-.27 0-.54-.03-.8-.08-.13-.03-.26-.06-.39-.1-.16-.05-.31-.1-.46-.17 0-.01 0-.01-.01 0-.28-.14-.55-.3-.8-.49l-.01-.01c-.13-.1-.25-.2-.36-.32s-.22-.24-.33-.37c-.19-.25-.35-.52-.49-.8.01-.01.01-.01 0-.01 0 0 0-.01-.01-.02-.06-.14-.11-.29-.16-.44a6 6 0 0 1-.1-.39c-.05-.26-.08-.53-.08-.8V4.5C2 3 3 2 4.5 2h3C9 2 10 3 10 4.5"
      ></path>
      <path
        stroke="#F97316"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M22 16.5v3c0 1.5-1 2.5-2.5 2.5H6c.41 0 .83-.06 1.22-.19.11-.04.22-.08.33-.13.35-.14.69-.34.99-.6.09-.07.19-.16.28-.25l.04-.04 6.8-6.79h3.84c1.5 0 2.5 1 2.5 2.5"
        opacity="0.4"
      ></path>
      <path
        stroke="#F97316"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M4.81 21.82c-.6-.18-1.17-.51-1.64-.99-.48-.47-.81-1.04-.99-1.64a4.02 4.02 0 0 0 2.63 2.63M18.37 11.29 15.66 14l-6.8 6.79C9.56 20.07 10 19.08 10 18V8.34l2.71-2.71c1.06-1.06 2.48-1.06 3.54 0l2.12 2.12c1.06 1.06 1.06 2.48 0 3.54"
      ></path>
      <path
        stroke="#F97316"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        opacity="0.4"
      ></path>
    </svg>
  )
}
