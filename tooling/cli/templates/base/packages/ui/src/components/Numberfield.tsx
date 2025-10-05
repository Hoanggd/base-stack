'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import {
    Button as AriaButton,
    ButtonProps as AriaButtonProps,
    Input as AriaInput,
    InputProps as AriaInputProps,
    NumberField as AriaNumberField,
    NumberFieldProps as AriaNumberFieldProps,
    composeRenderProps,
} from 'react-aria-components'
import { FieldGroup } from '@workspace/ui/components/Field'

import { cn } from '@workspace/ui/lib/utils'
import { Separator } from '@workspace/ui/components/Separator'

const NumberField = AriaNumberField

function NumberFieldInput({ className, ...props }: AriaInputProps) {
    return (
        <AriaInput
            className={composeRenderProps(className, className =>
                cn(
                    'w-fit min-w-0 flex-1 border-r border-transparent pr-2 outline outline-0 placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden',
                    className,
                ),
            )}
            {...props}
        />
    )
}

function NumberFieldSteppers({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div className={cn('absolute right-0 flex items-center', className)} {...props}>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex flex-col px-1.5">
                <NumberFieldStepper slot="increment" className="translate-y-0.5" aria-label="Increment">
                    <ChevronUp aria-hidden className="size-[14px]!" />
                </NumberFieldStepper>
                <NumberFieldStepper slot="decrement" aria-label="Decrement">
                    <ChevronDown aria-hidden className="size-[14px]! -translate-y-0.5" />
                </NumberFieldStepper>
            </div>
        </div>
    )
}

function NumberFieldStepper({ className, ...props }: AriaButtonProps) {
    return (
        <AriaButton
            className={composeRenderProps(className, className =>
                cn(
                    'flex items-center justify-center',
                    'w-auto grow rounded-none px-0.5 text-muted-foreground size-4 data-[hovered]:text-foreground cursor-pointer',
                    className,
                ),
            )}
            {...props}
        />
    )
}

interface BsNumberFieldProps extends AriaNumberFieldProps {
    showStepper?: boolean
    placeholder?: string
    'aria-invalid'?: boolean
}

function BsNumberField({ className, showStepper = true, placeholder, ...props }: BsNumberFieldProps) {
    return (
        <NumberField
            aria-label="Number Field"
            className={composeRenderProps(className, className => cn('group flex flex-col gap-2', className))}
            isInvalid={props['aria-invalid']}
            {...props}
        >
            <FieldGroup>
                <NumberFieldInput placeholder={placeholder} />
                {showStepper && <NumberFieldSteppers />}
            </FieldGroup>
        </NumberField>
    )
}

export { BsNumberField, NumberField, NumberFieldInput, NumberFieldStepper, NumberFieldSteppers }
export type { BsNumberFieldProps }
