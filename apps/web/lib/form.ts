import { UseFormReturn } from "react-hook-form";

export const setErrors = (
  form: UseFormReturn<any>,
  error: Record<string, string>
) => {
  Object.entries(error).forEach(([key, value]) => {
    form.setError(key, { message: value });
  });
};
