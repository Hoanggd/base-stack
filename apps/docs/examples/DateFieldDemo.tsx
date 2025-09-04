"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDateField } from "@workspace/ui/components/datefield";

export function DateFieldDemo() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <JollyDateField
      label="Birth Date"
      value={value}
      onChange={setValue}
    />
  );
}
