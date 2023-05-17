import React from "react";

import { DateInputProps } from "../../Inputs/DateInput/dateInput.interface";
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";
import DateInput from "../../Inputs/DateInput";

interface DateInputFormInterface extends DateInputProps {
  name: string;
  label?: string;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: string) => void;
}

const DateInputForm: React.FC<DateInputFormInterface> = ({
  name,
  label,
  required,
  disabled,
  step,
  onValueChange,
  type = "date",
  ...rest
}) => {
  const { errors, control } = useHookFormContext();

  function _convertDate(date: string) {
    if (date) return date.substring(0, 10);
    else return date;
  }

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <>
            <DateInput
              type={type}
              step={step}
              value={
                type === "date"
                  ? _convertDate(props.field.value)
                  : props.field.value
              }
              disabled={disabled}
              onChange={(e) => {
                props.field.onChange(e);
                if (onValueChange) onValueChange(e.target.value);
              }}
              error={!!errors[name]}
              {...rest}
            />
          </>
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default DateInputForm;
