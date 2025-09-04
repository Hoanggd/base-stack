"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { today, getLocalTimeZone, CalendarDate } from "@internationalized/date";

import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { JollyDateRangePicker } from "@workspace/ui/components/date-picker";

interface FormData {
  dateRange: {
    start: CalendarDate | null;
    end: CalendarDate | null;
  } | null;
}

export function DateRangePickerForm() {
  const form = useForm<FormData>({
    defaultValues: {
      dateRange: {
        start: today(getLocalTimeZone()),
        end: today(getLocalTimeZone()).add({ days: 7 }),
      },
    },
  });

  function onSubmit(data: FormData) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-background-tertiary p-4">
          <code className="text-foreground">
            {JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="dateRange"
          rules={{
            required: "Date range is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date Range</FormLabel>
              <FormControl>
                <JollyDateRangePicker
                  value={field.value}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
