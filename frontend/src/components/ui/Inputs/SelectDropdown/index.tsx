import React, { useEffect, useState } from "react";

import style from "./select.module.scss";

//Import types
import { SelectObjectType } from "~/types/global/SelectObjectType";


export interface SelectDropdownProps {
  disabled?: boolean;
  placeholder?: string;
  name?: string;
  onChange?: (value: string[]) => void;
  options?: SelectObjectType[];
  value?: string[];
  required?: boolean;
  error?: boolean;

}

const SelectDropdown = React.forwardRef<HTMLSelectElement, SelectDropdownProps>(
  ({ name, placeholder, options, error, value, onChange }, ref) => {
    const [_values, setValues] = useState<string[]>(value || []);
    const [_labels, setLabels] = useState<string[]>([]);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
      _checkValue(value, options);
    }, [value, options]);

    function _checkValue(
      changeValue: string[],
      changeOptions: SelectObjectType[]
    ) {
      let labels = changeOptions?.reduce((results, item) => {
        if (changeValue?.includes(item.value as string))
          results.push(item.label);
        return results;
      }, []);

      setLabels(labels || []);
      setValues(changeValue || []);
    }

    function showCheckboxes() {
      if (!expanded) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    }

    function handleOnBlur(e: React.FocusEvent<HTMLDivElement, Element>) {
      if (expanded) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          showCheckboxes();
        }
      }
    }

    function handleClickInOption(changeValue: string | number, label: string) {
      if (_values.includes(`${changeValue}`)) {
        const filter: string[] = _values.filter((item) => {
          return item !== changeValue;
        });
        if (onChange) onChange(filter);
        setValues(filter);
        setLabels(
          _labels.filter((item) => {
            return item !== label;
          })
        );
      } else {
        let newArray = [];
        newArray = [..._values, changeValue];
        if (onChange) onChange(newArray);
        setValues(newArray);
        setLabels([..._labels, label]);
      }
    }

    function concatValueLabels() {
      let str = "";
      _labels.map((word, index) => {
        str += index === _labels.length - 1 ? `${word}` : `${word}, `;
      });
      return str;
    }

    return (
      <>
        <div
          className={style.multiselect}
          tabIndex={0}
          onBlur={(e) => handleOnBlur(e)}
        >
          <div className={style.selectBox} onClick={() => showCheckboxes()}>
            <select className={style.select}>
              <option>
                {_values?.length === 0
                  ? "Selecione uma opção"
                  : concatValueLabels()}
              </option>
            </select>
            <div className={style.overSelect}></div>
          </div>
          {expanded === true ? (
            <div className={`${style.checkboxes} ${style[`theme${'light'}`]}`}id={"checkboxes" + name}>
              {options ? (
                options.map((option) => (
                  <label htmlFor={`${option.label}-${option.value}`}>
                    <input
                      type="checkbox"
                      id={`${option.label}-${option.value}`}
                      onClick={() =>
                        handleClickInOption(option.value, option.label)
                      }
                      checked={_values?.includes(`${option.value}`)}
                    />
                    {option.label}
                  </label>
                ))
              ) : (
                <p>Não há opções</p>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
);

export default SelectDropdown;
