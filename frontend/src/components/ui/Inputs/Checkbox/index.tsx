import React from "react";
import useTheme from "~/hooks/useTheme";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import { Grid } from "../../Layout/Grid";

import style from "./checkbox.module.scss";

export interface CheckboxProps {
  checked?: boolean;
  className?: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  id: string;
  key?: React.Key;
  label?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  title?: string;
  value?: string | number | readonly string[];
  readOnly?: boolean;
  required?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...rest }, ref) => {
    const { theme } = useTheme();

    return (
      <div className={ClassJoin([style[`theme${theme}`], style.checkbox])}>
        <input
          className={style.checkboxinput}
          ref={ref}
          id={id}
          type="checkbox"
          {...rest}
        />
        <label htmlFor={id} tabIndex={1}>
          {label}
        </label>
      </div>
    );
  }
);

export interface CheckboxGroupProps {
  children: React.ReactNode;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ children }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return <Grid>{React.cloneElement(child, {})}</Grid>;
    }
    return child;
  });

  return (
    <Grid container spacing={"p"}>
      {childrenWithProps}
    </Grid>
  );
};

export default Checkbox;
