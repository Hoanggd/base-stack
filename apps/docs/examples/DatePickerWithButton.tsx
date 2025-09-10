"use client";

import { Button } from "@workspace/ui/components/button";
import { BsDatePicker } from "@workspace/ui/components/date-picker";

export function DatePickerWithButton() {
  return (
    <div className="w-full flex items-center gap-2">
      <BsDatePicker />
      <Button>Submit</Button>
    </div>
  );
}
