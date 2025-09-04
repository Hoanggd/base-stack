"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyCalendar } from "@workspace/ui/components/calendar";

export function CalendarMinMax() {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const minValue = today(getLocalTimeZone());
  const maxValue = new CalendarDate(2025, 12, 31);

  return (
    <JollyCalendar
      value={value}
      onChange={setValue}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
}
