"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { JollyTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldDemo() {
  const [value, setValue] = useState(new Time(14, 30));

  return (
    <JollyTimeField
      label="Meeting Time"
      value={value}
      onChange={setValue}
    />
  );
}
