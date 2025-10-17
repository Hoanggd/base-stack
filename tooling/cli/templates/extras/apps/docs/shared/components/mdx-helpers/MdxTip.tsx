import { InfoIcon } from 'lucide-react'

interface MdxTipProps {
    children: React.ReactNode
    title: string
}

export function MdxTip({ children, title = 'Note' }: MdxTipProps) {
    return (
        <div className="p-5 lg:px-10 pt-0 lg:pt-0 mt-4">
            <div className="border border-primary-foreground bg-primary/5 rounded-xl p-5">
                <div className="flex items-center gap-2">
                    <InfoIcon className="size-4 text-primary-foreground" />
                    <span className="font-medium text-primary-foreground">{title}</span>
                </div>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    )
}
