import React, { useEffect, useState } from "react";

//Import components
import Label from "../../Inputs/Label/Label";
import { Controller, useHookFormContext } from "../../Form/HookForm/HookForm";
import InputErrorMessage from "../InputErrorMessage";
import SearchSelect, { SearchSelectProps } from "../../Inputs/SearchSelect";

import formService from "~/services/form.service";

interface SearchSelectFormInterface extends SearchSelectProps {
  listenId?: string | string[];
  listenGet?: string;
  disabled?: boolean;
  name: string;
  label?: string;
  onValueChange?: (value: string | number) => void;
  required?: boolean;
}

const SearchSelectForm: React.FC<SearchSelectFormInterface> = ({
  name,
  label,
  onChange,
  onValueChange,
  disabled,
  listenId,
  listenGet,
  options,
  required,
  ...rest
}) => {
  const { listen, errors, control } = useHookFormContext();

  const [dynamicOptions, setDynamicOptions] = useState(null);

  useEffect(() => {
    if (listenGet && listenId) {
      if (listen) _getOptions(listen);
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

  function _buildQuery(params: string[], data): string {
    let response = "?";

    for (let i = 0; i < params.length; i++) {
      if (data[params[i]]) {
        response += `${params[i]}=${data[params[i]]}${
          i !== params.length - 1 ? "&" : ""
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
          <SearchSelect
            disabled={disabled}
            value={
              typeof props.field.value === "number"
                ? Number(props.field.value)
                : props.field.value
            }
            onChange={(e) => {
              props.field.onChange(e);
              if (onValueChange) onValueChange(e);
            }}
            error={!!errors[name]}
            options={dynamicOptions || options}
            {...rest}
          />
        )}
      />
      <InputErrorMessage message={errors[name]?.message} />
    </>
  );
};

export default SearchSelectForm;
