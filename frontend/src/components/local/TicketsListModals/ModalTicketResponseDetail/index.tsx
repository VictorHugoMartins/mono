import React from "react";

import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import FileCard, { FileCardGroup } from "~/components/ui/FileCard";
import { Modal } from "~/components/ui/Modal/Modal";

import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { FileObjectType } from "~/types/global/FileObjectType";

import style from "./modalTicketResponseDetail.module.scss";

interface ModalTicketResponseDetailProps {
  rowData: { [key: string]: string };
}

interface ModalButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalTicketResponseDetail: React.FC<ModalTicketResponseDetailProps> = ({
  rowData,
}) => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    const { description, galleryFiles, mainFile, projectStr } = rowData;

    return (
      <div className={style.dataTableModal}>
        <ul className={style.dataTableDetail}>
          <li>
            <span>Projeto: </span>
            <p>{projectStr}</p>
          </li>
          <li>
            <span>Descrição: </span>
            <p
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></p>
          </li>
          {(mainFile || galleryFiles) && (
            <li>
              <span>Arquivos: </span>
              <FileCardGroup>
                {mainFile && <FileCard fileObject={mainFile as any} />}
                {Array.isArray(galleryFiles) && (
                  <>
                    {galleryFiles.map((item: FileObjectType, index) => (
                      <FileCard key={`Filecard-${index}`} fileObject={item} />
                    ))}
                  </>
                )}
              </FileCardGroup>
            </li>
          )}
        </ul>
        <div className={style.buttonsArea}>
          <Button color="danger" text="Fechar" onClick={handleClose} />
        </div>
      </div>
    );
  }

  return (
    <Modal
      title={rowData["title"]}
      openButton={<DataTableButton icon="FaEye" title="Detalhes" />}
    >
      <ModalContent />
    </Modal>
  );
};

export default ModalTicketResponseDetail;
