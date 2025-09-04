"use client";

import * as React from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  CalendarProps as AriaCalendarProps,
  DateValue as AriaDateValue,
  Heading as AriaHeading,
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  RangeCalendarStateContext as AriaRangeCalendarStateContext,
  composeRenderProps,
  Text,
  useLocale,
} from "react-aria-components";

import { cn } from "@workspace/ui/lib/utils";

import { buttonVariants } from "@workspace/ui/components/button";

const Calendar = AriaCalendar;

const RangeCalendar = AriaRangeCalendar;

const CalendarHeading = (props: React.HTMLAttributes<HTMLElement>) => {
  let { direction } = useLocale();

  return (
    <header className="flex w-full items-center gap-0.5 pb-1" {...props}>
      <AriaHeading className="pl-2 grow text-sm font-medium" />

      <AriaButton
        slot="previous"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 rounded-full bg-transparent p-0 opacity-50",
          /* Hover */
          "data-[hovered]:opacity-100 data-[hovered]:bg-muted-foreground/10"
        )}
      >
        {direction === "rtl" ? (
          <ChevronRight aria-hidden className="size-4" />
        ) : (
          <ChevronLeft aria-hidden className="size-4" />
        )}
      </AriaButton>
      <AriaButton
        slot="next"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 rounded-full bg-transparent p-0 opacity-50",
          /* Hover */
          "data-[hovered]:opacity-100 data-[hovered]:bg-muted-foreground/10"
        )}
      >
        {direction === "rtl" ? (
          <ChevronLeft aria-hidden className="size-4" />
        ) : (
          <ChevronRight aria-hidden className="size-4" />
        )}
      </AriaButton>
    </header>
  );
};

const CalendarGrid = ({ className, ...props }: AriaCalendarGridProps) => (
  <AriaCalendarGrid
    className={cn(
      "border-separate border-spacing-x-0 border-spacing-y-0.5",
      className
    )}
    {...props}
  />
);

const CalendarGridHeader = ({ ...props }: AriaCalendarGridHeaderProps) => (
  <AriaCalendarGridHeader {...props} />
);

const CalendarHeaderCell = ({
  className,
  ...props
}: AriaCalendarHeaderCellProps) => (
  <AriaCalendarHeaderCell
    className={cn(
      "w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground",
      className
    )}
    {...props}
  />
);

const CalendarGridBody = ({
  className,
  ...props
}: AriaCalendarGridBodyProps) => (
  <AriaCalendarGridBody className={cn("[&>tr>td]:p-0", className)} {...props} />
);

const CalendarCell = ({ className, ...props }: AriaCalendarCellProps) => {
  return (
    <AriaCalendarCell
      className={composeRenderProps(className, (className, renderProps) =>
        cn(
          buttonVariants({ variant: "unstyled" }),
          "relative flex size-8 rounded-full items-center justify-center p-0 text-sm font-normal",
          /* Disabled */
          renderProps.isDisabled && "text-muted-foreground opacity-50",
          /* Selected */
          renderProps.isSelected &&
            "bg-primary text-white data-[focused]:bg-primary",
          /* Outside Month */
          renderProps.isOutsideMonth &&
            "text-muted-foreground opacity-50 data-[selected]:bg-accent/50 data-[selected]:text-muted-foreground data-[selected]:opacity-30",
          /* Current Date */
          renderProps.date.compare(today(getLocalTimeZone())) === 0 &&
            !renderProps.isSelected &&
            "bg-neutral-400/10 text-accent-foreground",
          /* Unavailable Date */
          renderProps.isUnavailable && "cursor-default text-destructive ",
          renderProps.isInvalid &&
            "bg-destructive text-destructive-foreground data-[focused]:bg-destructive data-[hovered]:bg-destructive data-[focused]:text-destructive-foreground data-[hovered]:text-destructive-foreground",
          className
        )
      )}
      {...props}
    />
  );
};

interface JollyCalendarProps<T extends AriaDateValue>
  extends AriaCalendarProps<T> {
  errorMessage?: string;
  variant?: "default" | "unstyled";
}

function JollyCalendar<T extends AriaDateValue>({
  errorMessage,
  className,
  variant = "default",
  ...props
}: JollyCalendarProps<T>) {
  return (
    <Calendar
      className={composeRenderProps(className, (className) =>
        cn(
          "w-fit",
          variant === "default"
            ? "border rounded-md p-1 bg-background-secondary/40"
            : "",
          className
        )
      )}
      {...props}
    >
      <CalendarHeading />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text className="text-sm text-destructive" slot="errorMessage">
          {errorMessage}
        </Text>
      )}
    </Calendar>
  );
}

interface JollyRangeCalendarProps<T extends AriaDateValue>
  extends AriaRangeCalendarProps<T> {
  errorMessage?: string;
}

function JollyRangeCalendar<T extends AriaDateValue>({
  errorMessage,
  className,
  ...props
}: JollyRangeCalendarProps<T>) {
  return (
    <RangeCalendar
      className={composeRenderProps(className, (className) =>
        cn("w-fit", className)
      )}
      {...props}
    >
      <CalendarHeading />
      <CalendarGrid>
        <CalendarGridHeader>
          {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
        </CalendarGridHeader>
        <CalendarGridBody>
          {(date) => <CalendarCell date={date} />}
        </CalendarGridBody>
      </CalendarGrid>
      {errorMessage && (
        <Text slot="errorMessage" className="text-sm text-destructive">
          {errorMessage}
        </Text>
      )}
    </RangeCalendar>
  );
}

export {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
  RangeCalendar,
  JollyCalendar,
  JollyRangeCalendar,
};
export type { JollyCalendarProps, JollyRangeCalendarProps };
