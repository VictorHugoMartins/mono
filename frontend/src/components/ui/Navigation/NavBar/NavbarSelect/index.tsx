import React, { useEffect, useState } from "react";
import { SelectOptionsType } from "~/types/global/SelectObjectType";

import styles from "./navbarSelect.module.scss";

interface NavbarSelectProps {
  initialValue?: string | number;
  options?: SelectOptionsType;
  onChange: (value: string | number) => Promise<boolean>;
}

const NavbarSelect: React.FC<NavbarSelectProps> = ({
  initialValue,
  onChange,
  options,
}) => {
  const [value, setValue] = useState<string | number>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  async function _onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    let changevalue = e.target.value;
    let response = await onChange(changevalue);
    if (response) setValue(changevalue);
  }

  return (
    <select
      className={`${styles.navbarSelect} ${styles[`theme${'light'}`]}`}
      value={value}
      onChange={_onChange}
    >
      <option value="" disabled={!!value}>
        Selecionar gerência
      </option>
      {options?.map((item, index) => {
        return (
          <option key={`navbarSelect-${index}`} value={item.value}>
            {item.label}
          </option>
        );
      })}
    </select>
  );
};

export default NavbarSelect;
