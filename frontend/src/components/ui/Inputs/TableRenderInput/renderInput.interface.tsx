import { InputRenderType } from "~/types/global/InputRenderType";

export interface FormRenderInputProps {
  input: InputRenderType;
  inputValue: any;
  onChange: (value: any, name: string) => void;
}
