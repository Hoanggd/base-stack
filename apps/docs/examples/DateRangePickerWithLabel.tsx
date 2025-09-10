"use client";

import { BsDateRangePicker } from "@workspace/ui/components/date-picker";
import { Label } from "@workspace/ui/components/field";

export function DateRangePickerWithLabel() {
  return (
    <div className="w-full">
      <Label>Date</Label>
      <BsDateRangePicker />
    </div>
  );
}
