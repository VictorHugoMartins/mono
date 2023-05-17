import React from "react";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

export interface SelectOptionsProps {
  options?: SelectOptionsType;
}

const SelectOptions: React.FC<SelectOptionsProps> = ({ options }) => {
  return (
    <>
      {options?.map((option, index) => (
        <option key={`option-${index}-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </>
  );
};

export default SelectOptions;
