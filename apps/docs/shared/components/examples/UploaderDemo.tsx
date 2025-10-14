'use client'

import { Uploader } from '@workspace/ui/components/Uploader'
import { UploaderFile } from '@workspace/ui/components/UploaderItem'
import React from 'react'

const exampleFileList: Array<UploaderFile> = [
    {
        id: '-1',
        name: 'Alexandra_BennettAlexandra_BennettAlexandra_BennettAlexandra_BennettAlexandra_Bennett.pdf',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        size: 2_000_220_000,
        extension: 'pdf',
        percent: 100,
    },
    {
        id: '-0',
        name: 'Alexandra_Bennett.pdf',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        size: 2555233520,
        extension: 'pdf',
        percent: 100,
        error: 'Failed to upload',
    },
    {
        id: '-2',
        name: 'Michael_Garcia.docx',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        size: 100020,
        extension: 'docx',
        percent: 10,
    },
    {
        id: '-3',
        name: 'Samantha_Murphy.jpg',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        size: 242330,
        extension: 'jpg',
        percent: 48,
    },
    {
        id: '-4',
        name: 'Liam_Smith.csv',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        size: 23200,
        extension: 'csv',
        percent: 0,
    },
]

export function UploaderDemo() {
    const [fileList, setFileList] = React.useState<UploaderFile[]>(exampleFileList)

    return (
        <div className="w-full">
            <Uploader
                action="http://localhost:8080/upload"
                value={fileList}
                onChange={setFileList}
                // acceptedFileExtensions={['pdf', 'docx', 'png', 'csv']}
                // maxFileSize={500 * 1024}
                // maxFiles={3}
            />
        </div>
    )
}
