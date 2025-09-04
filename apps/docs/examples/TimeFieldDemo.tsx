"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { BsTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldDemo() {
  const [value, setValue] = useState(new Time(14, 30));

  return (
    <BsTimeField
      label="Meeting Time"
      value={value}
      onChange={setValue}
    />
  );
}
