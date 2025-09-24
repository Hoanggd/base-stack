"use client";

import { BsDatePicker } from "@workspace/ui/components/DatePicker";
import { Label } from "@workspace/ui/components/field";

export function DatePickerWithLabel() {
  return (
    <div className="w-full">
      <Label>Date</Label>
      <BsDatePicker />
    </div>
  );
}
