import { GithubIcon } from '@/components/icons/GithubIcon'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { GITHUB_URL } from '@/constants/common'
import { Link } from '@workspace/ui/components/Link'
import { DocsSearch } from '@/layouts/_shared/DocsSearch'

export function HeaderIconButtons() {
    return (
        <div className="flex items-center gap-1">
            <DocsSearch />
            <Link href={GITHUB_URL} target="_blank" className="ml-auto" variant="ghost" size="icon">
                <GithubIcon />
            </Link>
            <ThemeSwitcher />
        </div>
    )
}
