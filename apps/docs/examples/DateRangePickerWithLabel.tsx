"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyDateRangePicker } from "@workspace/ui/components/date-picker";

export function DateRangePickerWithLabel() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 3 }),
  });

  return (
    <JollyDateRangePicker
      label="Vacation Period"
      value={value}
      onChange={setValue}
    />
  );
}
