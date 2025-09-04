"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDateField } from "@workspace/ui/components/datefield";

export function DateFieldWithLabel() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyDateField
      label="Event Date"
      value={value}
      onChange={setValue}
    />
  );
}
