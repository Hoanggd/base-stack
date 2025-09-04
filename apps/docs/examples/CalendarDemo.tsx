"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsCalendar } from "@workspace/ui/components/calendar";

export function CalendarDemo() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <BsCalendar
      value={value}
      onChange={setValue}
    />
  );
}
