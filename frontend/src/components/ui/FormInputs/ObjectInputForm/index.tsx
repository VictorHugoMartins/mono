import React, { useEffect } from "react";
import { GenericObjectType } from "~/types/global/GenericObjectType";
import { InputRenderType } from "~/types/global/InputRenderType";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import Label from "../../Inputs/Label/Label";

import ObjectInput, { ObjectInputProps } from "../../Inputs/ObjectInput";
import InputErrorMessage from "../InputErrorMessage";

interface ObjectInputFormInterface extends ObjectInputProps {
  name: string;
  label?: string;
  disabled?: boolean;
  onValueChange?: (value: GenericObjectType[]) => void;
}

const ObjectInputForm: React.FC<ObjectInputFormInterface> = ({
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
          <ObjectInput
            label={label}
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

export default ObjectInputForm;
