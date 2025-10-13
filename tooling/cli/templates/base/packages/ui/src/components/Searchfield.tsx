'use client'

import { FieldGroup } from '@workspace/ui/components/Field'
import { SearchIcon, XIcon } from 'lucide-react'
import {
    Button as AriaButton,
    ButtonProps as AriaButtonProps,
    Group as AriaGroup,
    GroupProps as AriaGroupProps,
    Input as AriaInput,
    InputProps as AriaInputProps,
    SearchField as AriaSearchField,
    SearchFieldProps as AriaSearchFieldProps,
    composeRenderProps,
} from 'react-aria-components'

import { cn } from '@workspace/ui/lib/utils'

function SearchField({ className, ...props }: AriaSearchFieldProps) {
    return (
        <AriaSearchField
            aria-label="Search"
            className={composeRenderProps(className, className => cn('group', className))}
            {...props}
        />
    )
}

function SearchFieldInput({ className, ...props }: AriaInputProps) {
    return (
        <AriaInput
            aria-label="Search"
            className={composeRenderProps(className, className =>
                cn(
                    'min-w-0 flex-1 px-2 py-1.5 outline outline-0 placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden',
                    className,
                ),
            )}
            {...props}
        />
    )
}

function SearchFieldGroup({ className, ...props }: AriaGroupProps) {
    return (
        <AriaGroup
            className={composeRenderProps(className, className =>
                cn(
                    'flex h-10 w-full items-center overflow-hidden rounded-md border  px-3 py-2 text-sm ring-offset-background',
                    /* Focus Within */
                    'data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring data-[focus-within]:ring-offset-2',
                    /* Disabled */
                    'data-[disabled]:opacity-50',
                    className,
                ),
            )}
            {...props}
        />
    )
}

function SearchFieldClear({ className, ...props }: AriaButtonProps) {
    return (
        <AriaButton
            className={composeRenderProps(className, className =>
                cn(
                    'rounded-sm opacity-70 ring-offset-background transition-opacity',
                    /* Hover */
                    'data-[hovered]:opacity-100',
                    /* Disabled */
                    'data-[disabled]:pointer-events-none',
                    /* Empty */
                    'group-data-[empty]:invisible',
                    className,
                ),
            )}
            {...props}
        />
    )
}

interface BsSearchFieldProps extends AriaSearchFieldProps {
    placeholder?: string
    containerClassName?: string
}

function BsSearchField({ className, placeholder = 'Search...', containerClassName, ...props }: BsSearchFieldProps) {
    return (
        <SearchField className={cn('group flex flex-col gap-2', containerClassName)} {...props}>
            <FieldGroup className={() => cn('px-2', className)}>
                <SearchIcon aria-hidden className="size-4 text-muted-foreground pointer-events-none" />
                <SearchFieldInput placeholder={placeholder} />
                <SearchFieldClear>
                    <XIcon aria-hidden className="size-4" />
                </SearchFieldClear>
            </FieldGroup>
        </SearchField>
    )
}

export { BsSearchField, SearchField, SearchFieldClear, SearchFieldGroup, SearchFieldInput }
export type { BsSearchFieldProps }
