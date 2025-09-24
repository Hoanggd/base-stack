import React from 'react'
import { Logo } from '@/components/Logo'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { Link } from '@workspace/ui/components/Link'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GITHUB_URL } from '@/constants/common'

export function SidebarHeader() {
    return (
        <div className="h-full flex items-center px-6">
            <Logo showName={false} />
            <Link href={GITHUB_URL} target="_blank" className="ml-auto" variant="ghost" size="icon">
                <GithubIcon />
            </Link>
            <ThemeSwitcher />
        </div>
    )
}
