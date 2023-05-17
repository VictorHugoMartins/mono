import React from "react";
import { FormRenderInputProps } from "./renderInput.interface";

//Import components
import { TextInputType } from "../../Inputs/TextInput/textInput.interface";
import { Grid } from "../../Layout/Grid";
import { InputMaskType } from "../../Inputs/InputMask/inputMask.interface";
import {
  Checkbox,
  InputMask,
  TextArea,
  TextAreaFormat,
  TextInput,
} from "../../Inputs";
import DateInput from "../../Inputs/DateInput";
import FileInput from "../../Inputs/FileInput/FileInput";
import Select from "../../Inputs/Select";
import MultiTextInput from "../../Inputs/MultiTextInput";
import ObjectInput from "../../Inputs/ObjectInput";
import Label from "../../Inputs/Label/Label";

const RenderInput: React.FC<FormRenderInputProps> = ({
  input,
  inputValue,
  onChange,
}) => {
  function handleChange(value: any) {
    onChange(value, input.name);
  }

  const SwitchInput = () => {
    switch (input.type) {
      case "textarea-format":
        return (
          <TextAreaFormat
            value={inputValue}
            name={input.name}
            disabled={input.disabled}
            required={input.required}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "textarea":
        return (
          <TextArea
            value={inputValue}
            name={input.name}
            required={input.required}
            disabled={input.disabled}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "checkbox-bool":
        return (
          <Checkbox
            value={inputValue}
            id={input.name}
            name={input.name}
            label={input.label}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "datetime-local":
        return (
          <DateInput
            value={inputValue}
            name={input.name}
            type={"datetime-local"}
            required={input.required}
            disabled={input.disabled}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "date":
      case "time":
        return (
          <DateInput
            value={inputValue}
            name={input.name}
            type={input.type}
            required={input.required}
            disabled={input.disabled}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "image":
        return (
          <FileInput
            value={inputValue}
            name={input.name}
            type={"image"}
            crop
            onChange={(file) => handleChange(file)}
          />
        );
      case "file":
        return (
          <FileInput
            value={inputValue}
            name={input.name}
            type={"file"}
            onChange={(file) => handleChange(file)}
          />
        );
      case "select":
        return (
          <Select
            value={inputValue}
            name={input.name}
            options={input.options}
            required={input.required}
            onChange={(e) => handleChange(e)}
          />
        );
      case "number":
        return (
          <TextInput
            value={inputValue}
            name={input.name}
            type="number"
            required={input.required}
            disabled={input.disabled}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "phone":
      case "cpf":
      case "cnpj":
      case "cpf-cnpj":
        return (
          <InputMask
            value={inputValue}
            mask={input.type as InputMaskType}
            name={input.name}
            required={input.required}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
      case "text-list":
        return (
          <MultiTextInput
            value={inputValue}
            name={input.name}
            required={input.required}
            onChange={(value) => handleChange(value)}
          />
        );
      case "object-list":
        return (
          <ObjectInput
            value={inputValue}
            name={input.name}
            label={input.label}
            required={input.required}
            shapeFields={input.shapeFields}
            onChange={(value) => handleChange(value)}
          />
        );
      default:
        return (
          <TextInput
            value={inputValue}
            name={input.name}
            type={input.type as TextInputType}
            required={input.required}
            disabled={input.disabled}
            onChange={(e) => handleChange(e.target.value)}
          />
        );
    }
  };

  return (
    <Grid>
      {input.label && <Label labelFor={input.name} text={input.label} />}
      <SwitchInput />
    </Grid>
  );
};

export default RenderInput;
