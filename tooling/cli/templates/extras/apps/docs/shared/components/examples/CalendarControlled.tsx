'use client'

import { BsCalendar } from '@workspace/ui/components/Calendar'
import { useState } from 'react'

export function CalendarControlled() {
    const [value, setValue] = useState<string>()

    return (
        <div className="flex flex-col gap-2">
            <BsCalendar value={value} onChange={setValue} />
            <pre className="font-mono text-xs bg-background-secondary p-2 rounded-md border">
                {value ? JSON.stringify(value) : 'No value'}
            </pre>
        </div>
    )
}
