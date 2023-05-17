import React, { useEffect, useState } from "react";

//import components
import Button from "~/components/ui/Button/Button";
import Card from "~/components/ui/Card";
import Chart from "~/components/ui/Charts/Chart";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import FeedPageStructure from "../FeedPageStructure";
import FormPageStructure from "../FormPageStructure";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import GridGroup from "~/components/ui/Layout/GridGroup";
import List from "~/components/ui/List";
import PageHead from "~/components/ui/PageHead";
import { ModalTicketFinished } from "~/components/local/TicketsListModals/ModalTicketFinished";
import { ModalTicketAssociateTicket } from "~/components/local/TicketsListModals/ModalTicketAssociateTicket";
import { Modal } from "~/components/ui/Modal/Modal";

//import config
import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";

//import utils
import RedirectTo from "~/utils/Redirect/Redirect";
import { FormSuccess } from "~/utils/FormSuccess";

//import services
import ticketService from "~/services/ticket.service";

//import types
import { ChartObjectType } from "~/types/global/ChartTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import BuildModalProps from "~/types/BuildModalProps";

export const TicketResponsesModal: React.FC<BuildModalProps> = ({
  handleClose,
  closeModal,
  token,
}) => {
  return (
    <>
      <FeedPageStructure
        createPath={`/projetos/tickets/respostas/adicionar/${token}${false ? `?returnUrl=${"".replace("&", "%26")}` : ""
          }`}
        getPath={API_TICKETRESPONSE.GETINFOPOSTSBYTICKET(token)}
        firstSelected
      />

      <Card title="Adicionar Resposta">
        <FormPageStructure
          buildPath={API_TICKETRESPONSE.BUILD()}
          submitPath={API_TICKETRESPONSE.SAVE()}
          hiddenInputs={{ ticketId: token }}
          buttonSubmitText="Salvar"
          buttonCancelText="Cancelar"
          onSuccess={FormSuccess}
          handleClose={handleClose}
          onCancel={() => {
            closeModal();
          }}
        />
      </Card>
    </>
  );
};
interface TicketsListPageProps {
  createPath?: string;
  title?: string;
  returnPath?: string;
}

export default function TicketsListPage({
  createPath,
  returnPath,
  title,
}: TicketsListPageProps) {
  const [_lists, setLists] = useState<any>(null);
  const [_chart, setChart] = useState<ChartObjectType>(null);

  async function _getList() {
    let response = await ticketService.getNestedList();
    setChart(response.chart);
    setLists(response.lists);
  }

  useEffect(() => {
    _getList();
  }, []);

  return (
    <>
      <PageHead title={title} returnUrl={returnPath} />
      {createPath && (
        <Flexbox justify="flex-end" margin={{ bottom: "m" }}>
          <div>
            <Button
              color="primary"
              icon="FaPlus"
              onClick={() => RedirectTo(createPath)}
            >
              Criar Ticket
            </Button>
          </div>
        </Flexbox>
      )}
      <GridGroup width="48%" height="265px" spacing={"m"}>
        {_lists?.map((item, i) => (
          <List
            key={`list-${i}`}
            rows={item.rows}
            backgroundColor={item.backgroundColor}
            title={item.title}
          />
        ))}
        {_chart && <Chart data={_chart.data} type={_chart.type} />}
      </GridGroup>
    </>
  );
}

interface TicketsListRedirectButtonsrops {
  allList?: boolean;
  rowData?: any;
  userList?: SelectOptionsType;
  getList?: () => void;
  initialResponseIdOpen?: string;
}
export function TicketsListRedirectButtons({
  allList,
  rowData,
  userList,
  getList,
  initialResponseIdOpen,
}: TicketsListRedirectButtonsrops) {
  return (
    <>
      {allList && (
        <ModalTicketAssociateTicket
          ticketId={rowData.id}
          responsibleId={rowData.responsibleId}
          responsibleList={userList}
          getList={getList}
        />
      )}

      <ModalWithTicketResponses
        getList={getList}
        token={rowData.id}
        initialOpen={Number(initialResponseIdOpen) === rowData.id}
      />

      {rowData["hasPermissionFinished"] && (
        <ModalTicketFinished
          ticketId={rowData.id}
          finished={rowData.isFinished}
          getList={getList}
        />
      )}
    </>
  );
}

export function ModalWithTicketResponses({
  getList,
  token,
  initialOpen = false,
  clickableComponent=null
}) {
  return (
    <Modal
      title="Respostas do ticket"
      openButton={
        clickableComponent ?? <DataTableButton icon="FaExternalLinkAlt" title="Ver conversa" />
      }
      fixed
      openExternal={initialOpen}
      disabledBackClick={false}
      onClose={getList}
    >
      <TicketResponsesModal token={token} />
    </Modal>
  );
}
