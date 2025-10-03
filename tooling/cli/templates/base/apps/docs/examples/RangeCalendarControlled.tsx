'use client'

import { BsRangeCalendar, BsRangeCalendarValue } from '@workspace/ui/components/Calendar'
import { useState } from 'react'

export function RangeCalendarControlled() {
    const [value, setValue] = useState<BsRangeCalendarValue>()

    return (
        <div className="flex flex-col gap-2">
            <BsRangeCalendar value={value} onChange={setValue} />
            <pre className="font-mono text-xs bg-background-secondary p-2 rounded-md border">
                {value ? JSON.stringify(value, null, 2) : 'No value'}
            </pre>
        </div>
    )
}
