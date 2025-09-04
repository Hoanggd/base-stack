"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyDateField } from "@workspace/ui/components/datefield";

export function DateFieldDemo() {
  return <JollyDateField label="Birth Date" className="w-[200px]" />;
}
