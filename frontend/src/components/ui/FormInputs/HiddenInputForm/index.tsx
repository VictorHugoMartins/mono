import React from 'react';
import { TextInput } from '../../Inputs';
import { TextInputProps } from '../../Inputs/TextInput/textInput.interface';
import { Controller, useHookFormContext } from '../../Form/HookForm/HookForm';

interface HiddenInputFormInterface extends TextInputProps {
  name: string,
  label?: string,
  isNumber?: boolean,
}

const HiddenInputForm: React.FC<HiddenInputFormInterface> = ({ name, label, isNumber, type, ...rest }) => {
  const { control } = useHookFormContext();

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <TextInput value={isNumber ? (Number(props.field.value) || -1) : (props.field.value || null)} onChange={props.field.onChange} type="hidden" {...rest} />
        )}
      />
    </>
  );
}

export default HiddenInputForm;