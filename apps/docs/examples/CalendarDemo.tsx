"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyCalendar } from "@workspace/ui/components/calendar";

export function CalendarDemo() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyCalendar
      value={value}
      onChange={setValue}
    />
  );
}
