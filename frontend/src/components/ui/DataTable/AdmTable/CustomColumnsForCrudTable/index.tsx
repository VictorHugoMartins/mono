import React from "react";
import Card from "~/components/ui/Card";
import { DropdownButton } from "~/components/ui/Dropdown";
import FileCard, { DisplayMore, FileCardGroup } from "~/components/ui/FileCard";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { Modal } from "~/components/ui/Modal/Modal";
import TimeLineBar from "~/components/ui/TimeLineBar";
import { FileObjectType } from "~/types/global/FileObjectType";
import { getObjectByField, getStylesByField, priorities, status } from "~/utils/GetStyles";
import UserListRender from "../UserListRender";

import styles from './customColumnsForCrudTable.module.scss';

interface StatusOrPriorityCustomBodyProps {
  label: string;
  type: number;
  editable?: boolean;
}

interface StatusOrPriorityCustomBodyByIdProps {
  id: string;
  type: number;
}

const StatusOrPriorityCustomBody: React.FC<StatusOrPriorityCustomBodyProps> = ({ label, type, editable }) => {
  let array = type === 0 ? priorities : status;
  let clickableComponent = <div style={getStylesByField("name", label, type)}> {label} </div>;

  // console.log("é esse componente msm");

  if (!editable) return <div className={styles.label} style={getStylesByField("name", label, type)}>
    {clickableComponent}
  </div>
  return (
    <div className={styles.label} style={getStylesByField("name", label, type)}>
      <DropdownButton
        clickableComponent={clickableComponent}
        align="left"
        className={styles.label}
      >
        <Card>
          {array.map((item) => (
            <button
              key={item.id}
              className={styles.changePriorityBtn}
              style={{ backgroundColor: item.backgroundColor, color: item.color }}>
              {item.name}
            </button>
          ))}
        </Card>
      </DropdownButton>
    </div>
  );
};

const StatusOrPriorityCustomBodyById: React.FC<StatusOrPriorityCustomBodyByIdProps> = ({ id, type }) => {
  let array = type === 0 ? priorities : status;
  let _item = getObjectByField("id", id, type);

  // console.log("vem nesse outro");

  let clickableComponent = <div style={{ backgroundColor: _item.backgroundColor, color: _item.color }}> {_item.name} </div>;

  return <div className={styles.label} style={{ backgroundColor: _item.backgroundColor, color: _item.color }}>
    {clickableComponent}
  </div>
};

interface ResumeComponentProps {
  resume: any;
}

export const StatusResume: React.FC<ResumeComponentProps> = ({ resume }) => {
  return (
    <Flexbox width={"100%"} className={styles.geralBar}>
      <div title={`Não iniciado (${(resume.notStarted * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Não iniciado", 1), width: `${resume.notStarted * 100}%` }}
      />
      <div title={`Em progresso (${(resume.inProgress * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Em progresso", 1), width: `${resume.inProgress * 100}%` }}
      />
      <div title={`Feito (${(resume.done * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Feito", 1), width: `${resume.done * 100}%` }}
      />
      <div title={`Concluído com atraso (${(resume.lateWithSucces * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Concluído com atraso", 1), width: `${resume.lateWithSucces * 100}%` }}
      />
      <div title={`Atrasado (${(resume.late * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Atrasado", 1), width: `${resume.late * 100}%` }}
      />
      <div className={styles.resumeBar} title={`Sem status (${(resume.withoutStatus * 100).toFixed(2)}%)`}
        style={{ ...getStylesByField("name", "Sem status", 1), width: `${resume.withoutStatus * 100}%` }}
      />
    </Flexbox>
  )
}

export const PriorityResume: React.FC<ResumeComponentProps> = ({ resume }) => {
  return (
    <Flexbox width={"100%"} className={styles.geralBar}>
      <div title={`Prioridade baixa (${(resume.lowPriority * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Baixa", 0), width: `${(resume.lowPriority ?? 0) * 100}%` }}
      />
      <div title={`Prioridade média (${(resume.mediumPriority * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Média", 0), width: `${(resume.mediumPriority ?? 0) * 100}%` }}
      />
      <div title={`Prioridade alta (${(resume.highPriority * 100).toFixed(2)}%)`} className={styles.resumeBar}
        style={{ ...getStylesByField("name", "Alta", 0), width: `${(resume.highPriority ?? 0) * 100}%` }}
      />
      <div className={styles.resumeBar} title={`Sem prioridade (${(resume.withoutPriority * 100).toFixed(2)}%)`}
        style={{ ...getStylesByField("name", "Sem prioridade", 1), width: `${resume.withoutPriority * 100}%` }}
      />
    </Flexbox>
  )
}

interface Props {
  rowData?: any;
  columnKey?: string;
  /** propriede que tras numero de imagens a serem usadas vai de 0 ao valor que for colocado
  * Padrão 4
  */
  imagesQuantity?: number;
}

export function CustomColumnsForCrudTable({ rowData, columnKey, imagesQuantity }: Props) {
  if (columnKey === "statusStr")
    return <StatusOrPriorityCustomBody label={rowData.statusStr} type={1} />
  else if (columnKey === "status") {
    if (typeof (rowData.status) === "object")
      return <StatusOrPriorityCustomBody label={rowData.status.status} type={1} />
    return <StatusOrPriorityCustomBody label={rowData.status} type={1} />
  } else if (columnKey === "progressStatusStr")
    return <StatusOrPriorityCustomBody label={rowData.progressStatusStr} type={1} />
  else if ((columnKey === "priorityStr") || (columnKey === "priorityId")) {
    if (rowData.priorityStr) return <StatusOrPriorityCustomBody label={rowData.priorityStr} type={0} />
    else return <StatusOrPriorityCustomBodyById id={rowData.priorityId} type={0} />
  } else if (columnKey === "timeLine")
    return <TimeLineBar data={rowData.timeLine} priorityStr={rowData.priorityStr} borderRadius />
  else if (columnKey === "users") return <UserListRender users={rowData.users} imagesQuantity={imagesQuantity} />
  else if (columnKey === "mainFile") return (
    <>
      {rowData.mainFile && (
        <FileCard fileObject={rowData.mainFile as any} xs />
      )}
    </>)
  else if (columnKey === "galleryFiles") return (
    <>
      {Array.isArray(rowData.galleryFiles) && (rowData.galleryFiles.length > 0) && (
        <Flexbox>
          <FileCard key={`Filecard-${0}`} fileObject={rowData.galleryFiles[0]} xs />
          {rowData.galleryFiles.length > 1 &&
            <Modal
              title="Galeria de imagens"
              openButton={<DisplayMore />}
            >
              <FileCardGroup>
                {rowData.galleryFiles.map((item: FileObjectType, index) => (
                  <FileCard key={`Filecard-${index}`} fileObject={item} />
                ))}
              </FileCardGroup >
            </Modal>
          }
        </Flexbox>
      )}
    </>
  )
  else return <>{rowData[columnKey]}</>
}

export default StatusOrPriorityCustomBody;