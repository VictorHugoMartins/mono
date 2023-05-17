import React from "react";
import Checkbox from "../../Inputs/Checkbox";
import { useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";

interface CheckboxFormProps {
  name: string;
  value?: string | number | readonly string[];
  children?: React.ReactNode;
  required?: boolean;
  label?: string;
  onValueChange?: (value: string, checked: boolean) => void;
}

const CheckboxForm: React.FC<CheckboxFormProps> = ({
  name,
  value,
  label,
  onValueChange,
  ...rest
}) => {
  const { register, errors } = useHookFormContext();

  return (
    <>
      <Checkbox
        {...register(name)}
        id={name}
        value={value}
        label={label}
        onChange={(e) => {
          if (onValueChange) onValueChange(e.target.value, e.target.checked);
        }}
        {...rest}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default CheckboxForm;
