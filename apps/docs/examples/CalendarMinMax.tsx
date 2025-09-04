"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsCalendar } from "@workspace/ui/components/calendar";

export function CalendarMinMax() {
  const [value, setValue] = useState(today(getLocalTimeZone()));
  const minValue = today(getLocalTimeZone());
  const maxValue = new CalendarDate(2025, 12, 31);

  return (
    <BsCalendar
      value={value}
      onChange={setValue}
      minValue={minValue}
      maxValue={maxValue}
    />
  );
}
