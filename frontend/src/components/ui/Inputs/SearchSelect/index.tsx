import React, { useEffect, useState } from "react";

import style from "./searchSelect.module.scss";

import {
  SelectObjectType,
  SelectOptionsType,
} from "~/types/global/SelectObjectType";

import Icon from "../../Icon/Icon";
import useTheme from "~/hooks/useTheme";

export interface SearchSelectProps {
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  name?: string;
  onChange?: (value: string | number) => void;
  options?: SelectOptionsType;
  value?: string | number;
  error?: boolean;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  disabled,
  error,
  id,
  name,
  placeholder,
  onChange,
  options,
  value,
}) => {
  const { theme } = useTheme();

  const [internalValue, setInternalValue] = useState<SelectObjectType>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (options && value) {
      let getValue = options.find((x) => x.value.toString() === value);
      if (getValue) _handleInternalValue(getValue);
    }
  }, [options, value]);

  function _handleInternalValue(valueSelected: SelectObjectType) {
    setInputValue(valueSelected.label);
    setInternalValue(valueSelected);
    if (onChange) onChange(valueSelected.value);
  }

  return (
    <div className={`${style.searchSelect} ${style[`theme${theme}`]}`}>
      <div className={style.searchSelectInputContainer}>
        <input
          className={style.searchSelectInput}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder || "Selecione uma opção"}
          onFocus={(e) => {
            setOptionsVisible(true);
          }}
          onBlur={(e) => {
            setTimeout(() => setOptionsVisible(false), 200);
          }}
        />
        <div className={style.searchSelectInputIcon} onClick={() => setOptionsVisible(!optionsVisible)}>
          <Icon type="FaAngleDown" />
        </div>
      </div>
      {optionsVisible && (
        <ul className={style.searchSelectOptions}>
          {options
            ?.filter((option) => {
              return option.label
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(
                  inputValue
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                );
            })
            .map((item, index) => (
              <li
                key={`searchselect-item-${name}-${index}`}
                className={style.searchSelectOptionItem}
                onClick={() => _handleInternalValue(item)}
              >
                {item.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSelect;
// const [_value, setValue] = useState<SelectObjectType>(null);

// useEffect(() => {
//   if (options && value) {
//     let getValue = options.find((x) => x.value === value);
//     if (getValue) setValue(getValue);
//   }
// }, [options, value]);
// <Select
//   className={ClassJoin([style.searchSelect, error && style.error])}
//   id={id}
//   name={name}
//   isDisabled={disabled}
//   placeholder={placeholder || "Selecione uma opção"}
//   options={options}
//   styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
//   menuPortalTarget={document.body}
//   value={_value}
//   onChange={(e) => {
//     if (onChange) onChange(e.value);
//   }}
// />
