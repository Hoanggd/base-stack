'use client'

import { BsDateRangePicker } from '@workspace/ui/components/DatePicker'
import { Label } from '@workspace/ui/components/Field'

export function DateRangePickerWithLabel() {
    return (
        <div className="w-full">
            <Label>Date</Label>
            <BsDateRangePicker />
        </div>
    )
}
