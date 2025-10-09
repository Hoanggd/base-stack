'use client'

import { getLocalTimeZone, parseDate, today } from '@internationalized/date'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import {
    Button as AriaButton,
    Calendar as AriaCalendar,
    CalendarCell as AriaCalendarCell,
    CalendarCellProps as AriaCalendarCellProps,
    CalendarGrid as AriaCalendarGrid,
    CalendarGridBody as AriaCalendarGridBody,
    CalendarGridBodyProps as AriaCalendarGridBodyProps,
    CalendarGridHeader as AriaCalendarGridHeader,
    CalendarGridHeaderProps as AriaCalendarGridHeaderProps,
    CalendarGridProps as AriaCalendarGridProps,
    CalendarHeaderCell as AriaCalendarHeaderCell,
    CalendarHeaderCellProps as AriaCalendarHeaderCellProps,
    Heading as AriaHeading,
    RangeCalendar as AriaRangeCalendar,
    composeRenderProps,
    useLocale,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

import { buttonVariants } from '@workspace/ui/components/Button'
import { RangeCalendarCell } from '@workspace/ui/components/Calendar.helper'
import { useIsMobile } from '@workspace/ui/hooks/use-mobile'

const Calendar = AriaCalendar

const RangeCalendar = AriaRangeCalendar

const CalendarHeading = (props: React.HTMLAttributes<HTMLElement>) => {
    const { direction } = useLocale()

    return (
        <header className="flex w-full items-center gap-0.5 pb-1" {...props}>
            <AriaHeading className="pl-2.5 grow text-sm font-medium" />

            <AriaButton
                slot="previous"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'size-8 rounded-full bg-transparent p-0 text-primary-foreground',
                    /* Hover */
                    'data-[hovered]:opacity-100 data-[hovered]:bg-muted-foreground/10 data-[hovered]:text-primary-foreground',
                )}
            >
                {direction === 'rtl' ? (
                    <ChevronRight aria-hidden className="size-4" />
                ) : (
                    <ChevronLeft aria-hidden className="size-4" />
                )}
            </AriaButton>
            <AriaButton
                slot="next"
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'size-8 rounded-full bg-transparent p-0 text-primary-foreground',
                    /* Hover */
                    'data-[hovered]:opacity-100 data-[hovered]:bg-muted-foreground/10 data-[hovered]:text-primary-foreground',
                )}
            >
                {direction === 'rtl' ? (
                    <ChevronLeft aria-hidden className="size-4" />
                ) : (
                    <ChevronRight aria-hidden className="size-4" />
                )}
            </AriaButton>
        </header>
    )
}

const CalendarGrid = ({ className, ...props }: AriaCalendarGridProps) => (
    <AriaCalendarGrid className={cn('border-separate border-spacing-x-0 border-spacing-y-0.5', className)} {...props} />
)

const CalendarGridHeader = ({ ...props }: AriaCalendarGridHeaderProps) => <AriaCalendarGridHeader {...props} />

