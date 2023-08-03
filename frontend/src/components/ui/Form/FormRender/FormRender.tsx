import React, { useEffect, useLayoutEffect, useState } from "react";
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
import MultiDoubleTextInputForm from "../../FormInputs/MultiDoubleTextInputForm";
import { insertNewElementsAtIndex, removeClusterParameterInput, removeClusterParameters } from "~/utils/DetailsFunctions/detailsFunctions";

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
  const [_advancedInputs, setAdvancedInputs] = useState<InputRenderType[]>();

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

  function addInputs(clusterMethod: string, clusterParameters: string, action?: number) {
    console.log("os parametros: ", clusterMethod, clusterParameters)
    if (action >= 1) {
      // action 1 -> mudou o metodo
      // action 2 -> n quer personalizar
      setAdvancedInputs([]);
      let x = _inputs;
      if ((clusterMethod !== "none")) x = removeClusterParameters(x);
      if (action === 2 || (clusterMethod === "none")) x = removeClusterParameters(x);
      if (action === 1 && clusterMethod === "none") x = removeClusterParameterInput(x);
      setAdvancedInputs(x);
      return
    }

    if (clusterMethod !== "none" && _inputs[2].name !== "cluster_parameters") { // n tem cluster parameters, adiciona
      console.log("no um", _inputs[2].name);
      // setAdvancedInputs(removeClusterParameters(_inputs));
      const newInputs = insertNewElementsAtIndex(_inputs, [
        {
          "name": "cluster_parameters",
          "label": "Personalizar parâmetros de clusterização",
          "disabled": false,
          "required": false,
          "type": "radio",
          "options":
            [
              { "label": "Sim", "value": "sim" },
              { "label": "Não", "value": "nao" }
            ]
        }] as InputRenderType[], 2);
      setAdvancedInputs([]);
      setAdvancedInputs(newInputs);
    } else {
      console.log("n entrei no if: ", clusterMethod, _inputs[2].name)
    }

    if (clusterMethod === "birch" && (clusterParameters === "sim")) {
      let newInputs = removeClusterParameters(_inputs);
      newInputs = insertNewElementsAtIndex(_inputs, [
        {
          "name": "n_clusters",
          "label": "Quantidade de grupos:",
          "disabled": false,
          "required": true,
          "type": "number",
          "description": "Quantidade de grupos a serem formados",
          "min": 1,
          "max": 5,
        },
        {
          "name": "threshold",
          "label": "Distância máxima entre grupos:",
          "disabled": false,
          "required": true,
          "type": "decimal-number",
          "description": "Distância limite entre os grupos gerados",
          "min": 0,
          "max": 1,
        },
        {
          "name": "branching_factor",
          "label": "Tamanho máximo do grupo:",
          "disabled": false,
          "required": true,
          "type": "number",
          "description": "Quantidade máxima de subgrupos em cada grupo",
        }
      ], 3);

      setAdvancedInputs([]);
      setAdvancedInputs(newInputs)
    } else if (clusterMethod === "kmodes" && (clusterParameters === "sim")) {
      // setAdvancedInputs(removeClusterParameters(_inputs));
      let newInputs = removeClusterParameters(_inputs);
      newInputs = insertNewElementsAtIndex(_inputs, [
        {
          "name": "n_clusters",
          "label": "Quantidade de grupos:",
          "disabled": false,
          "required": true,
          "type": "number",
          "description": "Quantidade de grupos a serem formados",
          "min": 1,
          "max": 5,
        },
        {
          "name": "init",
          "label": "Método de inicialização:",
          "disabled": false,
          "required": true,
          "type": "radio",
          "options": [
            { "label": "Huang", "value": "Huang" },
            { "label": "Cao", "value": "Cao" },
            { "label": "Aleatório", "value": "random" },
          ],
          "description": ""
        },
        {
          "name": "n_init",
          "label": "Quantidade de tentativas:",
          "disabled": false,
          "required": true,
          "type": "number",
          "description": "",
          "min": 1,
          "max": 4,
        }
      ], 3)
      setAdvancedInputs([]);
      setAdvancedInputs(newInputs)
    } else if (clusterMethod === "dbscan" && (clusterParameters === "sim")) {
      // setAdvancedInputs(removeClusterParameters(_inputs));
      let newInputs = removeClusterParameters(_inputs);
      newInputs = insertNewElementsAtIndex(_inputs, [
        {
          "name": "eps",
          "label": "Quantidade de épocas:",
          "disabled": false,
          "required": true,
          "type": "decimal-number",
          "description": "A distância máxima entre duas amostras para que uma seja considerada vizinha da outra. Não representa um limite máximo nas distâncias dos pontos dentro de um cluster. Este é o parâmetro mais importante para o DBSCAN."
        },
        {
          "name": "min_samples",
          "label": "Quantidade mínima de amostras:",
          "disabled": false,
          "required": true,
          "type": "number",
          "description": "O número de amostras (ou peso total) em uma vizinhança para que um ponto seja considerado como um ponto central. Isso inclui o ponto em si."
        }
      ], 3);
      setAdvancedInputs([]);
      setAdvancedInputs(newInputs)
    }

  }

  useEffect(() => {
    if (_advancedInputs?.length > 0) {
      console.log("setando");
      setInputs(_advancedInputs);
    }
  }, [_advancedInputs])

  const formGridSpacing = "xg";
  return (
    <>
      <PopupLoading show={_inputs.length <= 0} />
      {_inputs.length > 0 && (
        <Form
          addInputs={addInputs}
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
            description={input.description}
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
            description={input.description}
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
            description={input.description}
          />
        );
      case "decimal-number":
        return (
          <TextInputForm
            label={input.label}
            name={input.name}
            type="number"
            required={input.required}
            disabled={input.disabled}
            description={input.description}
            step={0.1}
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
            description={input.description}
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
