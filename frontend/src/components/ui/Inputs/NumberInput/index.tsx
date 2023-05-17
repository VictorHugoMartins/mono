import React from 'react';

import style from './numberInput.module.scss';
import { NumberInputProps } from './numberInput.interface';


import ClassJoin from '~/utils/ClassJoin/ClassJoin';


const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(({ error, ...rest }, ref) => {
  return (
    <input
      className={ClassJoin([style.numberInput, error && style.error])}
      type="number" ref={ref} {...rest}
    />
  )
});

export default NumberInput;