import { GithubIcon } from '@/shared/components/icons/GithubIcon'
import { ThemeSwitcher } from '@/shared/components/ThemeSwitcher'
import { GITHUB_URL } from '@/shared/consts/common'
import { DocsSearch } from '@/shared/layouts/DocsSearch'
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
