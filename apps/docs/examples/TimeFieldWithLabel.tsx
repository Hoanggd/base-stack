"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { BsTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldWithLabel() {
  const [value, setValue] = useState(new Time(9, 0));

  return (
    <BsTimeField
      label="Start Time"
      value={value}
      onChange={setValue}
    />
  );
}
