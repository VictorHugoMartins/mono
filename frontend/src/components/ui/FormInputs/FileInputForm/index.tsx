import React from "react";
import { FileInputProps } from "../../Inputs/FileInput/fileInput.interface";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import FileInput from "../../Inputs/FileInput/FileInput";
import Label from "../../Inputs/Label/Label";
import InputErrorMessage from "../InputErrorMessage";

interface FileInputFormInterface extends FileInputProps {
  name: string;
  label?: string;
}

const FileInputForm: React.FC<FileInputFormInterface> = ({
  name,
  label,
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
          <FileInput
            value={props.field.value}
            required={required}
            onChange={(e) => {
              props.field.onChange(e);
            }}
            {...rest}
          />
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default FileInputForm;
