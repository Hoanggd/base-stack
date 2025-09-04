"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyDateRangePicker } from "@workspace/ui/components/date-picker";

export function DateRangePickerWithError() {
  const [value, setValue] = useState<{
    start: CalendarDate | null;
    end: CalendarDate | null;
  } | null>(null);

  return (
    <JollyDateRangePicker
      label="Required Date Range"
      value={value}
      onChange={setValue}
      isRequired
      errorMessage={!value ? "Please select a date range" : undefined}
    />
  );
}
