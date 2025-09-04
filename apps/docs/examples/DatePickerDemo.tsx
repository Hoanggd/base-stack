"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerDemo() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyDatePicker
      label="Select Date"
      value={value}
      onChange={setValue}
      className="w-[200px]"
    />
  );
}