const CalendarHeaderCell = ({ className, ...props }: AriaCalendarHeaderCellProps) => (
    <AriaCalendarHeaderCell
        className={cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', className)}
        {...props}
    />
)

const CalendarGridBody = ({ className, ...props }: AriaCalendarGridBodyProps) => (
    <AriaCalendarGridBody className={cn('[&>tr>td]:p-0', className)} {...props} />
)

const CalendarCell = ({
    className,
    type = 'single',
    ...props
}: AriaCalendarCellProps & { type?: 'single' | 'range' }) => {
    if (type === 'range') {
        return <RangeCalendarCell date={props.date} />
    }

    return (
        <AriaCalendarCell
            className={composeRenderProps(className, (className, renderProps) =>
                cn(
                    buttonVariants({ variant: 'unstyled' }),
                    'transition-none relative flex size-8 rounded-full items-center justify-center p-0 text-sm font-normal',
                    /* Disabled */
                    renderProps.isDisabled && 'text-muted-foreground opacity-50',
                    /* Selected */
                    renderProps.isSelected && 'bg-primary text-white data-[focused]:bg-primary',
                    /* Current Date */
                    renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
                        !renderProps.isSelected &&
                        'bg-neutral-400/10 text-accent-foreground',
                    /* Hovered */
                    renderProps.isHovered && 'bg-neutral-400/20',
                    /* Outside Month */
                    renderProps.isOutsideMonth && 'hidden',
                    /* Unavailable Date */
                    renderProps.isUnavailable && 'cursor-default text-destructive-foreground ',
                    renderProps.isInvalid &&
                        'bg-destructive text-destructive-foreground-foreground data-[focused]:bg-destructive data-[hovered]:bg-destructive data-[focused]:text-destructive-foreground-foreground data-[hovered]:text-destructive-foreground-foreground',
                    className,
                ),
            )}
            {...props}
        />
    )
}

/** Accepts values in the format YYYY-MM-DD */
interface BsCalendarProps {
    value?: string
    onChange?: (date: string) => void
    defaultValue?: string
    minValue?: string
    maxValue?: string
    variant?: 'default' | 'unstyled'
    className?: string
}

function BsCalendar({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    variant = 'default',
}: BsCalendarProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<string | undefined>(defaultValue)

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    return (
        <Calendar
            value={value ? parseDate(value) : null}
            onChange={value => onChange(value?.toString())}
            className={composeRenderProps(className, className =>
                cn('w-fit', variant === 'default' ? 'border rounded-lg p-1 bg-background-secondary/40' : '', className),
            )}
            minValue={minValue ? parseDate(minValue) : null}
            maxValue={maxValue ? parseDate(maxValue) : null}
        >
            <CalendarHeading />
            <CalendarGrid>
                <CalendarGridHeader>{day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}</CalendarGridHeader>
                <CalendarGridBody>{date => <CalendarCell date={date} />}</CalendarGridBody>
            </CalendarGrid>
        </Calendar>
    )
}

interface BsRangeCalendarValue {
    start: string
    end: string
}

/** Accepts values in the format YYYY-MM-DD */
interface BsRangeCalendarProps {
    value?: BsRangeCalendarValue
    onChange?: (value: BsRangeCalendarValue) => void
    defaultValue?: BsRangeCalendarValue
    className?: string
    variant?: 'default' | 'unstyled'
    minValue?: string
    maxValue?: string
}

function BsRangeCalendar({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    minValue,
    maxValue,
    className,
    variant = 'default',
}: BsRangeCalendarProps) {
    const [uncontrolledValue, uncontrolledOnChange] = React.useState<BsRangeCalendarValue | undefined>(defaultValue)
    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? uncontrolledOnChange

    const isMobile = useIsMobile()
    const months = isMobile ? 1 : 2

    return (
        <RangeCalendar
            visibleDuration={{ months }}
            value={value?.start && value?.end ? { start: parseDate(value.start), end: parseDate(value.end) } : null}
            onChange={value =>
                onChange?.({
                    start: value?.start?.toString(),
                    end: value?.end?.toString(),
                })
            }
            minValue={minValue ? parseDate(minValue) : null}
            maxValue={maxValue ? parseDate(maxValue) : null}
            className={composeRenderProps(className, className =>
                cn('w-fit', variant === 'default' ? 'border rounded-lg p-1 bg-background-secondary/40' : '', className),
            )}
        >
            <CalendarHeading />
            <div className="flex gap-3 items-start">
                {Array.from({ length: months }).map((_, index) => (
                    <CalendarGrid key={index} offset={{ months: index }}>
                        <CalendarGridHeader>{day => <CalendarHeaderCell>{day}</CalendarHeaderCell>}</CalendarGridHeader>
                        <CalendarGridBody>{date => <CalendarCell date={date} type="range" />}</CalendarGridBody>
                    </CalendarGrid>
                ))}
            </div>
        </RangeCalendar>
    )
}

export {
    BsCalendar,
    BsRangeCalendar,
    Calendar,
    CalendarCell,
    CalendarGrid,
    CalendarGridBody,
    CalendarGridHeader,
    CalendarHeaderCell,
    CalendarHeading,
    RangeCalendar,
}
export type { BsCalendarProps, BsRangeCalendarProps, BsRangeCalendarValue }
