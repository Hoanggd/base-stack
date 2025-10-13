import Link from 'next/link'
import { GITHUB_URL, GITHUB_URL_AUTHOR } from '@/shared/consts/common'

export function FooterSection() {
    return (
        <footer className="px-3">
            <div className="px-3 border-x py-6 container max-w-screen-xl mx-auto md:py-12">
                <p className="text-center text-muted-foreground text-sm">
                    Built by{' '}
                    <Link href={GITHUB_URL_AUTHOR} className="underline" target="_blank">
                        Henry Pham
                    </Link>
                    . Check out the source on{' '}
                    <Link href={GITHUB_URL} className="underline" target="_blank">
                        GitHub
                    </Link>
                    .
                </p>
            </div>
        </footer>
    )
}
