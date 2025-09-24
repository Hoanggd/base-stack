'use client'

import {
    Input as AriaInput,
    InputProps as AriaInputProps,
    TextArea as AriaTextArea,
    TextAreaProps as AriaTextAreaProps,
    composeRenderProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

const Input = ({ className, ...props }: AriaInputProps) => {
    return (
        <AriaInput
            className={composeRenderProps(className, className =>
                cn(
                    'shadow-sm flex h-8 w-full rounded-sm bg-background-secondary px-3 py-1.5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
                    'ring-inset ring ring-input',
                    /* Focus Within */
                    'transition-all data-[focused]:ring-primary data-[focused]:ring-2 aria-invalid:ring-destructive',
                    /* Disabled */
                    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-80',
                    /* Resets */
                    'focus-visible:outline-none',
                    className,
                ),
            )}
            {...props}
        />
    )
}

const TextArea = ({ className, ...props }: AriaTextAreaProps) => {
    return (
        <AriaTextArea
            className={composeRenderProps(className, className =>
                cn(
                    'shadow-sm flex min-h-[80px] w-full rounded-sm bg-background-secondary px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground',
                    'ring-inset ring ring-input',
                    /* Focus Within */
                    'transition-all data-[focused]:ring-primary data-[focused]:ring-2 aria-invalid:ring-destructive',
                    /* Disabled */
                    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-80',
                    /* Resets */
                    'focus-visible:outline-none',
                    className,
                ),
            )}
            {...props}
        />
    )
}

export { Input, TextArea }
