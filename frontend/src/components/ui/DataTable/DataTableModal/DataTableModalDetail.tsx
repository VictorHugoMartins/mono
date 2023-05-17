import React, { useEffect, useState } from "react";
import UserListRender from "~/components/ui/DataTable/AdmTable/UserListRender";
import workingHoursService from "~/services/workinghours.service";

import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { ConvertDateToPTBR } from "~/utils/ConverteDateToPT-BR";

import Button from "../../Button/Button";
import { Modal } from "../../Modal/Modal";
import DataTableButton from "../DataTableButton/DataTableButton";

import style from "./dataTableModal.module.scss";

interface DataTableModalDetailProps {
  data: { [key: string]: any }
  columns: DataTableColumnType[];
}

interface ModalButtonsProps {
  item?: any;
  handleClose?: React.MouseEventHandler<HTMLButtonElement>;
}

interface Users {
  id: string;
  name: string;
  profileImage: string;
}

const DataTableModalDetail: React.FC<DataTableModalDetailProps> = ({
  columns,
  data,
}) => {
  function ModalContent({ handleClose }: ModalButtonsProps) {
    return (
      <div className={style.dataTableModal}>
        <ul className={style.dataTableDetail}>
          {columns.map((item, index) => (
            <li key={`detail-table-${index}`}>
              <span>{item.label}: </span>

              {
                item.label === 'Progresso' ?
                  <p>{data[item.value].status}</p> :
                  item.value === "status" ?
                    <p>{data[item.value]}</p> :
                    item.value === 'users' && (data[item.value].length > 0) ?
                      <UserListRender
                        style={{ justifyContent: 'flex-start' }}
                        users={data[item.value] as Users[]}
                        imagesQuantity={data[item.value].length}
                      />
                      :
                      item.value === 'timeLine' ?
                        <p>
                          {`${data[item.value] ? ConvertDateToPTBR(data[item.value]['startDate']) : ''} - ${data[item.value] ? ConvertDateToPTBR(data[item.value]['endDate']) : ''}`}
                        </p>
                        : data[item.value] !== null ?
                          <p
                            dangerouslySetInnerHTML={{
                              __html: data[item.value].toString()
                            }}
                          >
                          </p> :
                          <p></p>
              }
            </li>
          ))}
        </ul>
        <div className={style.buttonsArea}>
          <Button color="danger" text="Fechar" onClick={handleClose} />
        </div>
      </div>
    );
  }

  return (
    <Modal
      title="Detalhes"
      openButton={<DataTableButton icon="FaInfo" title="Detalhes" />}
    >
      <ModalContent />
    </Modal>
  );
};

export default DataTableModalDetail;

export function KanbanModalContent({ item, handleClose }: ModalButtonsProps) {
  const [data, setData] = useState(null);
  const imgStyled = `<img style="width:100%"`;
  useEffect(() => {
    _getDetail();
  }, []);

  async function _getDetail() {
    let response = await workingHoursService.prepare(item.id);
    setData(response);
  }

  if (!data) return <></>;
  return (
    <div className={style.dataTableModal}>
      <ul className={style.dataTableDetail}>
        <li>
          <span>Usuário</span>
          <p>{item.creatorName}</p>
        </li>
        <li>
          <span>Sprint</span>
          <p>{data.sprintName}</p>
        </li>
        <li>
          <span>Projeto</span>
          <p>{data.projectName}</p>
        </li>
        {data.storyName && <li>
          <span>História</span>
          <p>{data.historyName}</p>
        </li>}
        <li>
          <span>Dia de trabalho</span>
          <p>{data.workdayStr}</p>
        </li>
        <li>
          <span>Horas</span>
          <p>{data.horas}</p>
        </li>
        <li>
          <span>Horário de entrada</span>
          <p>{data.arrivalTime}</p>
        </li>
        <li>
          <span>Horário de saída</span>
          <p>{data.exitTime}</p>
        </li>
        <li>
          <span>Pontos de back</span>
          <p>{data.valueBack}</p>
        </li>
        <li>
          <span>Pontos de front</span>
          <p>{data.valueFront}</p>
        </li>
        <li>
          <span>Observações</span>
          <p>{data.observations?.length > 0 ? data.observations : "Não tem"}</p>
        </li>
      </ul>
      <div className={style.buttonsArea}>
        <Button color="danger" text="Fechar" onClick={handleClose} />
      </div>
    </div>
  );
}