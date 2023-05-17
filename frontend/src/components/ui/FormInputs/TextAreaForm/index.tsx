import React from "react";
import { TextArea } from "../../Inputs";
import {
  TextAreaProps,
  TextAreaTypes,
} from "../../Inputs/TextArea/textArea.interface";
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";

interface TextAreaFormInterface extends TextAreaProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

const TextAreaForm: React.FC<TextAreaFormInterface> = ({
  name,
  label,
  required,
  disabled,
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
          <TextArea
            value={props.field.value}
            disabled={disabled}
            required={required}
            error={!!errors[name]}
            maxLength={rest.maxLength}
            minLength={rest.minLength}
            name={name}
            onChange={(e) => {
              props.field.onChange(e);
              if (onValueChange) {
                onValueChange(e.target.value);
              }
            }}
          />
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};
export default TextAreaForm;
