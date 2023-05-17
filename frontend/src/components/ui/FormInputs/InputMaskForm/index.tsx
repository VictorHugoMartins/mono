import React from "react";

import { InputMaskProps } from "../../Inputs/InputMask/inputMask.interface";

import Label from "../../Inputs/Label/Label";
import { InputMask } from "../../Inputs";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";

interface InputMaskFormInterface extends InputMaskProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

const InputMaskForm: React.FC<InputMaskFormInterface> = ({
  name,
  label,
  disabled,
  required,
  onValueChange,
  ...rest
}) => {
  const { errors, control } = useHookFormContext();

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <InputMask
            disabled={disabled}
            value={props.field.value}
            onChange={(e) => {
              props.field.onChange(e);
              if (onValueChange) onValueChange(e.target.value);
            }}
            error={!!errors[name]}
            {...rest}
          />
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default InputMaskForm;
