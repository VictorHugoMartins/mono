import React, { useEffect, useState } from "react";

import styles from "./multiFileInput.module.scss";

import { FileObjectType } from "~/types/global/FileObjectType";

import { fileToBase64 } from "~/utils/FileToBase64";
import PreviewMultiFileInput from "./PreviewMultiFileInput";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

export interface MultiFileInputProps {
  name?: string;
  onChange?: (file: FileObjectType[]) => void;
  value?: FileObjectType[];
  placeholder?: string;
  error?: boolean;
}

const MultiFileInput: React.FC<MultiFileInputProps> = ({
  placeholder = "Adicionar Arquivo",
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState<FileObjectType[]>([]);

  useEffect(() => {
    if (value?.length > 0) setInputValue(value);
  }, [value]);

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file = event.target.files[0];
    if (file) {
      fileToBase64(file, (newFile) => {
        let object = { name: file.name, file: newFile } as FileObjectType;
        let array = [...inputValue, object];
        setInputValue(array);
        if (onChange) onChange(array);
      });
    }
  }

  function _onRemove(index: number) {
    let file = [...inputValue];
    if (file) {
      file.splice(index, 1);
      setInputValue(file);
      if (onChange) onChange(file);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.previewGroup}>
        {inputValue.map((item, index) => (
          <PreviewMultiFileInput
            key={`previewMultiFileInput-${index}`}
            fileObject={item}
            onRemove={_onRemove}
            index={index}
          />
        ))}
      </div>
      <label className={ClassJoin([styles.multiFileInput, styles.primary])}>
        <input type="file" accept="*" onChange={_onChange} />
        <p>{placeholder}</p>
      </label>
    </div>
  );
};

export default MultiFileInput;
