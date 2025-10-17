'use client'

import { Uploader, UploaderAction } from '@workspace/ui/components/Uploader'
import { AxiosResponse } from 'axios'

interface TmpResponse {
    status: string
    data: {
        url: string
    }
}

/**
 *  In real-world usage, consider moving this class to
 *  shared folder to reuse throughout the application.
 *
 *  Alternatively, you can modify the UploaderAction class directly,
 *  since it is part of your own codebase.
 */
class CustomUploaderAction extends UploaderAction {
    constructor() {
        super('https://tmpfiles.org/api/v1/upload')
    }

    formatResponse(response: AxiosResponse<TmpResponse>) {
        const url = response.data.data.url
        const id = url.split('/').slice(-2).join('/')
        const downloadUrl = `https://tmpfiles.org/dl/${id}`

        return {
            id: response.data.data.url,
            url: downloadUrl,
        }
    }
}

export function UploaderCustom() {
    return <Uploader action={new CustomUploaderAction()} maxFileSize={100 * 1024 * 1024} />
}
