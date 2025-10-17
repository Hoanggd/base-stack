'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import { CustomUploaderAction } from './UploaderDemo.utils'

export function UploaderValidation() {
    return (
        <Uploader
            action={new CustomUploaderAction()}
            maxFileSize={100 * 1024 * 1024}
            acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
            maxFiles={3}
        />
    )
}
