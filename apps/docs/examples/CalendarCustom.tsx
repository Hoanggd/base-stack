"use client";

import { useState } from "react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { JollyCalendar } from "@workspace/ui/components/calendar";

export function CalendarCustom() {
  const [value, setValue] = useState(today(getLocalTimeZone()));

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Selected Date:</h3>
        <p className="text-sm text-muted-foreground">
          {value ? value.toString() : "No date selected"}
        </p>
      </div>
      <JollyCalendar
        value={value}
        onChange={setValue}
      />
    </div>
  );
}
