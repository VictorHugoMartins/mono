import React from 'react';
import { Controller, useHookFormContext } from '../../Form/HookForm/HookForm';
import Label from '../../Inputs/Label/Label';
import MultiDoubleTextInput, { MultiTextInputPropsDouble, Params } from '../../Inputs/MultiDoubleTextInput';

// import { Container } from './styles';
import InputErrorMessage from "../InputErrorMessage";
interface MultiTextInputFormInterface extends MultiTextInputPropsDouble {
    name: string;
    label?: string;
    disabled?: boolean;
    onValueChange?: (value: Params[]) => void;
}
const MultiDoubleTextInputForm: React.FC<MultiTextInputFormInterface> = ({
    name,
    label,
    required,
    disabled,
    onValueChange,
    ...rest
}) => {
    const { register, errors, control } = useHookFormContext();
    return (
        <>
            {label && <Label labelFor={name} text={label} required={required} />}
            <Controller
                name={name}
                control={control}
                render={(props) => (
                    <MultiDoubleTextInput
                        value={props.field.value}
                        onChange={(value) => {
                            props.field.onChange(value);
                            if (onValueChange) onValueChange(value);
                        }}
                        error={!!errors[name]}
                        {...rest}
                    />
                )}
            />
            <InputErrorMessage message={errors[name]?.message} />
        </>
    );
}

export default MultiDoubleTextInputForm;