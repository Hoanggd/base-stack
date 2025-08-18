"use client";

import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/textfield";
import { Button } from "@workspace/ui/components/button";
import { z } from "@workspace/ui/lib/zod";
import { useForm } from "react-hook-form";
import { setErrors } from "@/lib/form";

type FormInputs = {
  email: string;
  name: string;
};

class CustomError extends Error {
  public cause: Record<string, string>;

  constructor(message: string, cause: Record<string, string>) {
    super(message);
    this.name = "CustomError";
    this.cause = cause;
  }
}

const createUser = async (data: FormInputs) => {
  console.log(data);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new CustomError("Error creating user", {
    email: "Email already exists",
    name: "Name already exists",
  });
};

export default function SubmissionErrors() {
  const form = useForm<FormInputs>();
  const createUserMutation = useMutation({
    mutationFn: createUser,
  });

  const onSubmit = (data: FormInputs) => {
    createUserMutation.mutate(data, {
      onSuccess: () => {
        window.alert(JSON.stringify(data, null, 4));
      },
      onError: (error) => {
        if (error instanceof CustomError) {
          setErrors(form, error.cause);
        } else {
          // do something else, like toast.error(error.message)
        }
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <h1 className="text-2xl font-semibold">Submission Errors</h1>
        <FormField
          name="email"
          rules={{ validate: z.string().email().validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          rules={{ validate: z.string().min(4).validateFn() }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={createUserMutation.isPending} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
