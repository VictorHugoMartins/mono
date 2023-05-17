import React, { useLayoutEffect, useState } from "react";
import { FormRenderProps, FormRenderInputProps } from "./formRender.interface";

//Import components
import CheckboxGroupForm from "../../FormInputs/CheckboxGroupForm";
import RadioGroupForm from "../../FormInputs/RadioGroupForm";
import SelectForm from "../../FormInputs/SelectForm";
import TextInputForm from "../../FormInputs/TextInputForm";
import { TextInputType } from "../../Inputs/TextInput/textInput.interface";
import { Grid } from "../../Layout/Grid";
import InputMaskForm from "../../FormInputs/InputMaskForm";
import { InputMaskType } from "../../Inputs/InputMask/inputMask.interface";
import PopupLoading from "../../Loading/PopupLoading/PopupLoading";
import HiddenInputForm from "../../FormInputs/HiddenInputForm";
import FileInputForm from "../../FormInputs/FileInputForm";
import DateInputForm from "../../FormInputs/DateInputForm";
import CheckboxForm from "../../FormInputs/CheckboxForm";
import TextAreaForm from "../../FormInputs/TextAreaForm";
import MultiTextInputForm from "../../FormInputs/MultiTextInputForm";
import ObjectInputForm from "../../FormInputs/ObjectInputForm";
import IconInputForm from "../../FormInputs/IconInputForm";
import MultiFileInputForm from "../../FormInputs/MultiFileInputForm";
import SelectDropdownForm from "../../FormInputs/SelectDropdownForm";

//form
import TextAreaFormatForm from "../../FormInputs/TextAreaFormatForm";
import Form from "../Form";
import ErrorForm from "../ErrorForm";

//Import services
import formService from "~/services/form.service";

//Import types
import { InputRenderType } from "~/types/global/InputRenderType";
import { GapPatternObjectType } from "../../Layout/Grid/grid.interface";
import MultiDoubleTextInputForm from "../../FormInputs/MultiDoubleTextInputForm";

const FormRender: React.FC<FormRenderProps> = ({
  children,
  inputs = [],
  buildPath,
  buildObject,
  submitPath,
  preparePath,
  onSuccess,
  onFailure,
  initialData,
  externalInitalData,
  setObjectReturn,
  isMessageApi
}) => {
  const [_inputs, setInputs] = useState<InputRenderType[]>(inputs);

  useLayoutEffect(() => {
    if (buildPath) _buildForm();
  }, []);

  async function _buildForm() {
    if (buildObject) setInputs(buildObject);
    else {
      let response = await formService.build(buildPath);

      setInputs(response);
    }
  }

  const formGridSpacing = "xg";
  // console.log(initialData, 'valor da data Inicial')
  return (
    <>
      <PopupLoading show={_inputs.length <= 0} />
      {_inputs.length > 0 && (
        <Form
          setObjectReturn={setObjectReturn}
          externalInitalData={externalInitalData}
          postUrl={submitPath}
          getUrl={preparePath}
          onSuccess={onSuccess}
          isMessageApi={isMessageApi}
          onFailure={onFailure}
          initialData={initialData}
          validation={_inputs.map((item) => {
            return {
              label: item.label,
              name: item.name,
              required: item.required,
              type: item.type,
              min: item.min ?? null,
              max: item.max ?? null,
            };
          })}
        >
          <Grid container spacing={formGridSpacing}>
            {_inputs.map((item, index) => (
              <FormRenderInput
                key={`input-render-${index}`}
                input={item}
                gridSize={12}
              />
            ))}
            <Grid>
              <ErrorForm />
            </Grid>
            <Grid container spacing={formGridSpacing}>
              {children}
            </Grid>
          </Grid>
        </Form>
      )}
    </>
  );
};

export const FormRenderInput: React.FC<FormRenderInputProps> = ({ input }) => {
  const SwitchInput = () => {
    switch (input.type) {
      case "textarea-format":
        return (
          <TextAreaFormatForm
            name={input.name}
            label={input.label}
            disabled={input.disabled}
            required={input.required}
          />
        );
      case "textarea":
        return (
          <TextAreaForm
            name={input.name}
            label={input.label}
            required={input.required}
            disabled={input.disabled}
          />
        );
      case "checkbox-bool":
        return <CheckboxForm name={input.name} label={input.label} />;
      case "checkbox":
        return (
          <CheckboxGroupForm
            label={input.label}
            name={input.name}
            required={input.required}
            options={input.options}
          />
        );
      case "datetime-local":
        return (
          <DateInputForm
            label={input.label}
            name={input.name}
            type={"datetime-local"}
            required={input.required}
            disabled={input.disabled}
          />
        );
      case "date":
      case "time":
        return (
          <DateInputForm
            label={input.label}
            name={input.name}
            type={input.type}
            required={input.required}
            disabled={input.disabled}
          />
        );
      case "image":
        return (
          <FileInputForm
            name={input.name}
            label={input.label}
            type={"image"}
            required={input.required}
            crop
          />
        );
      case "file":
        return (
          <FileInputForm
            name={input.name}
            label={input.label}
            type={"file"}
            required={input.required}
          />
        );
      case "file-multiple":
        return (
          <MultiFileInputForm
            name={input.name}
            label={input.label}
            required={input.required}
          />
        );
      case "icon":
        return (
          <IconInputForm
            name={input.name}
            label={input.label}
            required={input.required}
          />
        );
      case "radio":
        return (
          <RadioGroupForm
            label={input.label}
            name={input.name}
            required={input.required}
            options={input.options}
          />
        );
      case "select":
        return (
          <SelectForm
            label={input.label}
            name={input.name}
            options={input.options}
            required={input.required}
            listenId={input.listen?.id}
            listenGet={input.listen?.getUrl}
          />
        );
      case "checkbox-select":
        return (
          <SelectDropdownForm
            label={input.label}
            name={input.name}
            options={input.options}
            required={input.required}
            listenId={input.listen?.id}
            listenGet={input.listen?.getUrl}
          />
        );
      case "number":
        return (
          <TextInputForm
            label={input.label}
            name={input.name}
            type="number"
            required={input.required}
            disabled={input.disabled}
          />
        );
      case "phone":
      case "cpf":
      case "cnpj":
      case "cpf-cnpj":
        return (
          <InputMaskForm
            mask={input.type as InputMaskType}
            label={input.label}
            name={input.name}
            required={input.required}
          />
        );
      case "text-list":
        return (
          <MultiTextInputForm
            label={input.label}
            name={input.name}
            required={input.required}
            disabled={input.disabled}
          />
        );
      case "text-list-double":
        return (
          <MultiDoubleTextInputForm
            label={input.label}
            name={input.name}
            required={input.required}
            disabled={input.disabled}
          />
        )
      case "object-list":
        return (
          <ObjectInputForm
            name={input.name}
            label={input.label}
            required={input.required}
            disabled={input.disabled}
            shapeFields={input.shapeFields}
          />
        );
      default:
        return (
          <TextInputForm
            label={input.label}
            name={input.name}
            type={input.type as TextInputType}
            required={input.required}
            disabled={input.disabled}
          />
        );
    }
  };

  if (input.type === "hidden" || input.type === "hidden-number")
    return (
      <HiddenInputForm
        name={input.name}
        isNumber={input.type === "hidden-number"}
      />
    );
  return (
    <Grid>
      <SwitchInput />
    </Grid>
  );
};

export default FormRender;
