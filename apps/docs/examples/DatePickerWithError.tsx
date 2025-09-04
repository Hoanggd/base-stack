"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { BsDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerWithError() {
  const [value, setValue] = useState<CalendarDate | null>(null);

  return (
    <BsDatePicker
      label="Required Date"
      value={value}
      onChange={setValue}
      isRequired
      errorMessage={!value ? "Please select a date" : undefined}
    />
  );
}
