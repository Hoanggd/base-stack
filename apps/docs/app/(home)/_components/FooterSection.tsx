import Link from 'next/link'
import { GITHUB_URL, GITHUB_URL_AUTHOR } from '@/constants/common'

export function FooterSection() {
    return (
        <footer className="py-12">
            <div className="container max-w-screen-xl mx-auto">
                <p className="text-center text-muted-foreground">
                    Built by{' '}
                    <Link href={GITHUB_URL_AUTHOR} className="underline" target="_blank">
                        hoanggd
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
