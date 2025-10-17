'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import { CustomUploadAction } from './UploaderDemo.utils'

export function UploaderValidation() {
    return (
        <Uploader
            action={new CustomUploadAction()}
            maxFileSize={100 * 1024 * 1024}
            acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
            maxFiles={3}
        />
    )
}
