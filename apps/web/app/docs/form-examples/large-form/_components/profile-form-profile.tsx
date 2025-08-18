import { DatePicker } from "@workspace/ui/components/datepicker";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/textfield";
import { Select } from "@workspace/ui/components/select";
import { Textarea } from "@workspace/ui/components/textarea";
import { useFormContext } from "react-hook-form";
import { FormInputs, languages } from "./utils";
import { Switch } from "@workspace/ui/components/switch";
import { MultiSelect } from "@workspace/ui/components/multi-select";

export function Profile() {
  const form = useFormContext<FormInputs>();

  return (
    <div className="space-y-4 py-6">
      <Header />
      <MultiSelect />
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Email" disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onChange={(v) => {
                  field.onChange(v);
                }}
                options={[
                  { label: "Male", value: "male" },
                  { label: "Female", value: "female" },
                  { label: "Other", value: "other" },
                ]}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        control={form.control}
        name="languages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Languages</FormLabel>
            <FormControl>
              <Select
                isMulti
                onChange={v => {
                  console.log(v)
                }}
                options={languages}
                placeholder="Select languages"
                renderOption={(option) => (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{option.flag}</span>
                    <div>
                      <div>{option.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {option.value}
                      </div>
                    </div>
                  </div>
                )}
                renderMultiValueLabel={(option) => (
                  <div className="flex items-center gap-2">
                    {option.flag} {option.label}
                  </div>
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Brief description for your profile
            </FormDescription>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="birthday"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Birthday</FormLabel>
            <FormControl>
              <DatePicker {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}

function Header() {
  const form = useFormContext<FormInputs>();
  return (
    <div className="flex justify-between items-center">
      <h2 className="uppercase text-neutral-500 text-sm font-semibold">Profile</h2>
      <FormField
        control={form.control}
        name="isPublic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Public</FormLabel>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}
