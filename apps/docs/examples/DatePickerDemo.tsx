"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerDemo() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <BsDatePicker
      label="Select Date"
      value={value}
      onChange={setValue}
      className="w-[200px]"
    />
  );
}
