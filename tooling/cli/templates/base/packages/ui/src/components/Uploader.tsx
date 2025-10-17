'use client'

import { toast } from '@workspace/ui/components/Sonner'
import { UploaderRules, useValidateFiles } from '@workspace/ui/components/Uploader.util'
import { UploaderFile, UploaderItem } from '@workspace/ui/components/UploaderItem'
import { UploaderTrigger, UploaderTriggerProps } from '@workspace/ui/components/UploaderTrigger'
import { cn } from '@workspace/ui/lib/utils'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import omit from 'lodash/omit'
import pickBy from 'lodash/pickBy'
import React from 'react'

/** The action to upload the files. You can update or override the methods to suit your API's request and response formats. */
export class UploaderAction {
    constructor(protected readonly url: string) {}

    /** Build the request to upload the file. */
    buildRequest(uploaderFile: UploaderFile): Promise<AxiosRequestConfig> | AxiosRequestConfig {
        const formData = new FormData()
        formData.append('file', uploaderFile.file!)

        return {
            url: this.url,
            method: 'POST',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }
    }

    /** Formats the server response into a format usable by this component. */
    formatResponse(response: AxiosResponse<any>): Partial<UploaderFile> {
        return {
            id: response.data.id,
            url: response.data.url,
            name: response.data.name,
            size: response.data.size,
            type: response.data.type,
            extension: response.data.extension,
        }
    }

    /** Formats the server error into a format usable by this component. */
    formatResponseError(error: any): UploaderFile['error'] {
        return error.response?.data?.error || 'Failed to upload file'
    }
}

export interface UploaderProps {
    /** The action to upload the files. */
    action: UploaderAction

    /** The value of the uploader. */
    defaultFileList?: Array<UploaderFile>

    /** The onChange handler to update the value of the uploader. */
    onFileListChange?: (fileList: Array<UploaderFile>) => void

    /** The list type to display the files. */
    listType?: 'list' | 'card'

    /** The trigger type to display the uploader. */
    triggerType?: UploaderTriggerProps['triggerType']

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

    /** Whether the uploader is disabled. */
    isDisabled?: boolean

    /** Whether the uploader is invalid. */
    'aria-invalid'?: boolean
}

export function Uploader({
    action,
    defaultFileList,
    onFileListChange,
    triggerType = 'dropzone',
    listType = 'list',
    acceptedFileExtensions = [],
    maxFiles = 20,
    maxFileSize,
    allowMultiple = true,
    isDisabled = false,
    ['aria-invalid']: isInvalid = false,
}: UploaderProps) {
    const [uploaderFiles, setUploaderFiles] = React.useState<Array<UploaderFile>>(defaultFileList || [])

    const validateFiles = useValidateFiles({
        maxFileSize,
        acceptedFileExtensions,
        maxFiles: maxFiles - uploaderFiles.length,
        allowMultiple,
    })

    const upload = async (uploaderFile: UploaderFile) => {
        if (!uploaderFile.abortController || !uploaderFile.file) {
            return
        }

        const requestInfo = await action.buildRequest(uploaderFile)

        axios({
            ...requestInfo,
            signal: uploaderFile.abortController.signal,
            onUploadProgress: progressEvent => {
                const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))

                // update the file percent
                setUploaderFiles(old => {
                    return old.map(file => {
                        if (file.id === uploaderFile.id) {
                            return { ...file, percent: percent }
                        }
                        return file
                    })
                })
            },
        })
            .then(response => {
                // update the file status to done
                setUploaderFiles(old => {
                    const next = old.map(file => {
                        if (file.id === uploaderFile.id) {
                            const newFileUploader = pickBy(action.formatResponse(response))

                            return omit(
                                { ...file, ...newFileUploader, status: 'done' as const, percent: 0 },
                                'file',
                                'abortController',
                            )
                        }
                        return file
                    })
                    onFileListChange?.(next)

                    return next
                })
            })
            .catch(error => {
                // update the file status to error
                setUploaderFiles(old => {
                    return old.map(file => {
                        if (file.id === uploaderFile.id) {
                            return {
                                ...file,
                                error: String(action.formatResponseError(error)),
                                status: 'error',
                                percent: 0,
                            }
                        }
                        return file
                    })
                })
            })
    }

    const onDrop = (files: Array<File>) => {
        if (!action) {
            toast.error({ title: 'Uploader action is not set' })
            return
        }

        const acceptedFiles = validateFiles(files)

        const newUploaderFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(2, 15),
            name: file.name,
            size: file.size,
            extension: file.name.split('.').pop() ?? '',
            type: file.type,
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
        const next = uploaderFiles.filter(f => f.id !== uploaderFile.id)
        onFileListChange?.(next)
        setUploaderFiles(next)
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
        <div className="w-full flex flex-col gap-2">
            <UploaderTrigger
                onDrop={onDrop}
                triggerType={triggerType}
                acceptedFileExtensions={acceptedFileExtensions}
                maxFileSize={maxFileSize}
                allowMultiple={allowMultiple}
                isDisabled={isDisabled}
                isInvalid={isInvalid}
            />
            {uploaderFiles.length > 0 && (
                <div className={cn('flex gap-2 flex-wrap', listType === 'list' && 'flex-col')}>
                    {uploaderFiles.map(uploaderFile => (
                        <UploaderItem
                            key={uploaderFile.id}
                            uploaderFile={uploaderFile}
                            onDelete={onDelete}
                            onRetry={onRetry}
                            variant={listType}
                            isDisabled={isDisabled}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
