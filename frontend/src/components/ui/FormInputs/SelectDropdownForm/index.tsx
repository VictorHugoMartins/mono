import React, { useEffect, useState } from "react";

//Import components
import SelectDropdown, {
  SelectDropdownProps,
} from "../../Inputs/SelectDropdown";
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";
import formService from "~/services/form.service";

interface SelectDropdownFormInterface extends SelectDropdownProps {
  listenId?: string | string[];
  listenGet?: string;
  listenGetWithBody?: string;
  disabled?: boolean;
  name: string;
  label?: string;
  onValueChange?: (value: string[]) => void;
}

const SelectDropdownForm: React.FC<SelectDropdownFormInterface> = ({
  name,
  label,
  onChange,
  onValueChange,
  disabled,
  listenId,
  listenGet,
  listenGetWithBody,
  required,
  options,
  ...rest
}) => {
  const { listen, errors, control } = useHookFormContext();

  const [dynamicOptions, setDynamicOptions] = useState(null);

  useEffect(() => {
    if (listenGet && listenId) {
      if (listen) _getOptions(listen);
    } else if (listenGetWithBody && listenId) {
      if (listen) _getOptionsWithBody(listen);
    }
  }, [listen]);

  async function _getOptions(data) {
    let response = null;

    if (Array.isArray(listenId)) {
      let query = _buildQuery(listenId, data);
      if (query) {
        response = await formService.getSelectOptions(`${listenGet}${query}`);
      }
    } else if (data[listenId]) {
      response = await formService.getSelectOptions(
        `${listenGet}${data[listenId]}`
      );
    }

    setDynamicOptions(response);
  }

  async function _getOptionsWithBody(data) {
    let response = null;

    if (Array.isArray(listenId)) {
      let query = _buildQuery(listenId, data);
      if (query) {
        response = await formService.getSelectOptions(`${listenGet}${query}`);
      }
    } else if (data[listenId]) {
      response = await formService.getSelectOptionsWithBody(
        `${listenGetWithBody}`, listenGetWithBody?.includes('GetAllBySelect') ? { projects: data[listenId] } : { managements: Array.isArray(data[listenId]) ? data[listenId] : [data[listenId]] }
      );
      if (response.success) response = response.object;
    }

    setDynamicOptions(response);
  }

  function _buildQuery(params: string[], data): string {
    let response = "?";

    for (let i = 0; i < params.length; i++) {
      if (data[params[i]]) {
        response += `${params[i]}=${data[params[i]]}${i !== params.length - 1 ? "&" : ""
          }`;
      } else return "";
    }

    return response;
  }

  return (
    <>
      {label && <Label labelFor={name} text={label} required={required} />}
      <Controller
        name={name}
        control={control}
        render={(props) => (
          <SelectDropdown
            name={name}
            disabled={disabled}
            value={props.field.value}
            error={!!errors[name]}
            options={dynamicOptions || options}
            onChange={(e) => {
              props.field.onChange(e);
              if (onValueChange) onValueChange(e);
            }}
            {...rest}
          />
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default SelectDropdownForm;
