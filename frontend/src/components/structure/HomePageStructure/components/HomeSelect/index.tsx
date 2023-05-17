import React, { useState } from "react";

import SelectOptions from "~/components/ui/Inputs/Select/SelectOptions";

import style from "./homeSelect.module.scss";

import { SelectOptionsType } from "~/types/global/SelectObjectType";

interface HomeSelectProps {
  label?: string;
  options?: SelectOptionsType;
  onChange?: (id: string) => void;
}

const HomeSelect: React.FC<HomeSelectProps> = ({
  label,
  options,
  onChange,
}) => {
  const [value, setValue] = useState<string>();
  const [_options, setOptions] = useState<SelectOptionsType>(options || []);

  if (_options.length <= 0) return <></>;
  return (
    <select
      className={style.select}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (onChange) onChange(e.target.value);
      }}
    >
      <option disabled>{label}</option>
      <SelectOptions options={_options} />
    </select>
  );
};

export default HomeSelect;
