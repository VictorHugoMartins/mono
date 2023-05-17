import React, { useEffect, useState } from "react";

// Import assets
import noImage from "../../../../assets/images/no_photo.png";
import styles from "./fileInput.module.scss";

// Import components
import AllFileInput from "./AllFileInput";
import CropImageInput from "./CropImageInput/CropImageInput";

//Import utils
import { fileToBase64 } from "~/utils/FileToBase64";

//Import types
import { FileInputProps, ImageInputProps } from "./fileInput.interface";
import { FileObjectType } from "~/types/global/FileObjectType";

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ type, ...rest }, ref) => {
    function SwitchType() {
      switch (type) {
        case "audio":
          return <input type="file" accept="audio/*" />;
        case "file":
          return <AllFileInput {...rest} />;
        case "image":
          return <ImageInput {...rest} />;
        case "video":
          return <input type="file" accept="video/*" />;
      }
    }

    return <SwitchType />;
  }
);

const ImageInput: React.FC<ImageInputProps> = ({
  crop,
  cropheight,
  cropwidth,
  value,
  inputHeight,
  inputWidth,
  onChange,
}) => {
  const [image, setImage] = useState<File>(null);
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
      setImage(file);
      if (crop) {
        let object = { ...inputValue, name: file.name };
        setInputValue(object);
      } else {
        fileToBase64(file, (img) => {
          let object = { ...inputValue, name: file.name, file: img };
          setInputValue(object);
          if (onChange) onChange(object);
        });
      }
    }
  }

  function _onChangeCrop(cropImage: string) {
    let object = {} as FileObjectType;
    if (cropImage) {
      object = { ...inputValue, file: cropImage };
    } else {
      object = { name: "", disabled: false, file: "" };
    }

    setInputValue(object);
    if (onChange) onChange(object);
  }

  return (
    <>
      {crop && (
        <CropImageInput
          image={image}
          height={cropheight || 150}
          width={cropwidth || 150}
          handleImage={_onChangeCrop}
        />
      )}
      <label>
        <div
          className={styles.imageInput}
          style={{
            backgroundImage: `url(${
              inputValue.file ? inputValue.file : noImage
            })`,
            height: inputHeight || 150,
            width: inputWidth || 150,
          }}
        >
          <input
            type="file"
            accept="image/*"
            onClick={() => {
              setImage(null);
            }}
            onChange={_onChange}
          />
        </div>
      </label>
    </>
  );
};

export default FileInput;
