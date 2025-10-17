'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'

export function UploaderRetry() {
    return <Uploader action={new UploaderAction('/api/demo-upload-error')} maxFileSize={1024 * 1024} />
}
