'use client'

import { Badge } from '@workspace/ui/components/Badge'
import { Button } from '@workspace/ui/components/Button'
import { Popover } from '@workspace/ui/components/Popover'
import { BsSearchField } from '@workspace/ui/components/Searchfield'
import { cn } from '@workspace/ui/lib/utils'
import { flatten } from 'lodash'
import { CheckIcon, ChevronDownIcon, XIcon } from 'lucide-react'
import React from 'react'
import type { Key, ListBoxItemProps } from 'react-aria-components'
import {
    Autocomplete,
    Collection,
    ListBox,
    ListBoxItem,
    ListBoxLoadMoreItem,
    ListLayout,
    Select,
    SelectProps,
    SelectStateContext,
    SelectValue,
    useFilter,
    Virtualizer,
} from 'react-aria-components'
import { Spinner } from './Spinner'

export interface BsSelectAsyncOption {
    id: string | number
    name: string
}

interface BsSelectAsyncProps<T extends BsSelectAsyncOption, M extends 'single' | 'multiple'>
    extends Omit<SelectProps<T, M>, 'children' | 'value' | 'onChange'> {
    /**
     * The array of options to display in the select dropdown.
     */
    options?: Array<T>

    /**
     * The value of the select.
     */
    value: M extends 'single' ? T | null : Array<T> | null

    /**
     * The function to call when the value changes.
     */
    onChange: (value: M extends 'single' ? T : Array<T>) => void

    /** Information for managing async option loading. */
    optionsLoader?: {
        /** Whether there are more pages of options to load. */
        hasNextPage: boolean

        /** Callback to fetch the next page of options. */
        onFetchNextPage: () => void

        /** Whether the next page of options is currently being fetched. */
        isFetching?: boolean

        /** A function to search for options. */
        onSearch?: (search: string) => void
    }

    /**
     * If true, enables a search field for filtering options.
     */
    isSearchable?: boolean

    /**
     * Custom render function for the selected value display.
     */
    renderValue?: (value: T) => React.ReactNode

    /**
     * Custom render function for each option in the dropdown.
     */
    renderOption?: (item: T) => React.ReactNode

    /**
     * The maximum number of badges to display. To show all badges, set to Infinity.
     */
    maxVisibleBadges?: number

    /**
     * If true, the clear button will be shown.
     */
    isClearable?: boolean

    /**
     * The class name of the select.
     */
    className?: string

    /**
     * The class name of the button.
     */
    buttonClassName?: string

    /**
     * The class name of the popover.
     */
    popoverClassName?: string

    /**
     * The message to display when there are no options found.
     */
    emptyMessage?: string
}

