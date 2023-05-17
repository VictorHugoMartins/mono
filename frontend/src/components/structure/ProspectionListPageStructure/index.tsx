import React, { useEffect, useState } from "react";

//Import components
import ListDateHeaderFilters from "~/components/local/ListDateHeaderFilters";
import ListButtons from "./components/ListButtons";
import ListWithExternalTabPageStructure from "../ListWithExternalTabPageStructure";

//Import config
import { API_PROSPECT } from "~/config/apiRoutes/prospect";

//Import utils
import UpdatePath from "~/utils/UpdatePath";
import ModalFormStructure from "../ModalFormStructure";
import DataTableHeaderButton from "~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton";
import styles from '~/assets/styles/base/_rowTables.module.scss';
interface ProspectionListPageStructureProps {
  startdate: string;
  enddate: string;
  management: string;
  status: string;
}

const ProspectionListPageStructure: React.FC<
  ProspectionListPageStructureProps
> = ({ startdate, enddate, management, status }) => {
  const [updateTabsFunction, setUpdateTabsFunction] = useState({
    updateFunction:()=>{}
  });
  const [_params, setParams] = useState({
    startdate: startdate,
    enddate: enddate,
    managementId: management,
    statusId: status,
  });

  const [_listPath, setListPath] = useState<string>(
    API_PROSPECT.GETALLGROUPED(startdate, enddate, management)
  );
  const pageBase = "/adm/prospeccao/lista";
  const [_url, setUrl] = useState<string>("");

  useEffect(() => {
    _handleListPathParams();
    console.log("params",_params);
  }, [_params]);

  const _handleListPathParams = () => {
    let { startdate, enddate, managementId, statusId } = _params;

    setListPath(API_PROSPECT.GETALLGROUPED(startdate, enddate, managementId));
    _setUrlParam(managementId, statusId);
  };

  function _setUrlParam(managementId: string, statusId: string) {
    UpdatePath(pageBase, {
      management: managementId,
      status: statusId,
    });
    setUrl(
      `${pageBase}?management=${managementId}%26status=${
        statusId
      }`
    );
  }

  function Form(props) {
    return (
      <ModalFormStructure
        title={"Adicionar"}
        getList={props._getList}
        updateTabsFunction={props.updateTabsFunction}
        clickableComponent={
          <DataTableHeaderButton
            text={"Adicionar"}
            icon={"FaPlus"}
          />
        }
        formProps={{
          buildPath: API_PROSPECT.BUILD(),
          buttonCancelText: "Cancelar",
          isMessageApi: true,
          buttonSubmitText: "Salvar",
          submitPath: API_PROSPECT.SAVE(),
          title: 'Cadastrar Prospecção',
        }}
      />
    )
  }

  return (
    <ListWithExternalTabPageStructure
      buttons={<ListButtons updateTabsFunction={updateTabsFunction} />}
      details
      footerComponent={<Form updateTabsFunction={updateTabsFunction} />}
      headerRender={
        <ListDateHeaderFilters
        enddate={_params.enddate}
        startdate={_params.startdate}
        onSubmit={(startdate, enddate) => {
          setParams({ ..._params, startdate: startdate, enddate: enddate });
        }}
        />
      }
      exportPath={API_PROSPECT.EXPORTLIST()}
      setUpdateTabsFunction={setUpdateTabsFunction}
      getListPath={_listPath}
      param="id"
      removeAPIPath={API_PROSPECT.DELETE()}
      optionsPath={API_PROSPECT.GETALLGROUPEDOPTIONS()}
      externalTabParam={management}
      internalTabParam={status}
      rowClassName={(data)=>data.isMarked? styles.errorRow:undefined}
      onTabChange={(external, internal) => {
        setParams({
          ..._params,
          managementId: external,
          statusId: internal,
        });
      }}
    />
  );
};

export default ProspectionListPageStructure;
