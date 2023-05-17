import React from 'react';
import * as ReactInputMask from 'react-input-mask';

import style from './inputMask.module.scss';
import { InputMaskProps } from './inputMask.interface';
import TextInput from '../TextInput';

const InputMask = React.forwardRef<HTMLInputElement, InputMaskProps>(({ mask, error, value, ...rest }, ref) => {

  function _switchMask(): string {
    switch (mask) {
      case "rg":
        return "99.999.999";
      case "card":
        return "9999 9999 9999 9999";
      case "cep":
        return "99999-999";
      case "cpf":
        return "999.999.999-99";
      case "cnpj":
        return "99.999.999/9999-99";
      case "cpf-cnpj":
        return handleCpfCnpjMask(value as string);
      case "phone":
        return handlePhoneMask(value as string);
    }
  }

  function handleCpfCnpjMask(cpfCnpj?: string) {
    if (!cpfCnpj) return "9999999999999";

    let cpfCnpjNumber = cpfCnpj.replace(/[^A-Z0-9]+/ig, "");

    if (cpfCnpjNumber.length < 12) return "999.999.999-999";
    else return "99.999.999/9999-99";
  }

  function handlePhoneMask(phone?: string) {
    if (!phone) return "(99) 9999-9999";

    let phoneNumber = phone.replace(/[^A-Z0-9]+/ig, "");

    if (phoneNumber.length < 11) return "(99) 9999-99999";
    else return "(99) 99999-9999";
  }

  return (
    <ReactInputMask
      mask={_switchMask()} value={value}
      maskChar="" alwaysShowMask={false} {...rest} ref={ref}
    >
      {(inputProps) => <TextInput {...inputProps} type="text" error={error} />}
    </ReactInputMask>
  )
});

export default InputMask;