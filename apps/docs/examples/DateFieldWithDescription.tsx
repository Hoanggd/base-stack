"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsDateField } from "@workspace/ui/components/datefield";

export function DateFieldWithDescription() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <BsDateField
      label="Appointment Date"
      description="Select the date for your appointment"
      value={value}
      onChange={setValue}
    />
  );
}
