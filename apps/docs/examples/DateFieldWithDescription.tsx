"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDateField } from "@workspace/ui/components/datefield";

export function DateFieldWithDescription() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyDateField
      label="Appointment Date"
      description="Select the date for your appointment"
      value={value}
      onChange={setValue}
    />
  );
}
