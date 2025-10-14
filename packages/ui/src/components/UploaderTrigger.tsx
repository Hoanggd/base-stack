'use client'

import { Button } from '@workspace/ui/components/Button'
import { formatFileSize } from '@workspace/ui/lib/file'
import { cn } from '@workspace/ui/lib/utils'
import { UploadIcon } from 'lucide-react'
import { DropZone, FileDropItem, FileTrigger } from 'react-aria-components'

interface UploaderTriggerProps {
    onDrop: (files: Array<File>) => void
    acceptedFileExtensions?: string[]
    maxFileSize?: number
    allowMultiple?: boolean
}

export function UploaderTrigger({
    onDrop,
    acceptedFileExtensions,
    maxFileSize,
    allowMultiple = true,
}: UploaderTriggerProps) {
    return (
        <DropZone
            onDrop={async e => {
                const dropItems = e.items as Array<FileDropItem>
                const filePromises = dropItems.map(file => file.getFile())
                const files = await Promise.all(filePromises)
                onDrop(files)
            }}
            className={cn(
                'flex flex-col gap-3 items-center justify-center shadow-sm',
                'text-sm font-medium border border-dashed bg-background-secondary rounded-lg py-7 px-3 min-h-[150px] w-full',
                'transition-all data-[drop-target]:border-solid data-[drop-target]:border-primary data-[drop-target]:bg-primary/15',
            )}
        >
            <div className="size-10 rounded-sm grid place-items-center bg-background-tertiary text-muted-foregroun opacity-60">
                <UploadIcon className="size-5" />
            </div>
            <div className="space-y-0.5 text-center">
                <p className="font-semibold">Choose file or drag & drop to upload</p>
                {acceptedFileExtensions && (
                    <p className="text-muted-foreground">Supported file types: {acceptedFileExtensions?.join(', ')}</p>
                )}
                {maxFileSize && <p className="text-muted-foreground">Max file size: {formatFileSize(maxFileSize)}</p>}
            </div>
            <FileTrigger
                allowsMultiple={allowMultiple}
                acceptedFileTypes={acceptedFileExtensions?.map(extension => `.${extension}`)}
                onSelect={e => {
                    if (!e) return

                    const files = Array.from(e)
                    console.log(files)
                    onDrop(files)
                }}
            >
                <Button variant="outline">Browse</Button>
            </FileTrigger>
        </DropZone>
    )
}
