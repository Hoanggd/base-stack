"use client";

import * as React from "react";
import { Check, Minus } from "lucide-react";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxGroupProps as AriaCheckboxGroupProps,
  composeRenderProps,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";

import { cn } from "@workspace/ui/lib/utils";

import { Label, labelVariants } from "./field";

const CheckboxGroup = ({ className, ...props }: AriaCheckboxGroupProps) => {
  return (
    <AriaCheckboxGroup
      className={cn("grid gap-2", className)}
      {...props}
    />
  );
};

const Checkbox = ({ className, children, ...props }: AriaCheckboxProps) => (
  <AriaCheckbox
    className={composeRenderProps(className, (className) =>
      cn(
        "group/checkbox flex items-center gap-x-2 text-sm cursor-pointer",
        /* Disabled */
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70",
        labelVariants,
        className
      )
    )}
    {...props}
  >
    {composeRenderProps(children, (children, renderProps) => (
      <>
        <div
          className={cn(
            "flex size-4 shrink-0 items-center justify-center rounded-[5px] border bg-background-secondary text-white ring-offset-background",
            /* Focus Visible */
            "group-data-[focus-visible]/checkbox:outline-none group-data-[focus-visible]/checkbox:ring-2 group-data-[focus-visible]/checkbox:ring-primary/40 group-data-[focus-visible]/checkbox:ring-offset-2",
            /* Selected */
            "group-data-[indeterminate]/checkbox:bg-primary group-data-[selected]/checkbox:bg-primary group-data-[indeterminate]/checkbox:border-black/10 group-data-[selected]/checkbox:border-black/10 group-data-[indeterminate]/checkbox:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] group-data-[selected]/checkbox:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]",
            /* Selected Dark */
            "dark:group-data-[indeterminate]/checkbox:border-none dark:group-data-[selected]/checkbox:border-none",
            /* Disabled */
            "group-data-[disabled]/checkbox:cursor-not-allowed group-data-[disabled]/checkbox:opacity-80",
            /* Invalid */
            "group-data-[invalid]/checkbox:border-destructive group-data-[invalid]/checkbox:group-data-[selected]/checkbox:bg-destructive group-data-[invalid]/checkbox:group-data-[selected]/checkbox:text-destructive-foreground",
            /* Resets */
            "focus:outline-none focus-visible:outline-none"
          )}
        >
          {renderProps.isIndeterminate ? (
            <Minus className="size-4" />
          ) : renderProps.isSelected ? (
            <Check className="size-4" />
          ) : null}
        </div>
        {children}
      </>
    ))}
  </AriaCheckbox>
);

interface BsCheckboxGroupProps extends AriaCheckboxGroupProps {
  label?: string;
}

function BsCheckboxGroup({
  label,
  className,
  children,
  ...props
}: BsCheckboxGroupProps) {
  return (
    <CheckboxGroup
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          <Label>{label}</Label>
          {children}
        </>
      ))}
    </CheckboxGroup>
  );
}

export { Checkbox, CheckboxGroup, BsCheckboxGroup };
export type { BsCheckboxGroupProps };
