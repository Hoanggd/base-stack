import { ComponentPreview } from '@/shared/components/mdx-helpers/ComponentPreview'
import { MdxImage } from '@/shared/components/mdx-helpers/MdxImage'
import { ProjectFeatures } from '@/shared/components/ProjectFeatures'
import { Button } from '@workspace/ui/components/Button'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import Link from 'next/link'
import { MdxSnippet } from './MdxSnippet'
import { MdxTip } from './MdxTip'

type MdxProps = {
    code: string
}

const components = {
    Link,
    ComponentPreview,
    ProjectFeatures,
    Button,
    MdxImage,
    MdxTip,
    pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
        let lang = ''

        try {
            lang = (children as any).props.className?.split('language-')[1]
        } catch {
            lang = 'text'
        }

        return (
            <MdxSnippet lang={lang} {...props}>
                {children}
            </MdxSnippet>
        )
    },
    blockquote: ({ ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote style={{ quotes: 'none' }} {...props} />
    ),
    code: ({ ...props }: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="before:content-[''] after:content-[''] py-0.5 px-1.5 bg-background-tertiary rounded"
            {...props}
        />
    ),
    table: ({ ...props }: React.HTMLAttributes<HTMLTableElement>) => (
        <div>
            <table {...props} />
        </div>
    ),
}

export function Mdx({ code }: MdxProps) {
    const Component = useMDXComponent(code)

    return (
        <div className="mdx [&>*]:px-5 lg:[&>*]:px-10">
            <Component components={components} />
        </div>
    )
}
