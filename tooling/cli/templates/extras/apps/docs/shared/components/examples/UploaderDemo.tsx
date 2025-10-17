'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import React from 'react'
import { CustomUploadAction } from './UploaderDemo.utils'

export function UploaderDemo() {
    return <Uploader action={new CustomUploadAction()} maxFileSize={100 * 1024 * 1024} />
}
