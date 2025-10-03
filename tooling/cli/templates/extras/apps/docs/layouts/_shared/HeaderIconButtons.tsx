import { GithubIcon } from '@/components/icons/GithubIcon'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GITHUB_URL } from '@/constants/common'
import { DocsSearch } from '@/layouts/_shared/DocsSearch'
import { Button } from '@workspace/ui/components/Button'
import Link from 'next/link'

export function HeaderIconButtons() {
    return (
        <div className="flex items-center gap-1">
            <DocsSearch />
            <Button variant="ghost" size="icon" asChild>
                <Link href={GITHUB_URL}>
                    <GithubIcon />
                </Link>
            </Button>
            <ThemeSwitcher />
        </div>
    )
}
