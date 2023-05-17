import { DeltaOperation } from "quill";

export interface TextAreaFormatProps{
    className?: string,
    defaultValue?: string | number | readonly string[],
    disabled?: boolean,
    id?: string,
    key?: React.Key,
    maxLength?: number,
    minLength?: number,
    name?: string,
    onChange?: Function,
    onFocus?: React.FocusEventHandler<HTMLInputElement>,
    placeholder?: string,
    title?: string
    value?: string,
    readOnly?: boolean,
    required?: boolean,
    error?: boolean,
}