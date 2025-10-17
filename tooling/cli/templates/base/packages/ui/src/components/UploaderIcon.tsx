import { cn } from '@workspace/ui/lib/utils'

interface UploaderIconProps {
    extension: string
    className?: string
}

const iconColors = {
    pdf: '#C02626', // deep red
    csv: '#15803D', // deep green
    xlsx: '#15803D', // deep green
    xls: '#15803D', // deep green
    docx: '#1E40AF', // deep blue
    doc: '#1E40AF', // deep blue
    pptx: '#C2410C', // deep orange
    ppt: '#C2410C', // deep orange
    txt: '#525252', // dark gray
    json: '#B45309', // dark amber
    jpg: '#EA580C', // dark orange
    jpeg: '#EA580C', // dark orange
    png: '#0284C7', // deep blue
    gif: '#7E22CE', // purple
    svg: '#0369A1', // deep blue
    webp: '#166534', // green
    mp4: '#7C3AED', // deep violet
    avi: '#BE123C', // deep rose
    other: '#1D4ED8', // deep blue
} as Record<string, string>

export function UploaderIcon({ extension = 'txt', className }: UploaderIconProps) {
    const fill = iconColors[extension] || '#1D4ED8'

    return (
        <div className={cn('relative w-fit h-fit', className)}>
            <svg
                className="size-8"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="41"
                fill="none"
                viewBox="0 0 40 41"
            >
                <g clipPath="url(#clip0_2001_3547)">
                    <path
                        strokeWidth="1.5"
                        className="stroke-neutral-300 dark:stroke-neutral-600"
                        d="M9 1.453h17.044L34.25 8.99v27.713a3.25 3.25 0 0 1-3.25 3.25H9a3.25 3.25 0 0 1-3.25-3.25v-32A3.25 3.25 0 0 1 9 1.453Z"
                    ></path>
                    <path
                        className="fill-neutral-300 dark:fill-neutral-600"
                        d="M25 1.703h8.5zm8.5 9.5H26a2 2 0 0 1-2-2h9.5zm-7.5 0a2 2 0 0 1-2-2v-7.5h2v9.5m7.5-9.5v8.5z"
                        mask="url(#path-2-inside-1_2001_3547)"
                    ></path>
                </g>
                <defs>
                    <clipPath id="clip0_2001_3547">
                        <path fill="#fff" d="M0 .703h40v40H0z"></path>
                    </clipPath>
                </defs>
            </svg>
            <div
                className="absolute top-[40%] text-[7px] leading-[7px] font-bold rounded-xs px-0.5 py-0.5 text-white"
                style={{ background: fill }}
            >
                {extension.toUpperCase()}
            </div>
        </div>
    )
}
