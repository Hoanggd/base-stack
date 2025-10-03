import { CalendarCell as AriaCalendarCell, CalendarCellProps as AriaCalendarCellProps } from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'
import { cva } from 'class-variance-authority'

const cell = cva(
    [
        'w-full h-full flex items-center justify-center rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-200',
        'data-[disabled=true]:text-muted-foreground data-[disabled=true]:opacity-50',
    ],
    {
        variants: {
            selectionState: {
                none: 'group-pressed:bg-neutral-200 group-data-[hovered]:bg-neutral-400/20',
                middle: [
                    'group-invalid:group-hover:bg-red-200 group-data-[hovered]:bg-neutral-400/20',
                    'group-pressed:bg-primary/80',
                    'group-invalid:group-pressed:bg-red-300',
                ],
                cap: 'bg-primary group-invalid:bg-red-600 text-white',
            },
        },
    },
)

export function RangeCalendarCell({ date }: AriaCalendarCellProps) {
    return (
        <AriaCalendarCell
            date={date}
            className={cn(
                'group text-sm outline outline-0 cursor-pointer data-[outside-month=true]:hidden',
                '[td:first-child_&_div]:rounded-s-full [td:last-child_&_div]:rounded-e-full',
            )}
        >
            {({ formattedDate, isSelected, isSelectionStart, isSelectionEnd, isDisabled }) => {
                const selectionState =
                    isSelected && (isSelectionStart || isSelectionEnd) ? 'cap' : isSelected ? 'middle' : 'none'
                const isEndOfMonth = date.calendar.getDaysInMonth(date) === date.day
                const isStartOfMonth = date.day === 1
                const fadeRight = selectionState === 'middle' && isEndOfMonth
                const fadeLeft = selectionState === 'middle' && isStartOfMonth

                return (
                    <div
                        className={cn(
                            'w-8 h-8 cursor-pointer',
                            isDisabled && 'cursor-default',
                            isSelected && 'bg-neutral-400/15',
                            isSelectionStart && 'rounded-s-full',
                            isSelectionEnd && 'rounded-e-full',
                            fadeRight && 'bg-transparent bg-gradient-to-r from-neutral-400/15 to-neutral-400/0',
                            fadeLeft && 'bg-transparent bg-gradient-to-l from-neutral-400/15 to-neutral-400/0',
                        )}
                    >
                        <span
                            data-disabled={isDisabled}
                            className={cell({
                                selectionState,
                            })}
                        >
                            {formattedDate}
                        </span>
                    </div>
                )
            }}
        </AriaCalendarCell>
    )
}
