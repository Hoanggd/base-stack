'use client'

import { Button } from '@workspace/ui/components/Button'
import { shortenFilename } from '@workspace/ui/lib/file'
import { UploadIcon } from 'lucide-react'
import React from 'react'
import { FileTrigger } from 'react-aria-components'

export function FileTriggerDemo() {
    const [file, setFile] = React.useState<string>('')

    return (
        <div className="flex gap-2 text-sm items-center">
            <FileTrigger
                onSelect={e => {
                    const files = e ? Array.from(e) : []
                    setFile(files[0]?.name || '')
                }}
            >
                <Button variant="outline">
                    <UploadIcon /> Select a file
                </Button>
            </FileTrigger>
            {file && shortenFilename(file)}
        </div>
    )
}
