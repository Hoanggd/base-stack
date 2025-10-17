'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'

export function UploaderRetry() {
    return (
        <Uploader
            action={new UploaderAction('https://tmpfiles.org/api/v1/wrong-url')}
            maxFileSize={100 * 1024 * 1024}
        />
    )
}
