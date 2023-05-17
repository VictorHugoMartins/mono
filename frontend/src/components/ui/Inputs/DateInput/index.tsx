import React from "react";

import style from "./dateInput.module.scss";
import { DateInputProps } from "./dateInput.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ type, error, ...rest }, ref) => {
    return (
      <input
        className={ClassJoin([style.dateInput, error && style.error])}
        type={type || "date"}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default DateInput;
