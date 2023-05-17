import React, { useEffect } from "react";

//Import components
import { Grid } from "~/components/ui/Layout/Grid";
import Checkbox from "../../Checkbox";
import DateInput from "../../DateInput";
import FileInput from "../../FileInput/FileInput";
import Label from "../../Label/Label";
import MultiTextInput from "../../MultiTextInput";
import Select from "../../Select";
import TextArea from "../../TextArea";
import TextAreaFormat from "../../TextAreaFormat";
import TextInput from "../../TextInput";

//Import types
import { GenericObjectType } from "~/types/global/GenericObjectType";
import { InputRenderType } from "~/types/global/InputRenderType";
import { DateInputType } from "../../DateInput/dateInput.interface";
import { TextInputType } from "../../TextInput/textInput.interface";

interface BuildObjectInputProps {
  index: number;
  shapeFields: InputRenderType[];
  onChange: (value: any, name: string, index: number) => void;
  value: GenericObjectType;
}

const BuildObjectInput: React.FC<BuildObjectInputProps> = ({
  index,
  onChange,
  shapeFields,
  value,
}) => {
  const handleChange = (value, name) => {
    onChange(value, name, index);
  };

  function _arrayInclude(array: string[], value: string): boolean {
    if (array && value) return array.includes(value);
    return false;
  }

  return (
    <>
      {shapeFields.map((item, i) => (
        <div
          key={`shape-${index}-${i}`}
          style={{
            display: _arrayInclude(["hidden", "hidden-number"], item.type)
              ? "none"
              : "",
          }}
        >
          {item.label && <Label labelFor={item.name} text={item.label} />}
          {_arrayInclude(["hidden", "hidden-number"], item.type) && (
            <TextInput value={value[item.name]} type="text" disabled />
          )}
          {_arrayInclude(["text", "email", "password"], item.type) && (
            <TextInput
              value={value[item.name]}
              type={item.type as TextInputType}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["number"], item.type) && (
            <TextInput
              value={value[item.name]}
              type={"number"}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["textarea-format"], item.type) && (
            <TextAreaFormat
              value={value[item.name] as string}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["textarea"], item.type) && (
            <TextArea
              value={value[item.name]}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["text-list"], item.type) && (
            <MultiTextInput
              value={value[item.name] as any}
              onChange={(list) => handleChange(list, item.name)}
            />
          )}
          {_arrayInclude(["checkbox-bool"], item.type) && (
            <Checkbox
              id={`shape-${index}-${i}`}
              value={value[item.name] as any}
              checked={value[item.name] as any}
              label="-"
              onChange={(e) => {
                handleChange(e.target.checked, item.name);
              }}
            />
          )}
          {_arrayInclude(["datetime-local"], item.type) && (
            <DateInput
              value={value[item.name] as any}
              type={"datetime-local"}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["date", "time"], item.type) && (
            <DateInput
              value={value[item.name] as any}
              type={item.type as DateInputType}
              onChange={(e) => handleChange(e.target.value, item.name)}
            />
          )}
          {_arrayInclude(["image"], item.type) && (
            <FileInput
              value={value[item.name] as any}
              type={"image"}
              crop
              onChange={(file) => handleChange(file, item.name)}
            />
          )}
          {_arrayInclude(["file"], item.type) && (
            <FileInput
              value={value[item.name] as any}
              type={"file"}
              crop
              onChange={(file) => handleChange(file, item.name)}
            />
          )}
          {_arrayInclude(["select"], item.type) && (
            <Select
              value={value[item.name] as any}
              options={item.options}
              onChange={(e) => handleChange(e, item.name)}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default React.memo(BuildObjectInput);
