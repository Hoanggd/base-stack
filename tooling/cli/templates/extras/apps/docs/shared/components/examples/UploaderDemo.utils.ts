import { UploaderAction } from '@workspace/ui/components/Uploader'
import { AxiosResponse } from 'axios'

interface TmpResponse {
    status: string
    data: {
        url: string
    }
}

export class CustomUploaderAction extends UploaderAction {
    constructor() {
        super('https://tmpfiles.org/api/v1/upload')
    }

    formatResponse(response: AxiosResponse<TmpResponse>) {
        const url = response.data?.data?.url
        const id = url.split('/').slice(-2).join('/')
        const downloadUrl = `https://tmpfiles.org/dl/${id}`

        return {
            id: url,
            url: downloadUrl,
        }
    }
}
