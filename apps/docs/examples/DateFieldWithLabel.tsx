"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsDateField } from "@workspace/ui/components/datefield";

export function DateFieldWithLabel() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <BsDateField
      label="Event Date"
      value={value}
      onChange={setValue}
    />
  );
}
