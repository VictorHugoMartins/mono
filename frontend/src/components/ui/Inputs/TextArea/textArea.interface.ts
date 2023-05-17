import React, { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
    className?: string;
    defaultvalue?: string|number | readonly string[];
    disabled?: boolean;
    id?: string;
    key?: React.Key;
    maxLength?: number;
    minLength?: number;
    name?: string;
    onChange?:React.ChangeEventHandler<HTMLTextAreaElement>;
    onFocus?:React.FocusEventHandler<HTMLTextAreaElement>;
    placeholder?: string;
    title?: string;
    type?:TextAreaTypes;
    value?: string | number | readonly string[];
    readOnly?: boolean;
    required?: boolean;
    error?: boolean;
}

export type TextAreaTypes = "textrea" | "textarea-format";