"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import React from "react";
import type { ListBoxItemProps } from "react-aria-components";
import {
  Select as AriaSelect,
  Autocomplete,
  ListBox,
  ListBoxItem,
  SelectValue,
  useFilter,
} from "react-aria-components";
import { cn } from "../lib/utils";
import { Button } from "./button";
import { Popover, PopoverTrigger } from "./popover";
import { BsSearchField } from "./searchfield";

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Italian" },
  { id: 6, name: "Portuguese" },
  { id: 7, name: "Russian" },
  { id: 8, name: "Turkish" },
];

interface BsSelectOption {
  id: string | number;
  name: string;
}

interface BsSelectProps<S extends BsSelectOption> {
  /**
   * The array of options to display in the select dropdown.
   */
  options: Array<S>;

  /**
   * The currently selected value (option id).
   */
  value?: S["id"];

  /**
   * Callback fired when the selected value changes.
   */
  onChange?: (value?: S["id"]) => void;

  /**
   * The default selected value (option id).
   */
  defaultValue?: S["id"];

  /**
   * If true, enables a search field for filtering options.
   */
  isSearchable?: boolean;

  /**
   * Custom render function for the selected value display.
   */
  renderValue?: (value: S) => React.ReactNode;

  /**
   * Custom render function for each option in the dropdown.
   */
  renderOption?: (item: S) => React.ReactNode;

  /**
   * If true, the select is disabled.
   */
  isDisabled?: boolean;
}

function BsSelect<S extends BsSelectOption>({
  value: controlledValue,
  onChange: controlledOnChange,
  defaultValue,
  isSearchable = false,
  options,
  renderOption,
  renderValue,
  isDisabled,
  ...props
}: BsSelectProps<S>) {
  const [uncontrolledValue, uncontrolledOnChange] = React.useState<
    S["id"] | undefined
  >(defaultValue);
  const value = controlledValue ?? uncontrolledValue;
  const onChange = controlledOnChange ?? uncontrolledOnChange;

  return (
    <AriaSelect
      aria-label="Select"
      isDisabled={isDisabled}
      className="group w-full"
      selectedKey={value || null}
      onSelectionChange={(value) => onChange(value || undefined)}
      isInvalid={(props as any)["aria-invalid"]}
    >
      <Button
        variant="outline"
        className={cn(
          "justify-between w-full pr-2 h-auto py-[5px] min-h-8 font-normal text-start",
          "group-data-[invalid]:border-destructive group-data-[disabled]:opacity-80"
        )}
      >
        <SelectValue>
          {({ defaultChildren, isPlaceholder, selectedItem }) => {
            if (isPlaceholder) {
              return (
                <div className="flex-1 w-full text-muted-foreground">
                  Select
                </div>
              );
            }

            return renderValue
              ? renderValue(selectedItem as S)
              : defaultChildren;
          }}
        </SelectValue>
        <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
      </Button>
      <Popover
        isAnimated={false}
        className="!max-h-[400px] w-(--trigger-width) flex flex-col p-1.5 gap-1"
      >
        <ItemsWrapper isSearchable={isSearchable}>
          <ListBox
            items={options}
            className="outline-hidden overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => (
              <BsSelectItem renderOption={renderOption}>
                {item.name}
              </BsSelectItem>
            )}
          </ListBox>
        </ItemsWrapper>
      </Popover>
    </AriaSelect>
  );
}

function BsMultipleSelect() {
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <PopoverTrigger>
      <Button variant="outline" className="justify-between w-full pr-2">
        {/* <SelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? (
              <div className="flex-1 w-full text-muted-foreground">Select</div>
            ) : (
              defaultChildren
            );
          }}
        </SelectValue> */}
        <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
      </Button>
      <Popover
        isAnimated={false}
        className="!max-h-[400px] w-(--trigger-width) flex flex-col p-2 gap-1"
      >
        <ItemsWrapper isSearchable={true}>
          <ListBox
            selectionMode="multiple"
            onSelectionChange={(v) => console.log(v)}
            items={languages}
            className="outline-hidden overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => <BsSelectItem>{item.name}</BsSelectItem>}
          </ListBox>
        </ItemsWrapper>
      </Popover>
    </PopoverTrigger>
  );
}

interface ItemsWrapperProps {
  children: React.ReactNode;
  isSearchable: boolean;
}

function ItemsWrapper({ children, isSearchable }: ItemsWrapperProps) {
  let { contains } = useFilter({ sensitivity: "base" });

  return isSearchable ? (
    <Autocomplete filter={contains}>
      <BsSearchField autoFocus className="ring-0! border border-input" />{" "}
      {children}
    </Autocomplete>
  ) : (
    children
  );
}

function BsSelectItem<S extends BsSelectOption>(
  props: ListBoxItemProps & {
    children: string;
    renderOption?: (item: S) => React.ReactNode;
  }
) {
  return (
    <ListBoxItem
      {...props}
      textValue={props.children}
      className={cn(
        "cursor-pointer group flex items-center select-none gap-2 py-1.5 px-2 outline-hidden rounded-sm text-popover-foreground",
        "data-[focus-visible]:bg-neutral-500/15 data-hovered:bg-primary! data-hovered:text-white!"
      )}
    >
      {({ isSelected, ...rest }) => (
        <>
          <span className="w-4 flex items-center justify-center">
            {isSelected && <CheckIcon size={16} />}
          </span>
          <span className="text-sm flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
            {props.renderOption
              ? props.renderOption(props.value as S)
              : props.children}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}

export { BsMultipleSelect, BsSelect };
export type { BsSelectOption, BsSelectProps };
