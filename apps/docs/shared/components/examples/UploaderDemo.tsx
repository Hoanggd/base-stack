'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import { CustomUploaderAction } from './UploaderDemo.utils'

export function UploaderDemo() {
    return <Uploader action={new CustomUploaderAction()} maxFileSize={100 * 1024 * 1024} />
}
