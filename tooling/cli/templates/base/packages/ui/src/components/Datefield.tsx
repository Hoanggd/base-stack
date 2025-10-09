'use client'

import React from 'react'
import { parseTime } from '@internationalized/date'
import { cn } from '@workspace/ui/lib/utils'
import { VariantProps } from 'class-variance-authority'
import {
    DateField as AriaDateField,
    DateInput as AriaDateInput,
    DateInputProps as AriaDateInputProps,
    DateSegment as AriaDateSegment,
    DateSegmentProps as AriaDateSegmentProps,
    TimeField as AriaTimeField,
    composeRenderProps,
} from 'react-aria-components'

import { parseDate } from '@internationalized/date'
import { fieldGroupVariants } from '@workspace/ui/components/Field'

const DateField = AriaDateField

const TimeField = AriaTimeField

function DateSegment({ className, ...props }: AriaDateSegmentProps) {
    return (
        <AriaDateSegment
            className={composeRenderProps(className, className =>
                cn(
                    'type-literal:px-0 inline rounded px-[1px] caret-transparent outline outline-0',
                    /* Placeholder */
                    'data-[placeholder]:text-muted-foreground',
                    /* Disabled */
                    'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
                    /* Focused */
                    'data-[focused]:bg-primary data-[focused]:text-white data-[focused]:data-[placeholder]:text-white',
                    className,
                ),
            )}
            {...props}
        />
    )
}

interface DateInputProps extends AriaDateInputProps, VariantProps<typeof fieldGroupVariants> {}

function DateInput({ className, variant, ...props }: Omit<DateInputProps, 'children'>) {
    return (
        <AriaDateInput
            className={composeRenderProps(className, className =>
                cn(fieldGroupVariants({ variant }), 'md:text-sm', className),
            )}
            {...props}
        >
            {segment => <DateSegment segment={segment} />}
        </AriaDateInput>
    )
}

/** Accepts values in the format YYYY-MM-DD */
interface BsDateFieldProps {
    value?: string
    onChange?: (value: string) => void
    defaultValue?: string
    className?: string
    variant?: 'default' | 'unstyled'
    minValue?: string
    maxValue?: string
    isDisabled?: boolean
}

function BsDateField({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    isDisabled,
    ...props
}: BsDateFieldProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    return (
        <DateField
            aria-label="Date Field"
            isInvalid={(props as any)['aria-invalid']}
            className={cn('w-full', className)}
            value={value ? parseDate(value) : null}
            onChange={value => onChange(value?.toString() ?? '')}
            minValue={minValue ? parseDate(minValue) : null}
            maxValue={maxValue ? parseDate(maxValue) : null}
            isDisabled={isDisabled}
            {...props}
        >
            <DateInput />
        </DateField>
    )
}

/** Accepts values in the format HH:mm:ss or HH:mm */
interface BsTimeFieldProps {
    value?: string
    onChange?: (value: string) => void
    defaultValue?: string
    className?: string
    variant?: 'default' | 'unstyled'
    minValue?: string
    maxValue?: string
    isDisabled?: boolean
    granularity?: 'hour' | 'minute' | 'second'
}

function BsTimeField({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    isDisabled,
    granularity = 'minute',
    ...props
}: BsTimeFieldProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    return (
        <TimeField
            aria-label="Date Field"
            isInvalid={(props as any)['aria-invalid']}
            granularity={granularity}
            className={cn('w-max', className)}
            value={value ? parseTime(value) : undefined}
            onChange={value => onChange(value?.toString() ?? '')}
            minValue={minValue ? parseTime(minValue) : null}
            maxValue={maxValue ? parseTime(maxValue) : null}
            isDisabled={isDisabled}
            {...props}
        >
            <DateInput className="justify-center" />
        </TimeField>
    )
}

export { BsDateField, BsTimeField, DateField, DateInput, DateSegment, TimeField }
export type { BsDateFieldProps, BsTimeFieldProps, DateInputProps }
