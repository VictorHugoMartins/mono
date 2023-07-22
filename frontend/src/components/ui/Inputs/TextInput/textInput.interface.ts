export interface TextInputProps {
  className?: string,
  defaultValue?: string | number | readonly string[],
  disabled?: boolean,
  id?: string,
  key?: React.Key,
  maxLength?: number,
  minLength?: number,
  min?: number,
  max?: number,
  name?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  placeholder?: string,
  title?: string,
  type?: TextInputType,
  value?: string | number | readonly string[],
  readOnly?: boolean,
  required?: boolean,
  error?: boolean,
}

export type TextInputType = "text" | "email" | "number" | "password" | "hidden" | "search" | "decimal-number";