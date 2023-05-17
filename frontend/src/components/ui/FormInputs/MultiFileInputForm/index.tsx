import React from "react";
import { FileObjectType } from "~/types/global/FileObjectType";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import Label from "../../Inputs/Label/Label";
import MultiFileInput, {
  MultiFileInputProps,
} from "../../Inputs/MultiFileInput";

import InputErrorMessage from "../InputErrorMessage";

interface MultiFileInputFormInterface extends MultiFileInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: FileObjectType[]) => void;
  required?: boolean;
}

const MultiFileInputForm: React.FC<MultiFileInputFormInterface> = ({
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
          <MultiFileInput
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

export default MultiFileInputForm;
