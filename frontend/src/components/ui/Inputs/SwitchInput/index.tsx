import React from 'react';

import style from './switchInput.module.scss';

export interface SwitchInputProps {
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


const SwitchInput = React.forwardRef<HTMLInputElement, SwitchInputProps>(({ label, ...rest }, ref) => {
  return (
    <label className={style.toggle}>
      <input ref={ref} type="checkbox" className={style.toggleinput} {...rest} />
      <div className={style.togglecontrol}></div>
    </label>
  );
});

export default SwitchInput;