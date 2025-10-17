'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'
import { UploaderFile } from '@workspace/ui/components/UploaderItem'

class UploaderActionWithToken extends UploaderAction {
    constructor(protected readonly url: string) {
        super(url)
    }

    buildRequest(uploaderFile: UploaderFile) {
        const formData = new FormData()
        formData.append('file', uploaderFile.file!)

        return {
            url: this.url,
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer {fake-token}',
            },
        }
    }
}

export function UploaderCustomAction() {
    return <Uploader action={new UploaderActionWithToken('/api/demo-upload')} maxFileSize={1024 * 1024} />
}
