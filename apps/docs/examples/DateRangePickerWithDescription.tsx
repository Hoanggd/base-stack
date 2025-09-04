"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyDateRangePicker } from "@workspace/ui/components/date-picker";

export function DateRangePickerWithDescription() {
  const [value, setValue] = useState({
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()).add({ days: 5 }),
  });

  return (
    <JollyDateRangePicker
      label="Project Timeline"
      description="Select the start and end dates for your project"
      value={value}
      onChange={setValue}
    />
  );
}
