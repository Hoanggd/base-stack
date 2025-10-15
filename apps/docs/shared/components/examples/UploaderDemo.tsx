'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'
import React from 'react'

export function UploaderDemo() {
    return (
        <Uploader
            // You have to set the action to upload the files to your server.
            // action={new UploaderAction('http://yourapi.com/upload')}
            acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
            allowMultiple={false}
        />
    )
}
