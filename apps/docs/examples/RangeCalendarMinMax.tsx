"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsRangeCalendar } from "@workspace/ui/components/calendar";

export function RangeCalendarMinMax() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 3 }),
  });
  const minValue = today(getLocalTimeZone());
  const maxValue = new CalendarDate(2025, 12, 31);

  return (
    <BsRangeCalendar
      value={value}
      onChange={setValue}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
}
