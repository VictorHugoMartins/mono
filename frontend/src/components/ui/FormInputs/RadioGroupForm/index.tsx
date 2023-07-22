import React from "react";
import { Radio } from "../../Inputs";
import Label from "../../Inputs/Label/Label";
import { RadioProps } from "../../Inputs/Radio";
import InputErrorMessage from "../InputErrorMessage";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";

interface RadioGroupFormProps {
  name: string;
  label?: string;
  options?: SelectObjectType[];
  children?: React.ReactNode;
  required?: boolean;
  onValueChange?: (value: string) => void;
  description?: string;
}

const RadioGroupForm: React.FC<RadioGroupFormProps> = ({
  name,
  options,
  label,
  required,
  onValueChange,
  description,
}) => {
  const { control, errors } = useHookFormContext();

  function _isChecked(value, inputValue): boolean {
    if (value && inputValue) {
      return value.toString() === inputValue.toString();
    }
    return false;
  }

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} description={description} />}
      <Controller
        control={control}
        name={name}
        render={(props) => (
          <>
            {options.map((item, index) => (
              <Radio
                name={name}
                key={`${name}-${index}`}
                value={item.value}
                label={item.label}
                checked={_isChecked(props.field.value, item.value)}
                onChange={(e) => {
                  props.field.onChange(e.target.value);
                  if (onValueChange) onValueChange(e.target.value);
                }}
              />
            ))}
          </>
        )}
      />

      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

interface RadioItemFormProps extends RadioProps {
  value: string | number | readonly string[];
  label: string;
}

export const RadioItemForm = React.forwardRef<
  HTMLInputElement,
  RadioItemFormProps
>(({ ...rest }, ref) => {
  return <Radio ref={ref} {...rest} />;
});

export default RadioGroupForm;
