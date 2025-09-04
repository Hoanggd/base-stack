"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyCalendar } from "@workspace/ui/components/calendar";

export function CalendarDisabled() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  // Disable weekends
  const isDateUnavailable = (date: CalendarDate) => {
    const dayOfWeek = date.dayOfWeek;
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
  };

  return (
    <JollyCalendar
      value={value}
      onChange={setValue}
      isDateUnavailable={isDateUnavailable}
    />
  );
}
