import { EggspotIcon } from '@/shared/components/icons/Eggspot'
import Link from 'next/link'

const sponsors = [
    {
        id: 1,
        name: 'Eggspot',
        url: 'https://www.eggspot.app',
        logo: <EggspotIcon className="h-[30px] w-[150px]" />,
    },
    {
        id: 2,
    },
    {
        id: 3,
    },
]

export function SponsorSection() {
    return (
        <section className="px-3">
            <div className="px-3 py-5 border-x container max-w-screen-xl mx-auto space-y-2 md:py-14 md:px-8">
                <h2 className="text-2xl font-bold sm:text-4xl text-center">Free & open source</h2>
                <p className="text-base sm:text-lg text-center text-muted-foreground">
                    BaseStack is distributed under the MIT License and will always remain free and open source.
                    <br />
                    Huge thanks to our amazing sponsors and supporters.
                </p>
                <h2 className="text-2xl font-bold sm:text-4xl text-center mt-12">OSS Sponsors</h2>
                <div className="grid sm:grid-cols-3 gap-5 mt-6">
                    {sponsors.map(item => (
                        <Link href={item.url ?? '#'} target="_blank" key={item.id}>
                            <div className="bg-background/50 border rounded-xl p-4 min-h-30 flex items-center justify-center transition-colors hover:bg-background-secondary hover:[&>svg]:scale-105 [&>svg]:transition-all [&>svg]:duration-300">
                                {item.logo}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
