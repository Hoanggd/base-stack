'use client'

import { CheckIcon, ChevronsUpDownIcon, XIcon } from 'lucide-react'
import React from 'react'
import type { ListBoxItemProps } from 'react-aria-components'
import { Select as AriaSelect, Autocomplete, ListBox, ListBoxItem, SelectValue, useFilter } from 'react-aria-components'
import { cn } from '@workspace/ui/lib/utils'
import { Button } from '@workspace/ui/components/Button'
import { Popover, PopoverTrigger } from '@workspace/ui/components/Popover'
import { BsSearchField } from '@workspace/ui/components/Searchfield'
import { Badge } from '@workspace/ui/components/Badge'

interface BsSelectOption {
    id: string | number
    name: string
}

interface BsSelectProps<S extends BsSelectOption> {
    /**
     * The array of options to display in the select dropdown.
     */
    options: Array<S>

    /**
     * The currently selected value (option id).
     */
    value?: S['id']

    /**
     * Callback fired when the selected value changes.
     */
    onChange?: (value?: S['id']) => void

    /**
     * Callback fired when the select is blurred.
     */
    onBlur?: () => void

    /**
     * The default selected value (option id).
     */
    defaultValue?: S['id']

    /**
     * If true, enables a search field for filtering options.
     */
    isSearchable?: boolean

    /**
     * Custom render function for the selected value display.
     */
    renderValue?: (value: S) => React.ReactNode

    /**
     * Custom render function for each option in the dropdown.
     */
    renderOption?: (item: S) => React.ReactNode

    /**
     * If true, the select is disabled.
     */
    isDisabled?: boolean

    /**
     * If true, the clear button will be shown.
     */
    isClearable?: boolean

    /**
     * The class name of the select.
     */
    className?: string

    /**
     * The class name of the popover.
     */
    popoverClassName?: string

