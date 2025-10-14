'use client'

import axios from 'axios'
import React from 'react'
import { UploaderRules, useValidateFiles } from '@workspace/ui/components/Uploader.util'
import { UploaderFile, UploaderItem } from '@workspace/ui/components/UploaderItem'
import { UploaderTrigger } from '@workspace/ui/components/UploaderTrigger'
import { flushSync } from 'react-dom'

export interface UploaderProps {
    /** The action to upload the file. eg: https://api.example.com/upload */
    action: string

    /** The list type to display the files. */
    listType?: 'list' | 'card'

    /** The trigger type to display the uploader. */
    triggerType?: 'button' | 'dropzone'

    /** The value of the uploader. */
    value: Array<UploaderFile>

    /** The onChange handler to update the value of the uploader. */
    onChange: (value: Array<UploaderFile>) => void

    /** Array of allowed file extensions.
     * Since MIME type detection can be inconsistent accross platforms, file extension checks are used instead.
     * List the specific extensions you wish to permit, such as 'png' or 'jpg', instead of MIME types like 'image/png' or 'image/jpeg'.
     */
    acceptedFileExtensions?: UploaderRules['acceptedFileExtensions']

    /** The maximum number of files to upload. */
    maxFiles?: UploaderRules['maxFiles']

    /** The maximum file size to upload. In bytes. */
    maxFileSize?: UploaderRules['maxFileSize']

    /** Whether multiple files can be chosen at once. */
    allowMultiple?: UploaderRules['allowMultiple']
}

export function Uploader({
    action,
    value,
    onChange,
    acceptedFileExtensions = [],
    maxFiles = 20,
    maxFileSize,
    allowMultiple = true,
}: UploaderProps) {
    const [uploaderFiles, setUploaderFiles] = React.useState<Array<UploaderFile>>([])
    const validateFiles = useValidateFiles({
        maxFileSize,
        acceptedFileExtensions,
        maxFiles: maxFiles - uploaderFiles.length,
        allowMultiple,
    })

    const upload = (uploaderFile: UploaderFile) => {
        if (!uploaderFile.abortController || !uploaderFile.file) {
            return
        }

        const formData = new FormData()
        formData.append('file', uploaderFile.file)

        axios
            .post(action, formData, {
                signal: uploaderFile.abortController.signal,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))

                    // update the file percent
                    setUploaderFiles(old => {
                        return old.map(file => {
                            if (file.id === uploaderFile.id) {
                                return { ...file, percent: percentCompleted }
                            }
                            return file
                        })
                    })
                },
            })
            .then(response => {
                setUploaderFiles(old => {
                    return old.map(file => {
                        if (file.id === uploaderFile.id) {
                            return { ...file, status: 'done', url: response?.data?.url }
                        }
                        return file
                    })
                })
            })
            .catch(error => {
                setUploaderFiles(old => {
                    return old.map(file => {
                        if (file.id === uploaderFile.id) {
                            return {
                                ...file,
                                status: 'error',
                                percent: 0,
                                error:
                                    error?.response?.data?.message || error?.response?.data || 'Failed to upload file',
                            }
                        }
                        return file
                    })
                })
            })
    }

    const onDrop = (files: Array<File>) => {
        const acceptedFiles = validateFiles(files)

        const newUploaderFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(2, 15),
            name: file.name,
            size: file.size,
            extension: file.name.split('.').pop() ?? '',
            status: 'uploading' as const,
            percent: 0,
            file,
            abortController: new AbortController(),
        }))

        setUploaderFiles([...uploaderFiles, ...newUploaderFiles])

        for (const uploaderFile of newUploaderFiles) {
            upload(uploaderFile)
        }
    }

    const onDelete = (uploaderFile: UploaderFile) => {
        uploaderFile.abortController?.abort()
        setUploaderFiles(uploaderFiles.filter(f => f.id !== uploaderFile.id))
    }

    const onRetry = (uploaderFile: UploaderFile) => {
        // reset uploader file status
        setUploaderFiles(old => {
            return old.map(file => {
                if (file.id === uploaderFile.id) {
                    return { ...file, percent: 0, status: 'uploading', error: undefined }
                }
                return file
            })
        })

        // upload again
        upload(uploaderFile)
    }

    return (
        <div className="w-full grid gap-2">
            <UploaderTrigger
                onDrop={onDrop}
                acceptedFileExtensions={acceptedFileExtensions}
                maxFileSize={maxFileSize}
                allowMultiple={allowMultiple}
            />
            {uploaderFiles.map(file => (
                <UploaderItem key={file.id} file={file} onDelete={onDelete} onRetry={onRetry} />
            ))}
        </div>
    )
}
