import React, { useEffect, useState } from "react";

//Import components
import Button from "../../Button/Button";
import { Grid } from "../../Layout/Grid";
import BuildObjectInput from "./BuildObjectInput";

//Import types
import { GenericObjectType } from "~/types/global/GenericObjectType";
import { InputRenderType } from "~/types/global/InputRenderType";

//Import styles
import style from "./objectInput.module.scss";

//Import utils
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Flexbox from "../../Layout/Flexbox/Flexbox";

export interface ObjectInputProps {
  name?: string;
  label?: string;
  onChange?: (value: GenericObjectType[]) => void;
  value?: GenericObjectType[];
  required?: boolean;
  error?: boolean;
  spacing?: number;
  shapeFields: InputRenderType[];
}

const ObjectInput: React.FC<ObjectInputProps> = ({
  name,
  label,
  error,
  onChange,
  required,
  spacing,
  value,
  shapeFields,
}) => {
  const [_inputValues, setInputValues] = useState<GenericObjectType[]>(
    value || []
  );

  useEffect(() => {
    if (value) setInputValues(value);
  }, [value]);

  function handleAddField() {
    let newField: GenericObjectType = shapeFields.reduce(
      (a, value) => ({ ...a, [value.name]: undefined }),
      {}
    );
    setInputValues([..._inputValues, newField]);
  }

  function handleRemoveField(index) {
    let values = [..._inputValues];
    values.splice(index, 1);
    setInputValues(values);
    if (onChange) onChange(values);
  }

  function handleChangeField(value: any, name: string, index: number) {
    let shapesArray = [..._inputValues];
    shapesArray[index][name] = value;
    setInputValues(shapesArray);
    if (onChange) onChange(shapesArray);
  }

  return (
    <Grid container spacing={"xg"}>
      {_inputValues.length > 0 ? (
        <>
          {_inputValues.map((inputValue, index: number) => (
            <Grid key={`buildObjectInput-${index}`} sm={6} md={4}>
              <Flexbox
                className={ClassJoin([
                  style.objectInputBox,
                  error && style.error,
                ])}
                flexDirection="column"
                spacing={"xg"}
              >
                <BuildObjectInput
                  index={index}
                  onChange={handleChangeField}
                  value={inputValue}
                  shapeFields={shapeFields}
                />
                <Button
                  type="button"
                  color="primary"
                  text={"Adicionar " + label}
                  onClick={handleAddField}
                />
                {index !== 0 && (
                  <Button
                    type="button"
                    color="primary"
                    text={"Remover " + label}
                    onClick={() => handleRemoveField(index)}
                  />
                )}
              </Flexbox>
            </Grid>
          ))}
        </>
      ) : (
        <Grid md={3}>
          <Button
            type="button"
            color="primary"
            text={"Adicionar " + label}
            onClick={handleAddField}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default ObjectInput;
