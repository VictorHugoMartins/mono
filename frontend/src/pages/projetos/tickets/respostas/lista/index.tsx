import React from "react";

import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { TicketsResponseListButtons } from "~/components/structure/TicketsResponseListPage";

import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";

import privateroute from "~/routes/private.route";

const TicketsResponseList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Respostas do Ticket" noPadding>
      <ListPageStructure
        param="id"
        editPath="/projetos/tickets/respostas/editar"
        exportPath={API_TICKETRESPONSE.EXPORTLIST()}
        removeAPIPath={API_TICKETRESPONSE.DELETE()}
        getListPath={API_TICKETRESPONSE.GETALLGROUPED()}
        buttons={<TicketsResponseListButtons redirectButton />}
        showTabs
      />
    </PrivatePageStructure>
  );
};

export default privateroute(TicketsResponseList);
