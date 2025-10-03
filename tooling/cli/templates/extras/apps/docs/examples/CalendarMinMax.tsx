'use client'

import { BsCalendar } from '@workspace/ui/components/Calendar'
import dayjs from 'dayjs'

export function CalendarMinMax() {
    return (
        <BsCalendar minValue={dayjs().format('YYYY-MM-DD')} maxValue={dayjs().add(10, 'days').format('YYYY-MM-DD')} />
    )
}
