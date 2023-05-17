import React from "react";
import { TextAreaFormat } from "../../Inputs";
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";
import { TextAreaFormatProps } from "../../Inputs/TextAreaFormat/textAreaFormat.interface";

interface TextInputFormInterface extends TextAreaFormatProps {
  name: string;
  label: string;
  disabled: boolean;
  onValueChange?: (value: string) => void;
}

const TextAreaFormatForm: React.FC<TextInputFormInterface> = ({
  name,
  disabled,
  label,
  onValueChange,
  required,
  ...rest
}) => {
  const { control, errors } = useHookFormContext();
  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <>
            <TextAreaFormat
              value={props.field?.value ?? ""}
              disabled={disabled}
              error={!!errors[name]}
              {...rest}
              onChange={(e) => {
                props.field.onChange(e);
                if (onValueChange) {
                  onValueChange(e.target.value);
                }
              }}
            />
          </>
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};
export default TextAreaFormatForm;
