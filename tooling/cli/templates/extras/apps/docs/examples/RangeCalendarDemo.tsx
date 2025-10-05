import { BsRangeCalendar } from '@workspace/ui/components/Calendar'
import dayjs from 'dayjs'

export function RangeCalendarDemo() {
    return (
        <BsRangeCalendar
            defaultValue={{
                start: dayjs().format('YYYY-MM-DD'),
                end: dayjs().add(10, 'days').format('YYYY-MM-DD'),
            }}
        />
    )
}
