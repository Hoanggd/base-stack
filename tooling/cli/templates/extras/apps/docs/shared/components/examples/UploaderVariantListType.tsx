'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import { UploaderFile } from '@workspace/ui/components/UploaderItem'
import { CustomUploaderAction } from './UploaderDemo.utils'

const exampleFileList: Array<UploaderFile> = [
    {
        id: '1',
        name: 'sample4.csv',
        status: 'done',
        size: 7.7 * 1024,
        extension: 'csv',
        percent: 100,
        type: 'text/csv',
        url: 'https://filesamples.com/samples/document/csv/sample4.csv',
    },
    {
        id: '2',
        name: 'sample2.doc',
        status: 'done',
        size: 32 * 1024,
        extension: 'doc',
        percent: 100,
        type: 'application/msword',
        url: 'https://filesamples.com/samples/document/doc/sample2.doc',
    },
]

export function UploaderVariantListType() {
    return (
        <Uploader
            action={new CustomUploaderAction()}
            maxFileSize={100 * 1024 * 1024}
            defaultFileList={exampleFileList}
            listType="card"
        />
    )
}
