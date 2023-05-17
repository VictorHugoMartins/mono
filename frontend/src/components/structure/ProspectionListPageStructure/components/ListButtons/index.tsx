import React from "react";
import FeedModalStructure from "~/components/structure/FeedModalStructure";
import ModalFormStructure from "~/components/structure/ModalFormStructure";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import DataTableButtons from "~/components/ui/DataTable/DataTableButtons";
import { Modal } from "~/components/ui/Modal/Modal";
import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import { API_PROSPECTITEM } from "~/config/apiRoutes/prospectItem";
import ModalChangeProspectionStatus from "../ModalChangeProspectionStatus";
import ModalChangeUserSeller from "../ModalChangeUserSeller";

interface ListButtonsrops {
  rowData?: any;
  getList?: () => void;
  updateTabsFunction?: {
    updateFunction: () => void;
  }
}

const ListButtons: React.FC<ListButtonsrops> = ({ updateTabsFunction, getList, rowData }) => {
  return (
    <>
      <Modal
        openButton={<DataTableButton icon="FaUserTie" title="Trocar Negociador"/>}
        title={"Trocar Negociador"}
      >
        <ModalChangeUserSeller prospectId={rowData.id} getList={getList} />
      </Modal>
      <Modal
        openButton={<DataTableButton title="Trocar Status" icon={"FaExchangeAlt"} />}
        title="Trocar Status da Prospecção"
      >
        <ModalChangeProspectionStatus getList={getList} prospectId={rowData.id} />
      </Modal>
      <FeedModalStructure
        form={{
          buildPath: API_PROSPECTITEM.BUILD(),
          submitPath: API_PROSPECTITEM.SAVE(),
          hiddenInputs: {
            prospectCustomerId: rowData.id
          },
          title: "Adicionar Contato"
        }}
        getFeedPath={API_PROSPECTITEM.LIST_NESTED_ITEMS(rowData.id)}
        openButton={<DataTableButton title="Ver Histórico" icon={"FaExternalLinkAlt"} />}
        title={"Itens da Prospecção"}
        refreshList={getList}
        token={rowData.id}
      />
      <ModalFormStructure
        title={"Editar"}
        getList={getList}
        updateTabsFunction={updateTabsFunction}
        clickableComponent={
          <DataTableButton
            icon={"FaPen"}
            title="Editar Prospecção"
          />
        }
        formProps={{
          buildPath: API_PROSPECT.BUILD(true),
          buttonCancelText: "Cancelar",
          isMessageApi: true,
          preparePath: API_PROSPECT.PREPARE(rowData.id),
          buttonSubmitText: "Salvar",
          submitPath: API_PROSPECT.SAVE(),
          title: "Editar Prospecção",
        }}
      />
    </>
  );
};

export default ListButtons;
