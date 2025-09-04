"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { BsTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldWithError() {
  const [value, setValue] = useState<Time | null>(null);

  return (
    <BsTimeField
      label="Required Time"
      value={value}
      onChange={setValue}
      isRequired
      errorMessage={!value ? "Please select a time" : undefined}
    />
  );
}
