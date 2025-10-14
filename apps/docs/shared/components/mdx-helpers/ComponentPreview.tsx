import { CopyToClipboard } from '@/shared/components/CopyToClipboard'
import { readExampleFile } from '@/shared/lib/composition'
import { highlightCode } from '@/shared/lib/highlight-code'
import { ScrollArea } from '@workspace/ui/components/ScrollArea'
import { cn } from '@workspace/ui/lib/utils'
import dynamic from 'next/dynamic'
import { ComponentPreviewCollapsible } from './ComponentPreviewCollapsible'

export type ComponentPreviewProps = {
    name: string
    className?: string
}

export async function ComponentPreview({ name, className }: ComponentPreviewProps) {
    // get code string from component
    const code = await readExampleFile(name)
    const out = await highlightCode(code)

    return (
        <div className="border-b p-5! lg:p-10! pt-0! lg:pt-0! w-full mt-4">
            <div className="p-1.5 space-y-1.5 border rounded-xl bg-background">
                <div className={cn('p-5 min-h-[100px] not-prose flex items-center justify-center', className)}>
                    <Preview name={name} />
                </div>

                <div className="relative border rounded-md overflow-hidden ">
                    <CopyToClipboard text={code} className="absolute right-2 top-2 z-[1]" />
                    <div className="">
                        <ScrollArea className="grid" showVerticalScrollbar={false}>
                            <ComponentPreviewCollapsible html={out} />
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Preview({ name }: { name: string }) {
    const Component = dynamic(() =>
        import(`../examples/${name}`).then(res => {
            const comp = res[name]

            if (!comp) {
                throw new Error(`Component "${name}" not found in module`)
            }

            return comp
        }),
    )

    return <Component />
}