export function BsSelectAsync<T extends BsSelectAsyncOption, M extends 'single' | 'multiple' = 'single'>({
    value,
    onChange,
    options,
    renderOption,
    renderValue,
    isClearable,
    maxVisibleBadges = 2,
    placeholder = 'Select',
    isSearchable = false,
    popoverClassName,
    className,
    buttonClassName,
    optionsLoader,
    emptyMessage = 'No results found',
    ...props
}: BsSelectAsyncProps<T, M>) {
    const [isOpen, setIsOpen] = React.useState(false)
    const selectionMode = (props.selectionMode || 'single') as M

    const stringifiedOptions = options?.map(option => serializeOption(option))

    return (
        <Select
            value={serializeValue(selectionMode, value ?? undefined) as any}
            onChange={value => {
                const deserializedValue = deserializeValue(selectionMode, value as any)
                onChange?.(deserializedValue as any)
            }}
            isOpen={isOpen}
            onOpenChange={isOpen => {
                if (!isOpen) {
                    setIsOpen(false)
                    setTimeout(() => {
                        optionsLoader?.onSearch?.('')
                    }, 100)
                }
            }}
            aria-label="Select"
            isInvalid={(props as any)['aria-invalid']}
            className={cn('group w-full relative', className)}
            {...props}
        >
            <Button
                variant="outline"
                className={cn(
                    'justify-between w-full pr-2 h-auto py-[5px] min-h-8 font-normal text-start',
                    'group-data-[invalid]:border-destructive group-data-[disabled]:opacity-80',
                    'hover:bg-background-secondary',
                    buttonClassName,
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <SelectValue className="truncate">
                    {() => {
                        const selectedItems = value ? flatten([value]) : []
                        const isPlaceholder = selectedItems?.length === 0

                        if (isPlaceholder) {
                            // If placeholder is not set, return an empty div
                            if (!placeholder) {
                                return (
                                    <div className="opacity-0" aria-hidden="true">
                                        &nbsp;
                                    </div>
                                )
                            }

                            return <div className="text-muted-foreground">{placeholder}</div>
                        }

                        if (selectionMode === 'single') {
                            const selectedItem = selectedItems[0]

                            if (!selectedItem) return null

                            return renderValue ? renderValue(selectedItem) : selectedItem?.name
                        }

                        if (selectionMode === 'multiple') {
                            return (
                                <div className="flex-1 flex gap-1 flex-wrap">
                                    {selectedItems?.slice(0, maxVisibleBadges).map(item => {
                                        if (!item) return null

                                        return (
                                            <Badge
                                                key={item.id}
                                                variant="secondary"
                                                className="pr-0.5 grid grid-cols-[1fr_16px]"
                                            >
                                                <div className="truncate">
                                                    {renderValue ? renderValue(item) : item.name}
                                                </div>
                                                <BadgeClearButton data={item} />
                                            </Badge>
                                        )
                                    })}

                                    {/* Remaining badges count */}
                                    {!!selectedItems?.length && selectedItems.length > maxVisibleBadges && (
                                        <Badge variant="secondary">
                                            <span>{`+${selectedItems?.length - maxVisibleBadges}`}</span>
                                        </Badge>
                                    )}
                                </div>
                            )
                        }
                    }}
                </SelectValue>
                <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
            {isClearable && <SelectClearButton />}
            <Popover className={cn('!max-h-[350px] w-(--trigger-width) flex flex-col p-1.5 gap-1', popoverClassName)}>
                <ItemsWrapper
                    isSearchable={isSearchable}
                    manualSearching={!!optionsLoader}
                    onSearch={optionsLoader?.onSearch}
                >
                    <Virtualizer
                        layout={ListLayout}
                        layoutOptions={{
                            estimatedRowHeight: 32,
                        }}
                    >
                        <ListBox
                            className="outline-hidden overflow-auto flex-1 scroll-pb-1"
                            renderEmptyState={() => {
                                if (optionsLoader?.isFetching) return null

                                return (
                                    <div className="text-muted-foreground text-sm text-center h-8 flex items-center justify-center">
                                        {emptyMessage}
                                    </div>
                                )
                            }}
                        >
                            <Collection items={stringifiedOptions}>
                                {item => (
                                    <BsSelectAsyncItem renderOption={renderOption}>
                                        {deserializeOption(item)?.name}
                                    </BsSelectAsyncItem>
                                )}
                            </Collection>
                            <ListBoxLoadMoreItem
                                onLoadMore={optionsLoader?.hasNextPage ? optionsLoader?.onFetchNextPage : undefined}
                                isLoading={optionsLoader?.isFetching}
                                className="flex items-center justify-center pt-1.5"
                            >
                                <Spinner className="size-5 text-muted-foreground/50" />
                            </ListBoxLoadMoreItem>
                        </ListBox>
                    </Virtualizer>
                </ItemsWrapper>
            </Popover>
        </Select>
    )
}

interface ItemsWrapperProps {
    children: React.ReactNode
    isSearchable: boolean
    manualSearching?: boolean
    onSearch?: (search: string) => void
}

function ItemsWrapper({ children, isSearchable, manualSearching, onSearch }: ItemsWrapperProps) {
    const { contains } = useFilter({ sensitivity: 'base' })

    return isSearchable ? (
        <Autocomplete filter={manualSearching ? undefined : contains}>
            <BsSearchField autoFocus className="ring-0! border " onChange={onSearch} /> {children}
        </Autocomplete>
    ) : (
        children
    )
}

function BsSelectAsyncItem<T extends BsSelectAsyncOption>(
    props: ListBoxItemProps & {
        children: string
        renderOption?: (item: T) => React.ReactNode
    },
) {
    return (
        <ListBoxItem
            {...props}
            textValue={props.children}
            className={cn(
                'cursor-pointer group flex items-center select-none gap-2 py-1.5 px-2 outline-hidden rounded-sm text-popover-foreground',
                'data-[focus-visible]:bg-neutral-500/15 data-focused:bg-primary! data-focused:text-white!',
            )}
        >
            {({ isSelected }) => (
                <>
                    <div className="text-sm flex-1 font-normal group-selected:font-medium overflow-hidden">
                        <div className="truncate">
                            {props.renderOption
                                ? props.renderOption(deserializeOption(props.value as any) as T)
                                : props.children}
                        </div>
                    </div>
                    <div className="w-5 flex items-center justify-center text-primary-foreground group-data-focused:text-white">
                        {isSelected && <CheckIcon size={16} />}
                    </div>
                </>
            )}
        </ListBoxItem>
    )
}

function SelectClearButton() {
    const state = React.useContext(SelectStateContext)
    const value = state?.value as string | Array<number | string>

    if (!value || value.length === 0) return null

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={e => {
                e.stopPropagation()
                state?.setValue(null)
            }}
            className={cn(
                'size-6! flex items-center justify-center z-10 rounded bg-background-secondary text-muted-foreground hover:bg-background-tertiary',
                'absolute right-1 top-1/2 -translate-y-1/2',
                'transition-opacity opacity-0 group-hover:opacity-100',
            )}
        >
            <XIcon className="size-4" />
        </div>
    )
}

function BadgeClearButton({ data }: { data: BsSelectAsyncOption }) {
    const state = React.useContext(SelectStateContext)
    const value = state?.value as string | Array<number | string>

    if (!Array.isArray(value)) return null

    return (
        <div
            role="button"
            tabIndex={0}
            className="size-4! flex items-center justify-center z-10 rounded bg-transparent hover:bg-neutral-400/15"
            onClick={e => {
                e.stopPropagation()
                const newKeys = value.filter(v => deserializeOption({ id: v as string }).id !== data.id)
                state?.setValue(newKeys)
            }}
        >
            <XIcon className="size-2.5!" />
        </div>
    )
}

function serializeOption(item: BsSelectAsyncOption) {
    return { id: JSON.stringify(item) }
}

function deserializeOption(item: { id: string }) {
    return JSON.parse(item.id) as BsSelectAsyncOption
}

function serializeValue(
    selectionMode: 'single' | 'multiple',
    value?: BsSelectAsyncOption | Array<BsSelectAsyncOption>,
) {
    if (!value) return undefined

    if (selectionMode === 'single') {
        return JSON.stringify(value)
    }

    if (selectionMode === 'multiple') {
        return (value as Array<BsSelectAsyncOption>).map(item => JSON.stringify(item))
    }
}

function deserializeValue(selectionMode: 'single' | 'multiple', value?: Key | null) {
    if (!value) return undefined

    if (selectionMode === 'single') {
        return JSON.parse(value as string) as BsSelectAsyncOption
    }

    if (selectionMode === 'multiple') {
        return (value as unknown as Array<Key>).map(item => JSON.parse(item as string) as BsSelectAsyncOption)
    }
}
