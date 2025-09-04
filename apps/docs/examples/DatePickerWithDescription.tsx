"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerWithDescription() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <BsDatePicker
      label="Project Deadline"
      description="Choose the deadline for your project"
      value={value}
      onChange={setValue}
    />
  );
}
