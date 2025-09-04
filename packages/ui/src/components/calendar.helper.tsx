import {
  CalendarCell as AriaCalendarCell,
  CalendarCellProps as AriaCalendarCellProps,
} from "react-aria-components";

import { cn } from "@workspace/ui/lib/utils";
import { cva } from "class-variance-authority";

const cell = cva(
  [
    "w-full h-full flex items-center justify-center rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-200",
  ],
  {
    variants: {
      selectionState: {
        none: "group-hover:bg-neutral-600/10 group-pressed:bg-neutral-200",
        middle: [
          "group-invalid:group-hover:bg-red-200",
          "group-pressed:bg-primary/80",
          "group-invalid:group-pressed:bg-red-300",
        ],
        cap: "bg-primary group-invalid:bg-red-600 text-white",
      },
      isDisabled: {
        true: "text-neutral-300",
        false: "",
      },
    },
  }
);

export function RangeCalendarCell({ date }: AriaCalendarCellProps) {
  return (
    <AriaCalendarCell
      date={date}
      className={cn(
        "group text-sm outline outline-0 cursor-pointer data-[outside-month=true]:hidden",
        "[td:first-child_&_div]:rounded-s-full [td:last-child_&_div]:rounded-e-full"
      )}
    >
      {({
        formattedDate,
        isSelected,
        isSelectionStart,
        isSelectionEnd,
        isDisabled,
      }) => {
        const selectionState =
          isSelected && (isSelectionStart || isSelectionEnd)
            ? "cap"
            : isSelected
              ? "middle"
              : "none";
        const isEndOfMonth = date.calendar.getDaysInMonth(date) === date.day;
        const isStartOfMonth = date.day === 1;
        const fadeRight = selectionState === "middle" && isEndOfMonth;
        const fadeLeft = selectionState === "middle" && isStartOfMonth;

        return (
          <div
            className={cn(
              "w-8 h-8 cursor-pointer",
              isSelected && "bg-neutral-500/20",
              isSelectionStart && "rounded-s-full",
              isSelectionEnd && "rounded-e-full",
              fadeRight &&
                "bg-transparent bg-gradient-to-r from-neutral-500/20 to-neutral-500/0",
              fadeLeft &&
                "bg-transparent bg-gradient-to-l from-neutral-500/20 to-neutral-500/0"
            )}
          >
            <span
              className={cell({
                selectionState,
                isDisabled,
              })}
            >
              {formattedDate}
            </span>
          </div>
        );
      }}
    </AriaCalendarCell>
  );
}
