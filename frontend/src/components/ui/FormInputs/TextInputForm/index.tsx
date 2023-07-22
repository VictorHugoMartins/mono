import React from "react";
import { TextInput } from "../../Inputs";
import { TextInputProps } from "../../Inputs/TextInput/textInput.interface";
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";

interface TextInputFormInterface extends TextInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  description?: string;
  step?: number;
  onValueChange?: (value: string) => void;
}

const TextInputForm: React.FC<TextInputFormInterface> = ({
  name,
  label,
  required,
  disabled,
  description,
  onValueChange,
  ...rest
}) => {
  const { errors, control } = useHookFormContext();

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} description={description} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <TextInput
            value={props.field.value}
            disabled={disabled}
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

export default TextInputForm;
