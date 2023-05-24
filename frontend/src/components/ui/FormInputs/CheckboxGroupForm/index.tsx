import React, { useState } from "react";
import { Checkbox } from "../../Inputs";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { CheckboxGroup, CheckboxProps } from "../../Inputs/Checkbox";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";
import Label from "../../Inputs/Label/Label";

interface CheckboxGroupFormProps {
  name: string;
  options: SelectObjectType[];
  children?: React.ReactNode;
  label?: string;
  required?: boolean;
  onValueChange?: (value: string, checked: boolean) => void;
}

const CheckboxGroupForm: React.FC<CheckboxGroupFormProps> = ({
  name,
  options,
  label,
  required,
  onValueChange,
}) => {
  const { control, errors } = useHookFormContext();

  function _isChecked(value, inputValue): boolean {
    if (value && inputValue) {
      return value.includes(inputValue);
    }
    return false;
  }

  function _onChange(value, inputValue, checked): any[] {
    if (value && inputValue) {
      if (checked) {
        return [...value, inputValue];
      } else {
        let array = value;
        var index = array.indexOf(inputValue);
        if (index !== -1) {
          array.splice(index, 1);
          return array;
        }
      }
    } else if (inputValue) {
      return [inputValue];
    } else if (value) {
      return [...value];
    }
    return [];
  }

  const [itemsPerPage, setItemsPerPage] = useState(3);

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        control={control}
        name={name}
        render={(props) => (
          <CheckboxGroup>
            {/* {options?.map((item, index) => ( */}
            {options?.slice((1 - 1) * itemsPerPage, 1 * itemsPerPage)
              .map(function (item, index) {
                return (
                  <Checkbox
                    key={`${name}-${index}`}
                    id={`${name}-${index}`}
                    value={item.value}
                    label={item.label}
                    checked={_isChecked(props.field.value, item.value)}
                    onChange={(e) => {
                      props.field.onChange(
                        _onChange(props.field.value, item.value, e.target.checked)
                      );
                      if (onValueChange)
                        onValueChange(e.target.value, e.target.checked);
                    }}
                    name={name}
                  />
                )
              })}
            {options.length > 3 &&
              <p style={{ cursor: "pointer" }} onClick={() => itemsPerPage === options.length ? setItemsPerPage(3) : setItemsPerPage(options.length)}>
                {!(itemsPerPage === options.length) ?
                  "Ver mais opções" :
                  "Ocultar opções"
                }
              </p>
            }
          </CheckboxGroup>
        )}
      />

      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

interface CheckboxItemFormProps extends CheckboxProps {
  value: string | number | readonly string[];
  label: string;
}

export const CheckboxItemForm = React.forwardRef<
  HTMLInputElement,
  CheckboxItemFormProps
>(({ ...rest }, ref) => {
  return <Checkbox ref={ref} {...rest} />;
});

export default CheckboxGroupForm;
