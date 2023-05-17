import React, { useEffect, useState } from "react";

import style from "./iconInput.module.scss";
import iconTypes from "./iconTypes.json";

import Icon from "../../Icon/Icon";
import { IconTypes } from "../../Icon/icon.interface";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

export interface IconInputProps {
  disabled?: boolean;
  id?: string;
  placeholder?: string;
  name?: string;
  onChange?: (value: string) => void;
  value?: string;
  error?: boolean;
}

const IconInput: React.FC<IconInputProps> = ({
  disabled,
  error,
  id,
  name,
  placeholder,
  onChange,
  value,
}) => {
  const [internalValue, setInternalValue] = useState<IconTypes>();
  const [inputValue, setInputValue] = useState<string>("");
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  const _internalOptions = iconTypes;

  useEffect(() => {
    if (value) {
      _handleInternalValue(value);
    }
  }, [value]);

  useEffect(()=>{
    if(inputValue.length===0){
      setInternalValue(undefined);
    }
  },[inputValue]);

  function _handleInternalValue(valueSelected: string) {
    setInputValue(valueSelected);
    setInternalValue(valueSelected as IconTypes);
    if (onChange) onChange(valueSelected);
  }

  return (
    <div className={style.iconInput}>
      <div className={style.iconTextInputContainer}>
        <div className={style.iconTextInputIcon}>
          <Icon type={internalValue || "FaSmileBeam"} />
        </div>
        <input
          className={ClassJoin([style.iconTextInput, error && style.error])}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={disabled}
          placeholder={
            placeholder || "Digite o nome do icone  ex.: 'FaSmileBeam'"
          }
          onFocus={(e) => {
            setOptionsVisible(true);
          }}
          onBlur={(e) => {
            setTimeout(() => setOptionsVisible(false), 200);
          }}
        />
      </div>
      {optionsVisible && (
        <ul className={style.iconInputOptions}>
          {_internalOptions
            ?.filter((item) => {
              return item
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
            .map((item: IconTypes, index) => (
              <li
                key={`iconInput-item-${name}-${index}`}
                className={style.iconInputOptionItem}
                onClick={() => _handleInternalValue(item)}
              >
                <Icon type={item} />
                <p>{item}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default IconInput;
