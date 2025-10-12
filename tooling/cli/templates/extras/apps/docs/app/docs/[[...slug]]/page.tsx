import { TocPortal } from '@/app/docs/[[...slug]]/_components/TocPortal'
import { Mdx } from '@/components/Mdx'
import { DashboardTableOfContents } from '@/components/Toc'
import { getTableOfContents } from '@/lib/toc'
import { Button } from '@workspace/ui/components/Button'
import { ScrollArea } from '@workspace/ui/components/ScrollArea'
import { cn } from '@workspace/ui/lib/utils'
import { allDocs } from 'contentlayer/generated'
import { ArrowUpRight } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface DocPageProps {
    params: Promise<{
        slug: string[]
    }>
}

export async function generateStaticParams(): Promise<Awaited<DocPageProps['params']>[]> {
    return allDocs.map(doc => ({
        slug: doc._raw.flattenedPath.split('/'),
    }))
}

async function getDocFromParams({ params }: DocPageProps) {
    const { slug: slugArray } = await params
    const slug = slugArray?.join('/') || ''
    const doc = allDocs.find(doc => doc.slugAsParams === slug)

    if (!doc) {
        return null
    }

    return doc
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
    const doc = await getDocFromParams({ params })

    if (!doc) {
        return {}
    }

    return {
        title: doc.title,
    }
}

export default async function DocPage({ params }: DocPageProps) {
    const doc = await getDocFromParams({ params })

    if (!doc) notFound()

    const toc = await getTableOfContents(doc.body.raw)

    return (
        <>
            <article
                className={cn(
                    'prose dark:prose-invert prose-neutral mb-6 max-w-full min-w-0 w-full py-10',
                    'prose-headings:font-semibold prose-h1:tracking-tight prose-h1:font-bold prose-headings:scroll-mt-20',
                    'prose-h2:mb-0 prose-h3:mt-7! prose-h3:mb-0 prose-h4:mb-0 prose-h4:mt-3 prose-h5:mb-0 prose-h5:mt-3 prose-h6:mb-0 prose-h6:mt-3',
                    'prose-blockquote:font-normal prose-blockquote:mx-5 prose-blockquote:px-4! lg:prose-blockquote:mx-10 prose-blockquote:mb-0',
                    'prose-ul:list-inside prose-ol:list-inside prose-ul:mt-1.5 prose-ul:mb-0 prose-ol:mt-3 prose-ol:mb-0',
                    'prose-li:mt-1 prose-li:mb-0 prose-li:px-0',
                    'prose-p:mt-3! prose-p:mb-0!',
                    'prose-img:my-5',
                )}
            >
                <div className="mb-10 px-5 lg:px-10 border-b pb-10">
                    <h1 className="mb-0 font-mono text-[40px]">{doc.title}</h1>
                    <p className="text-muted-foreground not-prose mt-2 mb-2">{doc.description}</p>
                    {doc.originalDocs && (
                        <Button variant="outline" size="sm" asChild>
                            <Link href={doc.originalDocs} target="_blank">
                                Docs <ArrowUpRight />
                            </Link>
                        </Button>
                    )}
                </div>
                <Mdx code={doc.body.code} />
            </article>
            <TocPortal>
                <ScrollArea className="-ml-px h-[90%]">
                    <div className="h-10"></div>
                    <DashboardTableOfContents toc={toc} />
                    <div className="h-10"></div>
                </ScrollArea>
            </TocPortal>
        </>
    )
}
