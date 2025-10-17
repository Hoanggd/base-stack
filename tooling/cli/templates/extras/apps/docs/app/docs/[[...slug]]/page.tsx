import { Article } from '@/features/docs/components/Article'
import { getTableOfContents } from '@/shared/lib/toc'
import { allDocs } from 'contentlayer/generated'
import { Metadata } from 'next'
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
        description: doc.description,
        openGraph: {
            title: doc.title,
            description: doc.description,
        },
    }
}

export default async function DocPage({ params }: DocPageProps) {
    const doc = await getDocFromParams({ params })

    if (!doc) notFound()

    const toc = await getTableOfContents(doc.body.raw)

    return <Article doc={doc} toc={toc} />
}
