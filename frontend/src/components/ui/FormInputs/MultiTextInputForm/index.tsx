import React from "react";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import Label from "../../Inputs/Label/Label";

import MultiTextInput, {
  MultiTextInputProps,
} from "../../Inputs/MultiTextInput";
import InputErrorMessage from "../InputErrorMessage";

interface MultiTextInputFormInterface extends MultiTextInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: string[]) => void;
}

const MultiTextInputForm: React.FC<MultiTextInputFormInterface> = ({
  name,
  label,
  required,
  disabled,
  onValueChange,
  ...rest
}) => {
  const { register, errors, control } = useHookFormContext();

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <MultiTextInput
            value={props.field.value}
            onChange={(value) => {
              props.field.onChange(value);
              if (onValueChange) onValueChange(value);
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

export default MultiTextInputForm;
