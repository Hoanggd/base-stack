'use client'

import { Button } from '@workspace/ui/components/Button'
import { Progress } from '@workspace/ui/components/Progress'
import { Tooltip, TooltipTrigger } from '@workspace/ui/components/Tooltip'
import { UploaderIcon } from '@workspace/ui/components/UploaderIcon'
import { formatFileSize, shortenFilename } from '@workspace/ui/lib/file'
import { cn } from '@workspace/ui/lib/utils'
import { RotateCwIcon, Trash2Icon } from 'lucide-react'

export interface UploaderFile {
    /** The unique identifier for the file. */
    id: string

    /** The size of the file. */
    size: number

    /** The name of the file. */
    name: string

    /** The extension of the file. Eg: 'png', 'pdf', etc.*/
    extension: string

    /** The URL of the file. */
    url?: string

    /** The status of the file upload. */
    status?: 'done' | 'error' | 'uploading'

    /** The percent of the file upload. */
    percent?: number

    /** The thumbnail URL of the file. */
    thumbUrl?: string

    /** The error message of the file upload. */
    error?: any

    /** The file. */
    file?: File

    /** The abort controller for canceling the upload request. */
    abortController?: AbortController
}

export interface UploaderItemProps {
    file: UploaderFile
    onDelete: (file: UploaderFile) => void
    onRetry: (file: UploaderFile) => void
}

export function UploaderItem({ file, onDelete, onRetry }: UploaderItemProps) {
    const { error, percent } = file
    console.log('error', error)
    console.log('percent', percent)
    const isInvalid = !!error

    return (
        <div
            className={cn(
                'relative border transition-colors bg-background-secondary hover:bg-background-tertiary/70 rounded-lg p-1.5 w-full',
                isInvalid && 'border-destructive-foreground bg-destructive/10',
            )}
        >
            <div className="flex gap-1 items-center">
                {/* preview  */}
                <div className="size-11 rounded grid place-items-center">
                    <UploaderIcon extension={file.extension} />
                </div>

                {/* file info */}
                <div className="relative flex-1 flex flex-col gap-0.5">
                    <span className="text-sm font-medium leading-3.5">{shortenFilename(file.name)}</span>

                    {error && <span className="text-xs text-destructive-foreground">{error}</span>}
                    {!error && <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>}

                    <div className="absolute -bottom-[5px] left-0 right-0">
                        <Progress value={percent} barClassName={cn('h-1', isInvalid && 'opacity-0')} />
                    </div>
                </div>

                {/* file action */}
                <div className="flex">
                    {file.status === 'error' && (
                        <TooltipTrigger>
                            <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => onRetry(file)}
                                className="text-muted-foreground"
                            >
                                <RotateCwIcon />
                            </Button>
                            <Tooltip>Retry</Tooltip>
                        </TooltipTrigger>
                    )}
                    <TooltipTrigger>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => onDelete(file)}
                            className="text-muted-foreground"
                        >
                            <Trash2Icon />
                        </Button>
                        <Tooltip>Delete</Tooltip>
                    </TooltipTrigger>
                </div>
            </div>
        </div>
    )
}
