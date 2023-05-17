import React, { useState } from "react";
import FormPageStructure from "~/components/structure/FormPageStructure";

import Avatar from "~/components/ui/Avatar/Avatar";
import Card from "~/components/ui/Card";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { ModalRemoveButtons } from "~/components/ui/DataTable/DataTableModal/DataTableModalRemove";
import FileCard, { FileCardGroup } from "~/components/ui/FileCard";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import HtmlParseComponent from "~/components/ui/Layout/HtmlParseComponent";
import { Modal } from "~/components/ui/Modal/Modal";
import Typography from "~/components/ui/Typography/Typography";
import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";
import { useUserContext } from "~/context/global/UserContext";
import useTheme from "~/hooks/useTheme";
import listService from "~/services/list.service";

import { FileObjectType } from "~/types/global/FileObjectType";
import ClassJoin from "~/utils/ClassJoin/ClassJoin";
import { FormSuccess } from "~/utils/FormSuccess";
import Toast from "~/utils/Toast/Toast";

import style from "./messageItem.module.scss";

interface MessageItemProps {
  data: MessageItemType;
  userId?: string;
  refreshList?: Function;
}

type MessageItemType = {
  id?: string;
  text: string;
  title: string;
  createdAt?: string;
  galleryFiles?: FileObjectType[];
  image?: FileObjectType;
  name?: string;
  selected?: boolean;
};

const MessageItem: React.FC<MessageItemProps> = ({
  data,
  userId,
  refreshList,
}) => {
  const { theme } = useTheme();
  const { user } = useUserContext();

  const _ticketFromUser = userId === user.id;

  const [error, setError] = useState<string>("");

  async function _submit(handleClose) {
    setError("");
    let response = await listService.itemDelete(
      API_TICKETRESPONSE.DELETE(),
      "id",
      data.id
    );
    if (response.success) {
      if (refreshList) refreshList();
      Toast.success("Removido com sucesso.");
      handleClose();
    } else {
      Toast.error(response.message);
      setError(response.message);
    }
  }

  return (
    <Card
      className={ClassJoin([
        style[`theme${theme}`],
        data.selected && style.selected,
      ])}
    >
      <Flexbox justify="space-between" width={"100%"}>
        {data.name && (
          <Flexbox align="center" spacing={"m"} margin={{ bottom: "m" }}>
            <Avatar alt={data.name} image={data.image?.file} />
            <Typography component="caption">
              Enviado por {data.name} em {data.createdAt}
            </Typography>
          </Flexbox>
        )}
        {_ticketFromUser && false && (
          <Flexbox align="center" spacing={"p"} margin={{ bottom: "m" }}>
            <Modal
              title={"Editar resposta"}
              fixed
              openButton={
                <DataTableButton icon="FaPen" title={"Editar resposta"} />
              }
            >
              <FormPageStructure
                preparePath={API_TICKETRESPONSE.PREPARE(data.id)}
                buildPath={API_TICKETRESPONSE.BUILD()}
                submitPath={API_TICKETRESPONSE.SAVE()}
                buttonSubmitText="Salvar"
                buttonCancelText="Cancelar"
                onSuccess={FormSuccess}
              />
            </Modal>
            <Modal
              title="Você deseja remover esse item?"
              openButton={
                <DataTableButton icon="FaRegTrashAlt" title="Remover" />
              }
            >
              <ModalRemoveButtons submit={_submit} error={error} />
            </Modal>
          </Flexbox>
        )}
      </Flexbox>
      <Flexbox flexDirection="column" spacing={"m"}>
        <Typography component="h3">{data.title}</Typography>
        <HtmlParseComponent html={data.text} />
        {data.galleryFiles?.length > 0 && (
          <Flexbox flexDirection="column">
            <Typography component="span">Arquivos: </Typography>
            <FileCardGroup>
              {data.galleryFiles.map((item: FileObjectType, index) => (
                <FileCard key={`Filecard-${index}`} fileObject={item} />
              ))}
            </FileCardGroup>
          </Flexbox>
        )}
      </Flexbox>
    </Card>
  );
};

export default MessageItem;
