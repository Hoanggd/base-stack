"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "@workspace/ui/lib/zod";

import { Button } from "@workspace/ui/components/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/Form";
import { BsNumberField } from "@workspace/ui/components/Numberfield";

interface FormData {
  age: number;
}

export function NumberFieldForm() {
  const form = useForm<FormData>();

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
          name="age"
          rules={{
            validate: z
              .number()
              .min(18, "You must be at least 18 years old")
              .validateFn(),
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <BsNumberField
                  step={1}
                  placeholder="Enter your age"
                  {...field}
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
