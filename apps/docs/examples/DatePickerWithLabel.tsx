"use client";

import { BsDatePicker } from "@workspace/ui/components/date-picker";
import { Label } from "@workspace/ui/components/field";

export function DatePickerWithLabel() {
  return (
    <div className="w-full">
      <Label>Date</Label>
      <BsDatePicker />
    </div>
  );
}
