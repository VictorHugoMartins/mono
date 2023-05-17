import React from 'react';

import style from './radio.module.scss'

export interface RadioProps {
  checked?: boolean,
  className?: string,
  defaultChecked?: boolean,
  disabled?: boolean,
  id?: string,
  key?: React.Key,
  label?: string,
  name?: string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>,
  onFocus?: React.FocusEventHandler<HTMLInputElement>,
  title?: string,
  value?: string | number | readonly string[],
  readOnly?: boolean,
  required?: boolean,
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(({ label, ...rest }, ref) => {
  return (
    <label className={style.radio}>
      <input ref={ref} type="radio" {...rest} />
      {label}
      <span className={style.checkmark}></span>
    </label>
  );
});

export default Radio;