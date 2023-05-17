import React, { useEffect } from "react";

import style from "./select.module.scss";

//Import types
import { SelectObjectType } from "~/types/global/SelectObjectType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import SelectOptions from "./SelectOptions";

export interface SelectProps {
  className?: string;
  defaultValue?: string | number | readonly string[];
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  name?: string;
  onChange?: (value: string) => void;
  options?: SelectObjectType[];
  title?: string;
  value?: string | number | readonly string[];
  required?: boolean;
  error?: boolean;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ placeholder, onChange, options, error, value, ...rest }, ref) => {
    function _checkValue() {
      if (!!value) {
        if (
          options?.length > 0 &&
          options?.filter((e) => e.value.toString() === value.toString())
            .length <= 0
        ) {
          _handleChange(null, true);
        }
      }
    }

    function _handleChange(
      event: React.ChangeEvent<HTMLSelectElement>,
      reset?: boolean
    ) {
      if (reset) {
        onChange("");
      } else {
        onChange(event.target.value);
      }
    }

    useEffect(() => {
      _checkValue();
    }, [options]);

    return (
      <select
        className={ClassJoin([style.select, error && style.error])}
        ref={ref}
        value={value}
        onChange={_handleChange}
        {...rest}
      >
        <option value="" disabled={!!value}>
          {placeholder || "Selecione uma opção"}
        </option>
        <SelectOptions options={options} />
      </select>
    );
  }
);

export default Select;
