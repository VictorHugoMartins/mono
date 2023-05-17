import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useCookies } from "react-cookie";

//Import components
import { CustomColumnsForCrudTable } from "~/components/ui/DataTable/AdmTable/CustomColumnsForCrudTable";
import { DataTableTabsRenderProps } from "~/components/ui/DataTable/DataTableTabsRender/dataTableTabsRender.interface";
import FormPageStructure from "~/components/structure/FormPageStructure";
import ListDateHeaderFilters from "~/components/local/ListDateHeaderFilters";
import CollapseListPageStruture, {
  CollapseListPageStrutureProps,
} from "~/components/structure/CollapseListPageStruture";
import {
  ModalWithTicketResponses,
  TicketsListRedirectButtons,
} from "~/components/structure/TicketsListPage";

//Import config
import { API_TICKET } from "~/config/apiRoutes/ticket";

//Import routes
import privateroute from "~/routes/private.route";

//Import services
import ticketService from "~/services/ticket.service";

//Import types
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import BuildModalProps from "~/types/BuildModalProps";
import { CTXServerSideType } from "~/types/global/ServerSideTypes";

//Import utils
import GetTokenJson from "~/utils/AuthToken/GetTokenJson";
import UpdatePath from "~/utils/UpdatePath";
import { FormSuccess } from "~/utils/FormSuccess";
import { ObjectResponse } from "~/types/global/ObjectResponse";

interface PageProps
  extends CollapseListPageStrutureProps,
    DataTableTabsRenderProps {
  startdate: string;
  enddate: string;
  project?: string;
  status?: string;
  ticketId?: string;
}

const ExternalTicketsList: React.FC<PageProps> = ({
  enddate,
  startdate,
  project,
  status,
  ticketId,
}) => {
  function BuildTicketModalContent({
    open,
    closeModal,
    handleClose,
    rowData,
  }: BuildModalProps) {
    const [objectReturn, setObjectReturn] = useState<ObjectResponse>({
      response: "",
    });

    useEffect(() => {
      if (objectReturn.response !== "") {
        let _project = objectReturn.response["projectId"];
        let _status = objectReturn.response["statusId"];
        window.location.assign(
          `/projetos/tickets/lista/?project=${_project}&status=${_status}`
        );
      }
    }, [objectReturn]);

    return (
      <FormPageStructure
        preparePath={rowData ? API_TICKET.PREPARE(rowData?.id) : null}
        buildPath={API_TICKET.BUILD()}
        submitPath={API_TICKET.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        onSuccess={FormSuccess}
        handleClose={handleClose}
        onCancel={() => {
          closeModal();
        }}
        setObjectReturn={setObjectReturn}
      />
    );
  }

  const [cookie] = useCookies([]);
  const [userList, setUserList] = useState<SelectOptionsType>([]);

  const [_project] = useState(project);
  const [_status] = useState(status);

  const [_url, setUrl] = useState<string>("");

  function _setUrlParam(project: number, status: number) {
    let params = ticketId ? { project, status, ticketId } : { project, status };
    UpdatePath("/projetos/tickets/lista", params);
    setUrl(`/projetos/tickets/lista?project=${project}%26status=${status}`);
  }

  const [_dates, setDates] = useState({
    startdate: startdate,
    enddate: enddate,
  });

  async function getUserListByRole() {
    if (cookie) {
      let _cookie = cookie as CTXServerSideType;
      let roles = (await GetTokenJson(_cookie)).roles;

      let isAdm = roles?.includes("mind");

      let userList = isAdm
        ? await ticketService.getUserList(_cookie)
        : roles?.length > 0
        ? await ticketService.getUserToAssociate(_cookie)
        : [];

      setUserList(userList);
    }
  }

  useEffect(() => {
    getUserListByRole();
  }, [cookie]);

  return (
    <>
      <CollapseListPageStruture
        param="id"
        createPath="/projetos/tickets/adicionar"
        editPath="/projetos/tickets/editar"
        editDisable={"isFinished"}
        exportPath={API_TICKET.EXPORTLIST(startdate, enddate)}
        initialHeaderTab={_project ? Number(_project) : null}
        initialBodyTab={_status ? Number(_status) : null}
        removeAPIPath={API_TICKET.DELETE()}
        getListPath={API_TICKET.GETALLGROUPEDBYSTATUSTOTICKETCONTROLSCREEN(
          _dates.startdate,
          _dates.enddate
        )}
        getListisPost
        optionsPath={API_TICKET.GETALLGROUPEDOPTIONS()}
        onExternalTabChange={(h, b) => _setUrlParam(h, b)}
        externalHeaderRender={
          <ListDateHeaderFilters
            enddate={_dates.enddate}
            startdate={_dates.startdate}
            filterPath={API_TICKET.GETALLGROUPEDBYSTATUSTOTICKETCONTROLSCREEN}
            setDates={setDates}
          />
        }
        buttons={<TicketsListRedirectButtons allList userList={userList} />}
        tabStyle="1"
        title="Lista de Tickets"
        // expander
        customizedBodyColumns={<CustomColumnsForCrudTable />}
        modalPostLabel={"Adicionar Ticket"}
        modalPostEditLabel={"Editar Ticket"}
        editComponent={<BuildTicketModalContent />}
        hideCard
      />
      {ticketId && (
        <ModalWithTicketResponses
          getList={null}
          token={Number(ticketId)}
          initialOpen={Number(ticketId) !== null}
          clickableComponent={<></>}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const months = 1;
  let startdate = new Date(Date.now() - 24 * 30 * months * 3600 * 1000);
  let enddate = new Date();

  const { status, project, ticketId } = ctx.query;

  return {
    props: {
      startdate: startdate.toJSON().slice(0, 10),
      enddate: enddate.toJSON().slice(0, 10),
      project: project ?? 0,
      status: status ?? 0,
      ticketId: ticketId ?? null,
    },
  };
};

export default privateroute(ExternalTicketsList);
