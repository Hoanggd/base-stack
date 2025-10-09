'use client'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import {
    DatePicker as AriaDatePicker,
    DateRangePicker as AriaDateRangePicker,
    Dialog as AriaDialog,
    DialogProps as AriaDialogProps,
    PopoverProps as AriaPopoverProps,
    composeRenderProps,
} from 'react-aria-components'
import { cn } from '@workspace/ui/lib/utils'
import { parseDate } from '@internationalized/date'
import { useIsMobile } from '@workspace/ui/hooks/use-mobile'
import { Button } from '@workspace/ui/components/Button'
import {
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarHeading,
    RangeCalendar,
} from './Calendar'
import { DateInput } from '@workspace/ui/components/Datefield'
import { FieldGroup } from '@workspace/ui/components/Field'
import { Popover } from '@workspace/ui/components/Popover'

const DatePicker = AriaDatePicker

const DateRangePicker = AriaDateRangePicker

const DatePickerContent = ({
    className,
    popoverClassName,
    ...props
}: AriaDialogProps & { popoverClassName?: AriaPopoverProps['className'] }) => (
    <Popover
        className={composeRenderProps(popoverClassName, className => cn('w-auto p-1', className))}
    >
        <AriaDialog
            className={cn(
                'flex w-full flex-col space-y-4 outline-none sm:flex-row sm:space-x-4 sm:space-y-0',
                className,
            )}
            {...props}
        />
    </Popover>
)

interface BsDatePickerProps {
    value?: string
    onChange?: (value: string) => void
    defaultValue?: string
    className?: string
    minValue?: string
    maxValue?: string
    isDisabled?: boolean
}

function BsDatePicker({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    isDisabled,
    ...props
}: BsDatePickerProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    return (
        <DatePicker
            aria-label="Date Picker"
            isInvalid={(props as any)['aria-invalid']}
            className={composeRenderProps(className, className => cn('w-full', className))}
            value={value ? parseDate(value) : null}
            onChange={value => onChange(value?.toString() ?? '')}
            minValue={minValue ? parseDate(minValue) : null}
            maxValue={maxValue ? parseDate(maxValue) : null}
            isDisabled={isDisabled}
            {...props}
        >
            <FieldGroup>
                <DateInput className="flex-1" variant="ghost" />
                <Button variant="ghost" size="icon" className="-mr-1 size-6 data-[focus-visible]:ring-offset-0">
                    <CalendarIcon aria-hidden className="size-4 text-muted-foreground" />
                </Button>
            </FieldGroup>
            <DatePickerContent>
                <Calendar>
                    <CalendarHeading />
                    <CalendarGrid>
                        <CalendarGridHeader>{day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}</CalendarGridHeader>
                        <CalendarGridBody>{date => <CalendarCell date={date} />}</CalendarGridBody>
                    </CalendarGrid>
                </Calendar>
            </DatePickerContent>
        </DatePicker>
    )
}

interface BsDateRangePickerValue {
    start: string
    end: string
}

/** Accepts values in the format YYYY-MM-DD */
interface BsDateRangePickerProps {
    value?: BsDateRangePickerValue
    onChange?: (value: BsDateRangePickerValue) => void
    defaultValue?: BsDateRangePickerValue
    className?: string
    variant?: 'default' | 'unstyled'
    minValue?: string
    maxValue?: string
    isDisabled?: boolean
}

function BsDateRangePicker({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    isDisabled,
    ...props
}: BsDateRangePickerProps) {
    const [uncontrolledValue, uncontrolledOnChange] = React.useState<BsDateRangePickerValue | undefined>(defaultValue)
    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? uncontrolledOnChange

    const isMobile = useIsMobile()
    const months = isMobile ? 1 : 2

    return (
        <DateRangePicker
            aria-label="Date Range Picker"
            isInvalid={(props as any)['aria-invalid']}
            className={composeRenderProps(className, className => cn('w-full', className))}
            value={value?.start && value?.end ? { start: parseDate(value.start), end: parseDate(value.end) } : null}
            onChange={value =>
                onChange?.({
                    start: value?.start?.toString() ?? '',
                    end: value?.end?.toString() ?? '',
                })
            }
            minValue={minValue ? parseDate(minValue) : null}
            maxValue={maxValue ? parseDate(maxValue) : null}
            isDisabled={isDisabled}
            {...props}
        >
            <FieldGroup>
                <DateInput variant="ghost" slot={'start'} />
                <span aria-hidden className="px-2 text-sm text-muted-foreground">
                    -
                </span>
                <DateInput className="flex-1" variant="ghost" slot={'end'} />

                <Button variant="ghost" size="icon" className="-mr-1 size-6 data-[focus-visible]:ring-offset-0">
                    <CalendarIcon aria-hidden className="size-4 text-muted-foreground" />
                </Button>
            </FieldGroup>
            <DatePickerContent>
                <RangeCalendar visibleDuration={{ months }}>
                    <CalendarHeading />
                    <div className="flex gap-3 items-start">
                        {Array.from({ length: months }).map((_, index) => (
                            <CalendarGrid key={index} offset={{ months: index }}>
                                <CalendarGridHeader>
                                    {day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
                                </CalendarGridHeader>
                                <CalendarGridBody>{date => <CalendarCell date={date} type="range" />}</CalendarGridBody>
                            </CalendarGrid>
                        ))}
                    </div>
                </RangeCalendar>
            </DatePickerContent>
        </DateRangePicker>
    )
}

export { BsDatePicker, BsDateRangePicker, DatePicker, DatePickerContent, DateRangePicker }
export type { BsDatePickerProps, BsDateRangePickerProps, BsDateRangePickerValue }
