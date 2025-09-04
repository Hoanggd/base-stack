"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { JollyTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldWithDescription() {
  const [value, setValue] = useState(new Time(12, 0));

  return (
    <JollyTimeField
      label="Lunch Time"
      description="Select your preferred lunch time"
      value={value}
      onChange={setValue}
    />
  );
}
