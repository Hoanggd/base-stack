"use client";

import { VariantProps } from "class-variance-authority";
import {
  DateField as AriaDateField,
  DateFieldProps as AriaDateFieldProps,
  DateInput as AriaDateInput,
  DateInputProps as AriaDateInputProps,
  DateSegment as AriaDateSegment,
  DateSegmentProps as AriaDateSegmentProps,
  DateValue as AriaDateValue,
  TimeField as AriaTimeField,
  TimeFieldProps as AriaTimeFieldProps,
  TimeValue as AriaTimeValue,
  ValidationResult as AriaValidationResult,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { cn } from "@workspace/ui/lib/utils";

import { fieldGroupVariants, Label } from "./field";
import React from "react";
import { parseDate } from "@internationalized/date";

const DateField = AriaDateField;

const TimeField = AriaTimeField;

function DateSegment({ className, ...props }: AriaDateSegmentProps) {
  return (
    <AriaDateSegment
      className={composeRenderProps(className, (className) =>
        cn(
          "type-literal:px-0 inline rounded px-[1px] caret-transparent outline outline-0",
          /* Placeholder */
          "data-[placeholder]:text-muted-foreground",
          /* Disabled */
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
          /* Focused */
          "data-[focused]:bg-primary data-[focused]:text-white data-[focused]:data-[placeholder]:text-white",
          className
        )
      )}
      {...props}
    />
  );
}

interface DateInputProps
  extends AriaDateInputProps,
    VariantProps<typeof fieldGroupVariants> {}

function DateInput({
  className,
  variant,
  ...props
}: Omit<DateInputProps, "children">) {
  return (
    <AriaDateInput
      className={composeRenderProps(className, (className) =>
        cn(fieldGroupVariants({ variant }), "text-sm", className)
      )}
      {...props}
    >
      {(segment) => <DateSegment segment={segment} />}
    </AriaDateInput>
  );
}

/** Accepts values in the format YYYY-MM-DD */
interface BsDateFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  variant?: "default" | "unstyled";
  minValue?: string;
  maxValue?: string;
  isDisabled?: boolean;
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
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue);

  const value = controlledValue ?? uncontrolledValue;
  const onChange = controlledOnChange ?? setUncontrolledValue;

  return (
    <DateField
      aria-label="Date Field"
      className={cn("w-full", className)}
      value={value ? parseDate(value) : null}
      onChange={(value) => onChange(value?.toString() ?? "")}
      minValue={minValue ? parseDate(minValue) : null}
      maxValue={maxValue ? parseDate(maxValue) : null}
      isDisabled={isDisabled}
      {...props}
    >
      <DateInput />
    </DateField>
  );
}

interface BsTimeFieldProps<T extends AriaTimeValue>
  extends AriaTimeFieldProps<T> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
}

function BsTimeField<T extends AriaTimeValue>({
  label,
  description,
  errorMessage,
  className,
  ...props
}: BsTimeFieldProps<T>) {
  return (
    <TimeField onChange={(e) => console.log(e)} {...props}>
      <DateInput />
    </TimeField>
  );
}

export {
  DateField,
  DateSegment,
  DateInput,
  TimeField,
  BsDateField,
  BsTimeField,
};
export type { DateInputProps, BsDateFieldProps, BsTimeFieldProps };
