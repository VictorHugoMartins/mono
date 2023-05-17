import React, { useEffect, useState } from "react";
import useTheme from "~/hooks/useTheme";

import { FileObjectType } from "~/types/global/FileObjectType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import Icon from "../Icon/Icon";
import { IconTypes } from "../Icon/icon.interface";
import HtmlParseComponent from "../Layout/HtmlParseComponent";
import { Modal } from "../Modal/Modal";

import styles from "./fileCard.module.scss";

export interface FileCardProps {
  fileObject: FileObjectType;
  onRemove?: () => void;
  xs?: boolean;
}

type PreviewIconImgType = {
  isImage: boolean;
  icon?: IconTypes;
  ext?: string;
};

const FileCard: React.FC<FileCardProps> = ({ fileObject, onRemove, xs }) => {
  const [preview, setPreview] = useState<PreviewIconImgType>({
    isImage: false,
    icon: null,
  });
  const { theme } = useTheme();
  const imagesubstring = "data:image";

  useEffect(() => _checkPreview(), [fileObject]);

  function _checkPreview() {
    if (
      fileObject?.file?.includes(imagesubstring) ||
      fileObject?.name?.includes(".png") ||
      fileObject?.name?.includes(".jpg") ||
      fileObject?.name?.includes(".jpeg")
    ) {
      setPreview({ ...preview, isImage: true, ext: "Image" });
    } else {
      if (fileObject?.name?.includes(".pdf"))
        setPreview({ icon: "FaFilePdf", isImage: false, ext: "PDF" });
      else if (fileObject?.name?.includes(".xlsx"))
        setPreview({ icon: "FaFileExcel", isImage: false, ext: "Excel" });
      else if (fileObject?.name?.includes(".ofx"))
        setPreview({ icon: "FaFileCode", isImage: false, ext: "OFX" });
      else if (fileObject?.name?.includes(".mp4"))
        setPreview({ icon: "FaFileVideo", isImage: false, ext: "Video" });
      else if (fileObject?.name?.includes(".txt"))
        setPreview({ icon: "FaFileAlt", isImage: false, ext: "Text" });
      else setPreview({ icon: "FaFile", isImage: false, ext: "File" });
    }
  }


  function loadPreview(file) {
    let element = document.getElementById("preview")
    if (!element) return;
    element.innerHTML = "";
    element.append(file);
  }

  function ModalContent({ file }) {
    useEffect(() => {
      loadPreview(fileObject.file);
    }, [])

    if (fileObject.file.includes("png")) return (<img src={fileObject.file} />);
    return (
      <iframe style={{ minWidth: "50vw", width: "100%" }} id="iframeview" src={fileObject.file} />
    )
  }

  return (
    <div className={ClassJoin([styles.fileCard, styles[`theme${theme}`], xs && styles.xs])}>
      <div className={styles.fileCardContent}>
        <div className={styles.preview}>
          {preview.isImage && <img src={fileObject.file} />}
          {!preview.isImage && preview.icon && (
            <Icon type={preview.icon} size={xs ? 16 : 30} />
          )}
        </div>
        <div className={styles.label}>{fileObject.name}</div>
        {onRemove ? (
          <a className={styles.icon} onClick={() => onRemove()}>
            <Icon type="FaRegTimesCircle" size={xs ? 12 : 20} />
          </a>
        ) : (
          <div onClick={() => loadPreview(fileObject.file)}>
            <Modal
              noOverflow
              openButton={
                <div className={styles.icon}>
                  <Icon type="FaDownload" size={xs ? 12 : 20} />
                </div>
              }
              title={"Visualização do arquivo"}
            >
              <div className={styles.fileCardView}>
                <ModalContent file={fileObject.file} />
              </div>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
};

export const FileCardGroup: React.FC = ({ children }) => {
  return <div className={styles.fileCardGroup}>{children}</div>;
};

export const DisplayMore: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={ClassJoin([styles.fileCard, styles[`theme${theme}`]])}>
      <div className={styles.fileCardContent}>
        <Icon type={"FaPlus"} size={10} />
      </div>
    </div>
  );
}
export default FileCard;
