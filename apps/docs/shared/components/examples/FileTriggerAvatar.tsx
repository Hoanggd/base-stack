'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@workspace/ui/components/Avatar'
import { Button } from '@workspace/ui/components/Button'
import { UploadIcon } from 'lucide-react'
import React from 'react'
import { FileTrigger } from 'react-aria-components'

export function FileTriggerAvatar() {
    const [file, setFile] = React.useState<File | null>(null)
    const previewUrl = file ? URL.createObjectURL(file) : null

    return (
        <div className="flex gap-3 text-sm items-center">
            <Avatar className="size-20">
                {previewUrl && <AvatarImage src={previewUrl} alt="avatar" />}
                <AvatarFallback className="text-lg">CN</AvatarFallback>
            </Avatar>
            <FileTrigger
                acceptedFileTypes={['.png', '.jpg', '.jpeg']}
                onSelect={e => {
                    const files = e ? Array.from(e) : []
                    setFile(files[0])
                }}
            >
                <Button variant="outline">
                    <UploadIcon /> Select a file
                </Button>
            </FileTrigger>
        </div>
    )
}
