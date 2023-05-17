import React, { useEffect, useState } from "react";

//Import components
import Icon from "../../Icon/Icon";
import { Grid } from "../../Layout/Grid";
import TextInput from "../TextInput";

//Import types
import { SpacingPatternType } from "~/types/global/SpacingType";

import style from "./multiTextInput.module.scss";

export interface MultiTextInputProps {
  name?: string;
  onChange?: (value: string[]) => void;
  value?: string[];
  required?: boolean;
  error?: boolean;
  spacing?: SpacingPatternType;
}

const MultiTextInput: React.FC<MultiTextInputProps> = ({
  name,
  error,
  onChange,
  required,
  spacing,
  value,
}) => {
  const [inputs, setInputs] = useState([" "]);

  useEffect(() => {
    if (value?.length > 0) setInputs(value);
  }, [value]);

  function handleChange(event, index) {
    const inputsArray = [...inputs];
    inputsArray[index] = event.target.value;
    setInputs(inputsArray);
    if (onChange) onChange(inputsArray);
  }

  function handleAddField() {
    setInputs([...inputs, ""]);
  }

  function handleRemoveField(index) {
    let values = [...inputs];
    values.splice(index, 1);
    setInputs(values);
    if (onChange) onChange(values);
  }

  let spaceDefault = "xg" as SpacingPatternType;

  return (
    <Grid container spacing={spacing || spaceDefault}>
      {inputs.map((inputValue, index) => (
        <Grid container>
          <Grid md={10}>
            <TextInput
              name={name}
              value={inputValue}
              error={error}
              onChange={(e) => handleChange(e, index)}
            />
          </Grid>
          <Grid md={2}>
            <div className={style.multiTextInputButtonGroup}>
              <a
                className={style.multiTextInputButton}
                onClick={handleAddField}
                title="Adicionar"
              >
                <Icon type="FaPlus" />
              </a>
              {index !== 0 && (
                <a
                  className={style.multiTextInputButton}
                  onClick={() => handleRemoveField(index)}
                  title="Remover"
                >
                  <Icon type="FaMinus" />
                </a>
              )}
            </div>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default MultiTextInput;
