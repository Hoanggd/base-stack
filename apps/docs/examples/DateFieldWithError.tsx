"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyDateField } from "@workspace/ui/components/datefield";

export function DateFieldWithError() {
  const [value, setValue] = useState<CalendarDate | null>(null);

  return (
    <JollyDateField
      label="Required Date"
      value={value}
      onChange={setValue}
      isRequired
      errorMessage={!value ? "Please select a date" : undefined}
    />
  );
}
