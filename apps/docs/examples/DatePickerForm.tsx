"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@workspace/ui/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/Form";
import { BsDatePicker } from "@workspace/ui/components/DatePicker";

interface FormData {
  startDate: string;
}

export function DatePickerForm() {
  const form = useForm<FormData>({
    defaultValues: {
      startDate: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="startDate"
          rules={{
            required: "Start date is required",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <BsDatePicker {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Form>
  );
}
