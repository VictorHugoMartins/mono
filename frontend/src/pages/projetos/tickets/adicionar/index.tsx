import React from "react";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_TICKET } from "~/config/apiRoutes/ticket";
import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

const TicketsAdd: React.FC = () => {
  return (
    <PrivatePageStructure
      title="Criar Ticket"
      returnPath="/projetos/tickets/lista"
    >
      <FormPageStructure
        buildPath={API_TICKET.BUILD()}
        submitPath={API_TICKET.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/projetos/tickets/lista"
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(TicketsAdd);
