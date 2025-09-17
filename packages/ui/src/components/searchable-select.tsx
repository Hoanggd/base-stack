"use client";

import type { ListBoxItemProps } from "react-aria-components";
import {
  Autocomplete,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Select as AriaSelect,
  SelectValue,
  useFilter,
} from "react-aria-components";
import { CheckIcon, ChevronsUpDownIcon, SearchIcon, XIcon } from "lucide-react";
import { Button } from "./button";

const languages = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Italian" },
  { id: 6, name: "Portuguese" },
  { id: 7, name: "Russian" },
  { id: 8, name: "Turkish" },
  { id: 9, name: "Arabic" },
  { id: 10, name: "Japanese" },
  { id: 11, name: "Korean" },
  { id: 12, name: "Chinese" },
];

export function SearchableSelect() {
  let { contains } = useFilter({ sensitivity: "base" });

  return (
    <AriaSelect className="w-full">
      <Button
        variant="outline"
        className="justify-between w-full font-normal data-[hovered]:bg-background"
      >
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
      <Popover className="!max-h-80 w-(--trigger-width) flex flex-col rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <Autocomplete filter={contains}>
          <SearchField
            aria-label="Search"
            autoFocus
            className="group flex items-center bg-white border-2 border-neutral-300 has-focus:border-sky-600 rounded-full m-1"
          >
            <SearchIcon
              aria-hidden
              className="w-4 h-4 ml-2 text-neutral-600 forced-colors:text-[ButtonText]"
            />
            <Input
              placeholder="Search"
              className="px-2 py-1 flex-1 min-w-0 border-none outline outline-0 bg-white text-base text-neutral-800 placeholder-neutral-500 font-[inherit] [&::-webkit-search-cancel-button]:hidden"
            />
            <Button className="text-sm text-center transition rounded-full border-0 p-1 flex items-center justify-center text-neutral-600 bg-transparent hover:bg-black/[5%] pressed:bg-black/10 mr-1 w-6 group-empty:invisible">
              <XIcon aria-hidden className="w-4 h-4" />
            </Button>
          </SearchField>
          <ListBox
            items={languages}
            className="outline-hidden p-1 overflow-auto flex-1 scroll-pb-1"
          >
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </ListBox>
        </Autocomplete>
      </Popover>
    </AriaSelect>
  );
}

function SelectItem(props: ListBoxItemProps & { children: string }) {
  return (
    <ListBoxItem
      {...props}
      textValue={props.children}
      className="group flex items-center gap-2 select-none py-2 px-4 outline-hidden rounded-sm text-neutral-900 data-focused:bg-sky-600 data-focused:text-white"
    >
      {({ isSelected }) => (
        <>
          <span className="flex-1 flex items-center gap-2 truncate font-normal group-selected:font-medium">
            {props.children}
          </span>
          <span className="w-5 flex items-center text-sky-600 group-data-focused:text-white">
            {isSelected && <CheckIcon size="S" />}
          </span>
        </>
      )}
    </ListBoxItem>
  );
}
