import React, { useEffect, useState } from "react";

//Import assets
import styles from "./allFileInput.module.scss";

//Import components

//Import utils
import { fileToBase64 } from "~/utils/FileToBase64";

//Import types
import { AllInputProps } from "../fileInput.interface";
import { FileObjectType } from "~/types/global/FileObjectType";
import FileCard from "~/components/ui/FileCard";
import Typography from "~/components/ui/Typography/Typography";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

const AllFileInput: React.FC<AllInputProps> = ({
  inputHeight,
  inputWidth,
  onChange,
  value,
}) => {
  const [allFile, setAllFile] = useState<File>(null);
  const [inputValue, setInputValue] = useState<FileObjectType>({
    name: "",
    disabled: false,
    file: "",
  });

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  function _onChange(event: React.ChangeEvent<HTMLInputElement>) {
    let file = event.target.files[0];
    if (file) {
      setAllFile(file);
      fileToBase64(file, (newFile) => {
        let object = { ...inputValue, name: file.name, file: newFile };
        setInputValue(object);
        if (onChange) onChange(object);
      });
    }
  }

  return (
    <div className={styles.allFileInput}>
      {inputValue?.file ? (
        <FileCard
          fileObject={inputValue}
          onRemove={() => {
            setInputValue(null);
          }}
        />
      ) : (
        <label>
          <div className={ClassJoin([styles.fileInput, styles.primary])}>
            <Typography component="p">Adicionar Arquivos</Typography>
            <input
              type="file"
              accept="*"
              onClick={() => {
                setAllFile(null);
              }}
              onChange={_onChange}
            />
          </div>
        </label>
      )}
    </div>
  );
};

export default AllFileInput;
