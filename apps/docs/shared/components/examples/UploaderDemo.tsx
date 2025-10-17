'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'
import React from 'react'

export function UploaderDemo() {
    return <Uploader action={new UploaderAction('/api/demo-upload')} maxFileSize={1024 * 1024} />
}
