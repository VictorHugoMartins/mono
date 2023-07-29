import React, { useEffect, useState } from "react";
import Icon from "~/components/ui/Icon/Icon";
import { IconTypes } from "~/components/ui/Icon/icon.interface";
import { FileObjectType } from "~/types/global/FileObjectType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";

import styles from "./previewMultiFileInput.module.scss";

export interface PreviewMultiFileInputProps {
  fileObject: FileObjectType;
  onRemove?: undefined;
  index?: undefined;
}

export interface PreviewMultiFileInputWithRemoveProps {
  fileObject: FileObjectType;
  onRemove: (index: number) => void;
  index: number;
}

type PreviewIconImgType = {
  isImage: boolean;
  icon?: IconTypes;
};

const PreviewMultiFileInput: React.FC<
  PreviewMultiFileInputProps | PreviewMultiFileInputWithRemoveProps
> = ({ fileObject, onRemove, index }) => {
  const [preview, setPreview] = useState<PreviewIconImgType>({
    isImage: false,
    icon: null,
  });
  const imagesubstring = "data:image";

  useEffect(() => _checkPreview(), [fileObject]);

  function _checkPreview() {
    if (fileObject?.file?.includes(imagesubstring)) {
      setPreview({ ...preview, isImage: true });
    } else {
      if (fileObject?.name?.includes(".pdf"))
        setPreview({ icon: "FaFilePdf", isImage: false });
      else if (fileObject?.name?.includes(".xlsx"))
        setPreview({ icon: "FaFileExcel", isImage: false });
      else if (fileObject?.name?.includes(".ofx"))
        setPreview({ icon: "FaFileCode", isImage: false });
      else if (fileObject?.name?.includes(".mp4"))
        setPreview({ icon: "FaFileVideo", isImage: false });
      else if (fileObject?.name?.includes(".txt"))
        setPreview({ icon: "FaFileAlt", isImage: false });
      else setPreview({ icon: "FaFile", isImage: false });
    }
  }

  function _removeItem() {
    if (onRemove) onRemove(index);
  }

  return (
    <div
      className={ClassJoin([
        styles.previewMultiFileInput,
        styles[`theme${'light'}`],
      ])}
    >
      <div className={styles.preview}>
        {preview.isImage && <img src={fileObject.file} />}
        {!preview.isImage && preview.icon && (
          <Icon type={preview.icon} size={30} />
        )}
      </div>
      <div className={styles.label}>{fileObject.name}</div>
      {onRemove && (
        <a className={styles.icon} onClick={_removeItem}>
          <Icon type="FaRegTimesCircle" size={20} />
        </a>
      )}
    </div>
  );
};

export default PreviewMultiFileInput;
