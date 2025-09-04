"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsRangeCalendar } from "@workspace/ui/components/calendar";

export function RangeCalendarDisabled() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 2 }),
  });
  
  // Disable weekends
  const isDateUnavailable = (date: CalendarDate) => {
    const dayOfWeek = date.dayOfWeek;
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };

  return (
    <BsRangeCalendar
      value={value}
      onChange={setValue}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