    /**
     * The placeholder of the select. Default is "Select".
     */
    placeholder?: string
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
    isClearable,
    onBlur,
    className,
    popoverClassName,
    placeholder = 'Select',
    ...props
}: BsSelectProps<S>) {
    const [isOpen, setIsOpen] = React.useState(false)

    const [uncontrolledValue, uncontrolledOnChange] = React.useState<S['id'] | undefined>(defaultValue)
    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? uncontrolledOnChange

    const handleClear = () => {
        onChange(undefined)
    }

    return (
        <AriaSelect
            isOpen={isOpen}
            onOpenChange={isOpen => {
                if (!isOpen) {
                    setIsOpen(false)
                    onBlur?.()
                }
            }}
            aria-label="Select"
            isDisabled={isDisabled}
            className={cn('group w-full', className)}
            selectedKey={value || null}
            onSelectionChange={value => onChange(value || undefined)}
            isInvalid={(props as any)['aria-invalid']}
        >
            <Button
                variant="outline"
                className={cn(
                    'justify-between w-full pr-2 h-auto py-[5px] min-h-8 font-normal text-start relative',
                    'group-data-[invalid]:border-destructive group-data-[disabled]:opacity-80',
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <SelectValue className="truncate">
                    {({ isPlaceholder, selectedItem }) => {
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

                        return renderValue ? renderValue(selectedItem as S) : (selectedItem as S)?.name
                    }}
                </SelectValue>
                {isClearable && !!value && (
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={e => {
                            e.stopPropagation()
                            handleClear()
                        }}
                        className={cn(
                            'size-6! flex items-center justify-center z-10 rounded bg-background-secondary text-muted-foreground hover:bg-background-tertiary',
                            'absolute right-1 top-1/2 -translate-y-1/2',
                            'transition-opacity opacity-0 group-hover:opacity-100',
                        )}
                    >
                        <XIcon className="w-4 h-4" />
                    </div>
                )}

                <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Popover
                isAnimated={false}
                className={cn('!max-h-[350px] w-(--trigger-width) flex flex-col p-1.5 gap-1', popoverClassName)}
            >
                <ItemsWrapper isSearchable={isSearchable}>
                    <ListBox items={options} className="outline-hidden overflow-auto flex-1 scroll-pb-1">
                        {item => <BsSelectItem renderOption={renderOption}>{item.name}</BsSelectItem>}
                    </ListBox>
                </ItemsWrapper>
            </Popover>
        </AriaSelect>
    )
}

interface BsMultipleSelectProps<S extends BsSelectOption> {
    /**
     * The array of options to display in the select dropdown.
     */
    options: Array<S>

    /**
     * The currently selected value (option id).
     */
    value?: Array<S['id']>

    /**
     * Callback fired when the selected value changes.
     */
    onChange?: (value?: Array<S['id']>) => void

    /**
     * Callback fired when the select is blurred.
     */
    onBlur?: () => void

    /**
     * The default selected value (option id).
     */
    defaultValue?: Array<S['id']>

    /**
     * If true, enables a search field for filtering options.
     */
    isSearchable?: boolean

    /**
     * Custom render function for the selected value display.
     */
    renderValue?: (value: S) => React.ReactNode

    /**
     * Custom render function for each option in the dropdown.
     */
    renderOption?: (item: S) => React.ReactNode

    /**
     * If true, the select is disabled.
     */
    isDisabled?: boolean

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
     * The class name of the popover.
     */
    popoverClassName?: string

    /**
     * The placeholder of the select. Default is "Select".
     */
    placeholder?: string
}

function BsMultipleSelect<S extends BsSelectOption>({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    isSearchable = false,
    options,
    renderOption,
    renderValue,
    isDisabled,
    maxVisibleBadges = 2,
    isClearable = true,
    onBlur,
    className,
    popoverClassName,
    placeholder = 'Select',
    ...props
}: BsMultipleSelectProps<S>) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [uncontrolledValue, uncontrolledOnChange] = React.useState<Array<S['id']> | undefined>(defaultValue)
    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? uncontrolledOnChange

    const isInvalid = (props as any)['aria-invalid']
    const isPlaceholder = !value || value.length === 0

    const handleClear = () => {
        onChange([])
        setIsOpen(false)
    }

    return (
        <PopoverTrigger
            aria-label="Select"
            isOpen={isOpen}
            onOpenChange={isOpen => {
                if (!isOpen) {
                    setIsOpen(false)
                    onBlur?.()
                }
            }}
        >
            <Button
                variant="outline"
                isDisabled={isDisabled}
                className={cn(
                    'group w-full pr-2 h-auto py-[5px] min-h-8 font-normal text-start relative',
                    isInvalid && 'border-destructive',
                    className,
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex-1 flex gap-1 flex-wrap">
                    {isPlaceholder && placeholder && <div className="text-muted-foreground">{placeholder}</div>}

                    {/* Visible badges */}
                    {value?.slice(0, maxVisibleBadges).map(v => {
                        const option = options.find(o => o.id === v)

                        if (!option) return null

                        return (
                            <Badge key={v} variant="secondary" className="pr-0.5 grid grid-cols-[1fr_16px]">
                                <div className="truncate">{renderValue ? renderValue(option) : option.name}</div>
                                <div
                                    role="button"
                                    tabIndex={0}
                                    className="size-4! flex items-center justify-center z-10 rounded bg-transparent hover:bg-neutral-400/15"
                                    onClick={e => {
                                        e.stopPropagation()
                                        onChange(value.filter(c => c !== v))
                                    }}
                                >
                                    <XIcon className="size-2.5!" />
                                </div>
                            </Badge>
                        )
                    })}

                    {/* Remaining badges count */}
                    {!!value?.length && value.length > maxVisibleBadges && (
                        <Badge variant="secondary">
                            <span>{`+${value?.length - maxVisibleBadges}`}</span>
                        </Badge>
                    )}
                </div>

                {isClearable && !!value?.length && (
                    <div
                        role="button"
                        tabIndex={0}
                        onClick={e => {
                            e.stopPropagation()
                            handleClear()
                        }}
                        className={cn(
                            'size-6! flex items-center justify-center z-10 rounded bg-background-secondary text-muted-foreground hover:bg-background-tertiary',
                            'absolute right-1 top-1/2 -translate-y-1/2',
                            'transition-opacity opacity-0 group-hover:opacity-100',
                        )}
                    >
                        <XIcon className="w-4 h-4" />
                    </div>
                )}

                <ChevronsUpDownIcon className="w-4 h-4 text-muted-foreground" />
            </Button>
            <Popover
                isAnimated={false}
                className={cn('!max-h-[350px] w-(--trigger-width) flex flex-col p-1.5 gap-1', popoverClassName)}
            >
                <ItemsWrapper isSearchable={isSearchable}>
                    <ListBox
                        items={options}
                        aria-label="Select"
                        selectionMode="multiple"
                        selectedKeys={value}
                        onSelectionChange={v => onChange(Array.from(v))}
                        className="outline-hidden overflow-auto flex-1 scroll-pb-1"
                    >
                        {item => <BsSelectItem renderOption={renderOption}>{item.name}</BsSelectItem>}
                    </ListBox>
                </ItemsWrapper>
            </Popover>
        </PopoverTrigger>
    )
}

interface ItemsWrapperProps {
    children: React.ReactNode
    isSearchable: boolean
}

function ItemsWrapper({ children, isSearchable }: ItemsWrapperProps) {
    let { contains } = useFilter({ sensitivity: 'base' })

    return isSearchable ? (
        <Autocomplete filter={contains}>
            <BsSearchField autoFocus className="ring-0! border border-input" /> {children}
        </Autocomplete>
    ) : (
        children
    )
}

function BsSelectItem<S extends BsSelectOption>(
    props: ListBoxItemProps & {
        children: string
        renderOption?: (item: S) => React.ReactNode
    },
) {
    return (
        <ListBoxItem
            {...props}
            textValue={props.children}
            className={cn(
                'cursor-pointer group flex items-center select-none gap-2 py-1.5 px-2 outline-hidden rounded-sm text-popover-foreground',
                'data-[focus-visible]:bg-neutral-500/15 data-hovered:bg-primary! data-hovered:text-white!',
            )}
        >
            {({ isSelected }) => (
                <>
                    <div className="text-sm flex-1 font-normal group-selected:font-medium overflow-hidden">
                        <div className="truncate">
                            {props.renderOption ? props.renderOption(props.value as S) : props.children}
                        </div>
                    </div>
                    <div className="w-5 flex items-center justify-center">{isSelected && <CheckIcon size={16} />}</div>
                </>
            )}
        </ListBoxItem>
    )
}

export { BsMultipleSelect, BsSelect }
export type { BsSelectOption, BsSelectProps, BsMultipleSelectProps }
