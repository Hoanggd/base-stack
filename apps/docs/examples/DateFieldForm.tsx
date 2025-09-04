"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { today, getLocalTimeZone } from "@internationalized/date";
import { z } from "@workspace/ui/lib/zod";

import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { JollyDateField } from "@workspace/ui/components/datefield";

interface FormData {
  eventDate: any;
}

export function DateFieldForm() {
  const form = useForm<FormData>({
    defaultValues: {
      eventDate: today(getLocalTimeZone()),
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
          name="eventDate"
          rules={{
            required: "Event date is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Date</FormLabel>
              <FormControl>
                <JollyDateField
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
