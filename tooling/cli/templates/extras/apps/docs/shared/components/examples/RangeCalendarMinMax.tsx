import { BsRangeCalendar } from '@workspace/ui/components/Calendar'
import dayjs from 'dayjs'

export function RangeCalendarMinMax() {
    return (
        <BsRangeCalendar
            minValue={dayjs().format('YYYY-MM-DD')}
            maxValue={dayjs().add(20, 'days').format('YYYY-MM-DD')}
        />
    )
}
