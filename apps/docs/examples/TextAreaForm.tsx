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
import { TextArea } from "@workspace/ui/components/Textfield";

interface FormData {
  bio: string;
}

export function TextAreaForm() {
  const form = useForm<FormData>({
    defaultValues: {
      bio: "",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="bio"
          rules={{ validate: z.string().min(2).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <TextArea placeholder="Type your bio here..." {...field} />
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
