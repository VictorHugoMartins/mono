import React, { useEffect, useState } from "react";

import Button from "~/components/ui/Button/Button";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableHeaderButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton";
import FileCard, { FileCardGroup } from "~/components/ui/FileCard";
import { Modal } from "~/components/ui/Modal/Modal";
import ticketService, { TicketDetailType } from "~/services/ticket.service";

import { FileObjectType } from "~/types/global/FileObjectType";
import LinkedUsersList from "../../../ui/DataTable/AdmTable/UserListRender";

import style from "./modalTicketResponseDetail.module.scss";

interface ModalTicketDetailProps {
  ticketId: string;
  isList?: boolean;
}

interface ModalButtonsProps {
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalTicketDetail: React.FC<ModalTicketDetailProps> = ({
  isList,
  ticketId,
}) => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    const [data, setData] = useState<TicketDetailType>(null);
    const imgStyled = `<img style="width:100%"`;
    useEffect(() => {
      _getDetail();
    }, []);

    async function _getDetail() {
      let response = await ticketService.getTicketDetail(ticketId);
      setData(response);
    }

    if (!data) return <></>;
    return (
      <div className={style.dataTableModal}>
        <ul className={style.dataTableDetail}>
          <li>
            <span>Id: </span>
            <p>{data.id}</p>
          </li>
          <li>
            <span>Título: </span>
            <p>{data.title}</p>
          </li>
          <li>
            <span>Descrição: </span>
            <p
              dangerouslySetInnerHTML={{
                __html: data.description.replaceAll("<img",imgStyled),
              }}
            ></p>
          </li>
          <li>
            <span>Criado em: </span>
            <p>{data.createdAt}</p>
          </li>
          <li>
            <span>Editado em: </span>
            <p>{data.updatedAt}</p>
          </li>
          <li>
            <span>Status: </span>
            <p>{data.status}</p>
          </li>
          <li>
            <span>Finalizado em: </span>
            <p>{data.finishedAt}</p>
          </li>
          <li>
            <span>Projeto: </span>
            <p>{data.project}</p>
          </li>

          {(data.mainFile || data.galleryFiles) && (
            <li>
              <span>Arquivos: </span>
              <FileCardGroup>
                {data.mainFile && (
                  <FileCard fileObject={data.mainFile as any} />
                )}
                {Array.isArray(data.galleryFiles) && (
                  <>
                    {data.galleryFiles.map((item: FileObjectType, index) => (
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
      title={"Detalhes Do Ticket"}
      openButton={
        isList ? (
          <DataTableButton icon="FaInfo" title="Detalhes" />
        ) : (
          <DataTableHeaderButton
            icon="FaTicketAlt"
            text={"Detalhes do Ticket"}
          />
        )
      }
    >
      <ModalContent />
    </Modal>
  );
};

export default ModalTicketDetail;
