import React from "react";

import Label from "../../Inputs/Label/Label";
import IconInput, { IconInputProps } from "../../Inputs/IconInput";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";

interface IconInputFormInterface extends IconInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
  required?: boolean;
}

const IconInputForm: React.FC<IconInputFormInterface> = ({
  name,
  label,
  disabled,
  onValueChange,
  required,
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
          <IconInput
            value={props.field.value}
            disabled={disabled}
            onChange={(targetValue) => {
              props.field.onChange(targetValue);
              if (onValueChange) onValueChange(targetValue);
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

export default IconInputForm;
