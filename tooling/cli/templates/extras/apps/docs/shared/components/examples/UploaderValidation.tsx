'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'
import React from 'react'

export function UploaderValidation() {
    return (
        <Uploader
            action={new UploaderAction('/api/demo-upload')}
            maxFileSize={1024 * 1024}
            acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
            maxFiles={3}
        />
    )
}
