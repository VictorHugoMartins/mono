import FormPageStructure from "~/components/structure/FormPageStructure";
import ListPageStructure from "~/components/structure/ListPageStructure";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { API_PROJECT } from "~/config/apiRoutes/project";
import { API_PROJECT_ITEM } from "~/config/apiRoutes/projectItems";
import { API_SPRINT } from "~/config/apiRoutes/sprints";
import { API_SPRINTCOLLECTION } from "~/config/apiRoutes/sprintsCollection";
import { API_WORKINGHOURS } from "~/config/apiRoutes/workingHours";
import BuildModalProps from "~/types/BuildModalProps";
import { FormSuccess } from "~/utils/FormSuccess";
import { CustomColumnsForCrudTable } from "../../ui/DataTable/AdmTable/CustomColumnsForCrudTable";

export function BuildProjectModalContent({
  handleClose,
  closeModal,
  rowData,
}: BuildModalProps) {
  return (
    <FormPageStructure
      buildPath={API_PROJECT.BUILD()}
      buttonSubmitText="Salvar"
      buttonCancelText="Cancelar"
      submitPath={API_PROJECT.SAVE()}
      preparePath={rowData ? API_PROJECT.PREPARE(rowData?.id) : null}
      onSuccess={FormSuccess}
      handleClose={handleClose}
      onCancel={() => {
        closeModal();
      }}
    />
  );
}

export function BuildProjectItemModalContent({
  handleClose,
  closeModal,
  rowData,
  token,
}: BuildModalProps) {
  if (rowData)
    return (
      <FormPageStructure
        preparePath={API_PROJECT_ITEM.PREPARE(rowData.id)}
        buildPath={API_PROJECT_ITEM.BUILD()}
        submitPath={API_PROJECT_ITEM.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        onSuccess={FormSuccess}
        onCancel={() => {
          handleClose();
        }}
        handleClose={handleClose}
      />
    );
  return (
    <FormPageStructure
      buildPath={API_PROJECT_ITEM.BUILD()}
      buttonSubmitText="Salvar"
      buttonCancelText="Cancelar"
      submitPath={API_PROJECT_ITEM.SAVE()}
      onSuccess={FormSuccess}
      handleClose={handleClose}
      onCancel={() => {
        handleClose();
      }}
    />
  );
}

export function BuildSprintModalContent({
  handleClose,
  closeModal,
  rowData,
  token,
}: BuildModalProps) {
  if (rowData)
    return (
      <FormPageStructure
        buildPath={API_SPRINT.BUILD()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        submitPath={API_SPRINT.SAVE()}
        preparePath={API_SPRINT.PREPARE(rowData.id)}
        onSuccess={FormSuccess}
        handleClose={handleClose}
        onCancel={() => {
          handleClose();
        }}
      />
    );
  return (
    <FormPageStructure
      buildPath={API_SPRINT.BUILD()}
      buttonSubmitText="Salvar"
      buttonCancelText="Cancelar"
      hiddenInputs={{ projectId: token }}
      submitPath={API_SPRINT.SAVE()}
      onSuccess={FormSuccess}
      handleClose={handleClose}
      onCancel={() => {
        handleClose();
      }}
    />
  );
}

export function BuildSprintCollectionModalContent({
  handleClose,
  closeModal,
  rowData,
  token,
}: BuildModalProps) {
  if (rowData)
    return (
      <FormPageStructure
        buildPath={API_SPRINTCOLLECTION.BUILDEDIT(token, rowData?.id)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        submitPath={API_SPRINTCOLLECTION.SAVE()}
        preparePath={API_SPRINTCOLLECTION.PREPARE(rowData.id)}
        onSuccess={FormSuccess}
        handleClose={handleClose}
        onCancel={() => {
          closeModal();
        }}
      />
    );
  return (
    <FormPageStructure
      buildPath={API_SPRINTCOLLECTION.BUILD(token)}
      buttonSubmitText="Salvar"
      buttonCancelText="Cancelar"
      hiddenInputs={{ sprintId: token }}
      submitPath={API_SPRINTCOLLECTION.SAVE()}
      onSuccess={FormSuccess}
      handleClose={handleClose}
      onCancel={() => {
        closeModal();
      }}
    />
  );
}

export const ChildrenTable = (data, options, allowEdit) => {
  return (
    <Flexbox flexDirection="column">
      <ListPageStructure
        removeAPIPath={allowEdit ? API_SPRINT.DELETE() : undefined}
        param="id"
        getListPath={API_SPRINT.GETBYPROJECT(data.id)}
        postApiPath={API_SPRINT.SAVE()}
        customizedBodyColumns={<CustomColumnsForCrudTable />}
        editComponent={
          allowEdit ? <BuildSprintModalContent token={data.id} /> : undefined
        }
        expander
        modalPostLabel={"Adicionar Sprint"}
        modalPostEditLabel={"Editar Sprint"}
        padding={"pp"}
        hideCard
        hideSearch
        allowEdit={allowEdit}
        tableTitle={"Sprints"}
        level={1}
      >
        {sprintCollectionsList}
      </ListPageStructure>

      <ListPageStructure
        removeAPIPath={allowEdit ? API_PROJECT_ITEM.DELETE() : undefined}
        param="id"
        getListPath={API_PROJECT_ITEM.GETALLGROUPEDBYPROJECTID(data.id)}
        details
        postApiPath={API_PROJECT_ITEM.SAVE()}
        customizedBodyColumns={<CustomColumnsForCrudTable />}
        modalPostLabel={"Adicionar Item de Projeto"}
        modalPostEditLabel={"Editar Item de Projeto"}
        editComponent={
          allowEdit ? (
            <BuildProjectItemModalContent token={data.id} />
          ) : undefined
        }
        padding={"pp"}
        hideCard
        hideSearch
        tableTitle={"Itens de projeto"}
        level={1}
      />
    </Flexbox>
  );
};

export const sprintCollectionsList = (data, options, allowEdit) => {
  return (
    <Flexbox flexDirection="column">
      <ListPageStructure
        removeAPIPath={allowEdit ? API_SPRINTCOLLECTION.DELETE() : undefined}
        param="id"
        getListPath={API_SPRINTCOLLECTION.GETALL(data?.id)}
        postApiPath={API_SPRINTCOLLECTION.SAVE()}
        modalPostLabel={"Vincular Item de Projeto"}
        modalPostEditLabel={"Editar Item de Projeto"}
        customizedBodyColumns={<CustomColumnsForCrudTable />}
        editComponent={
          allowEdit ? (
            <BuildSprintCollectionModalContent token={data?.id} />
          ) : undefined
        }
        padding={"pp"}
        hideCard
        hideSearch
        tableTitle={"Histórias"}
        expander
        level={2}
        details
      >
        {observationsList}
      </ListPageStructure>
    </Flexbox>
  );
};

export const observationsList = (data) => {
  return (
    <Flexbox flexDirection="column">
      <ListPageStructure
        param="id"
        getListPath={API_WORKINGHOURS.GETOBSERVATIONS(data?.projectItemId)}
        postApiPath={API_WORKINGHOURS.SAVE()}
        customizedBodyColumns={<CustomColumnsForCrudTable />}
        padding={"pp"}
        hideCard
        hideSearch
        tableTitle={"Observações"}
        level={3}
        hideButtons
      />
    </Flexbox>
  );
};
