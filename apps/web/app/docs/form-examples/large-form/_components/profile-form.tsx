"use client";

import { Button } from "@workspace/ui/components/button";
import { Form } from "@workspace/ui/components/form";
import { useForm } from "react-hook-form";
import { FormInputs, languages } from "./utils";
import { WorkHistory } from "./profile-form-work-history";
import { NotifyType } from "./profile-form-notify-type";
import { Profile } from "./profile-form-profile";

export function ProfileForm() {
  const form = useForm<FormInputs>({
    defaultValues: {
      languages: [languages[0]],
    },
  });

  const onSubmit = (data: FormInputs) => {
    window.alert(JSON.stringify(data, null, 4));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="container divide-y my-10"
      >
        <h1 className="text-2xl font-semibold pb-4">Large Form</h1>
        <Profile />
        <WorkHistory />
        <NotifyType />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
