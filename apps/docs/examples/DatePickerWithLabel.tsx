"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerWithLabel() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyDatePicker
      label="Meeting Date"
      value={value}
      onChange={setValue}
    />
  );
}
