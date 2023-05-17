export interface DateInputProps {
  className?: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  id?: string;
  key?: React.Key;
  max?: string | number;
  min?: string | number;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  step?: string | number;
  title?: string;
  type?: DateInputType;
  value?: string | number | readonly string[];
  readOnly?: boolean;
  required?: boolean;
  error?: boolean;
}

export type DateInputType = "date" | "time" | "datetime-local";
