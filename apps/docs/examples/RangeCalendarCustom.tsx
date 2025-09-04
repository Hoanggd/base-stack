"use client";

import { useState } from "react";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";
import { JollyRangeCalendar } from "@workspace/ui/components/calendar";

export function RangeCalendarCustom() {
  const [value, setValue] = useState<{
    start: CalendarDate | null;
    end: CalendarDate | null;
  } | null>(null);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Selected Range:</h3>
        <p className="text-sm text-muted-foreground">
          {value?.start && value?.end 
            ? `${value.start.toString()} - ${value.end.toString()}`
            : "No range selected"
          }
        </p>
      </div>
      <JollyRangeCalendar
        value={value}
        onChange={setValue}
        className="border rounded-lg p-4"
      />
    </div>
  );
}
