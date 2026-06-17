import { forwardRef, type InputHTMLAttributes } from "react";
import { Input } from "./Input";

export interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ label, error, ...props }, ref) => (
    <Input ref={ref} type="date" label={label} error={error} {...props} />
  )
);

DatePicker.displayName = "DatePicker";
