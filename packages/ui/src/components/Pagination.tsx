'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import React from 'react'
import ReactPaginate from 'react-paginate'
import { cn } from '@workspace/ui/lib/utils'
import { BsSelect } from '@workspace/ui/components/Select'
import { useIsMobile } from '@workspace/ui/hooks/use-mobile'

const baseClass =
    'cursor-pointer select-none text-[13px] font-medium flex w-8 h-8 items-center justify-center rounded-sm hover:bg-background-secondary'

interface PaginationProps {
    /**
     * The current page, starting from 1
     */
    value?: number

    /**
     * The function to call when the page index changes
     */
    onChange?: (value: number) => void

    /**
     * The total number of pages
     */
    pageCount: number
}

function Pagination({ value: controlledValue, onChange: controlledOnChange, pageCount }: PaginationProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number | undefined>(controlledValue)

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    const isMobile = useIsMobile()

    return (
        <ReactPaginate
            forcePage={(value || 1) - 1}
            onPageChange={data => onChange?.(data.selected + 1)}
            pageCount={pageCount}
            previousLabel={<ChevronLeft className="w-4 h-4" />}
            nextLabel={<ChevronRight className="w-4 h-4" />}
            pageRangeDisplayed={isMobile ? 0 : 2}
            marginPagesDisplayed={isMobile ? 0 : 1}
            containerClassName="flex items-center justify-center gap-1"
            pageLinkClassName={baseClass}
            activeLinkClassName={cn(baseClass, 'bg-background-secondary shadow-sm border  text-foreground')}
            previousLinkClassName={baseClass}
            nextLinkClassName={baseClass}
            breakLinkClassName={baseClass}
            disabledLinkClassName="opacity-50 cursor-not-allowed! hover:bg-transparent!"
            breakLabel="..."
            breakClassName="block"
        />
    )
}

interface PaginationPageSizeSelectorProps {
    /**
     * The currently selected value (controlled).
     */
    value?: number

    /**
     * Callback fired when the value changes.
     */
    onChange?: (value: number) => void

    /**
     * The default value (uncontrolled).
     */
    defaultValue?: number

    /**
     * The list of selectable options.
     */
    options?: number[]
}

function PaginationPageSizeSelector({
    value: controlledValue,
    onChange: controlledOnChange,
    defaultValue,
    options = [5, 10, 20, 50, 100],
}: PaginationPageSizeSelectorProps) {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<number | undefined>(defaultValue || options[0])

    const value = controlledValue ?? uncontrolledValue
    const onChange = controlledOnChange ?? setUncontrolledValue

    return (
        <div className="flex items-center gap-2">
            <BsSelect
                value={value}
                onChange={value => onChange?.(Number(value || 0))}
                options={options.map(option => ({
                    id: option,
                    name: option.toString(),
                }))}
                placeholder=""
                isClearable={false}
                className="min-w-[66px]"
                popoverClassName="w-[90px]"
            />
            <span className="text-xs text-muted-foreground whitespace-nowrap">Items per page</span>
        </div>
    )
}

export { Pagination, PaginationPageSizeSelector }
export type { PaginationPageSizeSelectorProps, PaginationProps }
