export interface InputMaskProps {
  className?: string,
  defaultValue?: string | number | readonly string[],
  disabled?: boolean,
  id?: string,
  key?: React.Key,
  maxLength?: number,
  mask: InputMaskType,
  minLength?: number,
  name?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  placeholder?: string,
  title?: string,
  value?: string | number | readonly string[],
  readOnly?: boolean,
  required?: boolean,
  error?: boolean,
}

export type InputMaskType = "rg" | "cep" | "cpf" | "cnpj" | "cpf-cnpj" | "phone" | "card";