'use client'

import { Toaster } from '@workspace/ui/components/toaster'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type SidebarLink = { to: string; children: React.ReactNode }

type SidebarLinkGroup = {
  label?: string
  links: SidebarLink[]
}

const sidebarGroups: SidebarLinkGroup[] = [
  {
    links: [{ to: '/', children: 'Home' }],
  },
  {
    label: 'Forms',
    links: [
      { to: '/examples/form/basic', children: 'Basic' },
      { to: '/examples/form/validation', children: 'Validation' },
      {
        to: '/examples/form/dependant-validation',
        children: 'Dependant Validation',
      },
      { to: '/examples/form/conditional', children: 'Conditional' },
      { to: '/examples/form/submission-errors', children: 'Submission Errors' },
      { to: '/examples/form/field-array', children: 'Field Array' },
      {
        to: '/examples/form/parse-and-transform',
        children: 'Parse and Transform',
      },
      { to: '/examples/form/large-form', children: 'Large Form' },
    ],
  },
]

export function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[200px_1fr] container max-w-screen-lg mx-auto mt-10">
      <div>
        <div className="sticky top-10 flex flex-col gap-8">
          {sidebarGroups.map((group, index) => (
            <div key={index} className="flex flex-col gap-1">
              {group.label && <h2 className="text-sm font-medium text-neutral-400 ">{group.label}</h2>}
              {group.links.map((link) => (
                <ActiveLink href={link.to} key={link.to}>
                  {link.children}
                </ActiveLink>
              ))}
            </div>
          ))}
        </div>
      </div>
      {children}
      <Toaster />
    </div>
  )
}

function ActiveLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  return (
    <Link href={href} className={isActive ? 'text-neutral-800 font-medium' : ''}>
      {children}
    </Link>
  )
}
