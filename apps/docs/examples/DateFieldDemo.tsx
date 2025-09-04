"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { BsDateField } from "@workspace/ui/components/datefield";

export function DateFieldDemo() {
  return <BsDateField label="Birth Date" className="w-[200px]" />;
}
