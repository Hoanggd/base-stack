"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsRangeCalendar } from "@workspace/ui/components/calendar";

export function RangeCalendarDemo() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  });

  return (
    <BsRangeCalendar
      value={value}
      onChange={setValue}
    />
  );
}
