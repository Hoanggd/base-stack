"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsDateRangePicker } from "@workspace/ui/components/date-picker";

export function DateRangePickerDemo() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 7 }),
  });

  return (
    <BsDateRangePicker
      label="Date Range"
      value={value}
      onChange={setValue}
    />
  );
}
