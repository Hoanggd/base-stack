import { toast } from '@workspace/ui/components/Sonner'
import { formatFileSize, validateFileExtension, validateFileSize } from '@workspace/ui/lib/file'

/**
 * The following rules are utilized to check files for validity prior to upload,
 * they determine which files are acceptable during the selection process.
 */
export interface UploaderRules {
    acceptedFileExtensions?: Array<string>
    maxFileSize?: number
    maxFiles?: number
    allowMultiple: boolean
}

export function useValidateFiles(rules: UploaderRules) {
    const { acceptedFileExtensions, maxFileSize } = rules

    return (files: File[]) => {
        // ========================================
        // STEP 1: PRE-VALIDATION CHECKS
        // ========================================
        // These checks will completely prevent upload if any issues are found
        // They validate the overall file selection rules (allowMultiple, maxFiles)

        // validate maximum number of files
        let maxFiles = Infinity
        if (rules.allowMultiple === false) {
            maxFiles = 1
        } else if (rules.maxFiles != undefined) {
            maxFiles = rules.maxFiles
        }

        if (files.length > maxFiles) {
            toast.error(
                {
                    title: 'Maximum number of files exceeded',
                },
                {
                    position: 'bottom-center',
                    duration: 8000,
                },
            )

            return []
        }

        // ========================================
        // STEP 2: INDIVIDUAL FILE VALIDATION
        // ========================================
        // These checks validate each file individually (extension, size)
        // Invalid files are filtered out but valid ones still proceed
        // A warning toast is shown if any files were rejected

        let acceptedFiles = [...files]
        const rejectedByExtensionFiles: Array<File> = []
        const rejectedBySizeFiles: Array<File> = []

        // validate file extensions
        if (acceptedFileExtensions?.length) {
            acceptedFiles = acceptedFiles.filter(file => {
                const isValid = validateFileExtension(file, acceptedFileExtensions)

                if (!isValid) {
                    rejectedByExtensionFiles.push(file)
                }

                return isValid
            })
        }

        // validate file size
        if (maxFileSize) {
            acceptedFiles = acceptedFiles.filter(file => {
                const isValid = validateFileSize(file, maxFileSize)

                if (!isValid) {
                    rejectedBySizeFiles.push(file)
                }

                return isValid
            })
        }

        const containsInvalidFile = rejectedByExtensionFiles.length > 0 || rejectedBySizeFiles.length > 0

        if (containsInvalidFile) {
            toast.warning(
                {
                    title: 'One or more files were not uploaded',
                    description: (
                        <div>
                            {acceptedFileExtensions && rejectedByExtensionFiles?.length > 0 && (
                                <p>Only the following file types are allowed: {acceptedFileExtensions?.join(', ')}.</p>
                            )}
                            {maxFileSize && rejectedBySizeFiles?.length > 0 && (
                                <p>Max file size: {formatFileSize(maxFileSize)}.</p>
                            )}
                        </div>
                    ),
                },
                {
                    position: 'bottom-center',
                    duration: 8000,
                },
            )
        }

        return acceptedFiles
    }
}
