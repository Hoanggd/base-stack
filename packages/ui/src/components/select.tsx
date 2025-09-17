import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { ListBoxItemProps } from "react-aria-components";
import {
  Select as AriaSelect,
  Autocomplete,
  ListBox,
  ListBoxItem,
  SelectValue,
  useFilter,
} from "react-aria-components";
import { Button } from "./button";
import { Popover, PopoverTrigger } from "./popover";
import { BsSearchField } from "./searchfield";
import { cn } from "../lib/utils";

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

interface SelectOption {
  id: string | number;
  name: string;
}

interface SelectProps {
  options: Array<SelectOption>;
  value?: Array<SelectOption>;
  onChange?: (value: Array<SelectOption>) => void;
}

function Select() {
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <AriaSelect>
      <Button variant="outline" className="justify-between w-full">
        <SelectValue>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? (
              <div className="flex-1 w-full text-muted-foreground">Select</div>
            ) : (
              defaultChildren
            );
          }}
        </SelectValue>
        <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
      </Button>
      <Popover
        isAnimated={false}
        className="!max-h-[400px] w-(--trigger-width) flex flex-col p-2 gap-1"
      >
        <Autocomplete filter={contains}>
          <BsSearchField autoFocus className="ring-0! border border-input" />
          <ListBox
            selectionMode="multiple"
            onSelectionChange={(v) => console.log(v)}
            items={languages}
            className="outline-hidden overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </ListBox>
        </Autocomplete>
      </Popover>
    </AriaSelect>
  );
}

function MultipleSelect() {
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <PopoverTrigger>
      <Button variant="outline" className="justify-between w-full">
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
        <Autocomplete filter={contains}>
          <BsSearchField autoFocus className="ring-0! border border-input" />
          <ListBox
            selectionMode="multiple"
            onSelectionChange={(v) => console.log(v)}
            items={languages}
            className="outline-hidden overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </ListBox>
        </Autocomplete>
      </Popover>
    </PopoverTrigger>
  );
}

function SelectItem(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem
      {...props}
      textValue={props.children}
      className={cn(
        "cursor-pointer group flex items-center select-none gap-2 py-1.5 px-3 outline-hidden rounded-sm text-popover-foreground",
        "data-[focus-visible]:bg-neutral-500/15 data-hovered:bg-primary! data-hovered:text-white!"
      )}
    >
      {({ isSelected }) => (
        <>
          <span className="w-4 flex items-center justify-center">
            {isSelected && <CheckIcon size={16} />}
          </span>
          <span className="text-sm flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
            {props.children}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}

export { Select, SelectItem, MultipleSelect };
export type { SelectProps, SelectOption };
