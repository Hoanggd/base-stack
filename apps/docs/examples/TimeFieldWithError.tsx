"use client";

import { useState } from "react";
import { Time } from "@internationalized/date";
import { JollyTimeField } from "@workspace/ui/components/datefield";

export function TimeFieldWithError() {
  const [value, setValue] = useState<Time | null>(null);

  return (
    <JollyTimeField
      label="Required Time"
      value={value}
      onChange={setValue}
      isRequired
      errorMessage={!value ? "Please select a time" : undefined}
    />
  );
}
