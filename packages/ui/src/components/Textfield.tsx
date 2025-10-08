'use client'

import React from 'react'
import {
    Input as AriaInput,
    InputProps as AriaInputProps,
    TextArea as AriaTextArea,
    TextAreaProps as AriaTextAreaProps,
    composeRenderProps,
    TextField as AriaTextField,
    TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'
import { FieldGroup } from '@workspace/ui/components/Field'
import { Button } from './Button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

const Input = ({ className, ...props }: AriaInputProps) => {
    return (
        <AriaInput
            autoComplete="off"
            className={composeRenderProps(className, className =>
                cn(
                    'shadow-sm flex h-8 w-full rounded-sm bg-background-secondary px-3 py-1.5 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground md:text-sm',
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

interface PasswordInputProps extends AriaTextFieldProps {
    placeholder?: string
}

const PasswordInput = ({ className, ...props }: PasswordInputProps) => {
    const [isVisible, setIsVisible] = React.useState(false)

    return (
        <AriaTextField {...props} isInvalid={(props as any)['aria-invalid']}>
            <FieldGroup className={cn('pl-3 pr-1 py-0', className)}>
                <AriaInput
                    type={isVisible ? 'text' : 'password'}
                    className="h-full focus-visible:outline-none flex-1"
                />
                <Button variant="ghost" size="iconSm" onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
            </FieldGroup>
        </AriaTextField>
    )
}

const TextArea = ({ className, ...props }: AriaTextAreaProps) => {
    return (
        <AriaTextArea
            className={composeRenderProps(className, className =>
                cn(
                    'shadow-sm flex min-h-[80px] w-full rounded-sm bg-background-secondary px-3 py-2 ring-offset-background placeholder:text-muted-foreground md:text-sm',
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

export { Input, TextArea, PasswordInput }
