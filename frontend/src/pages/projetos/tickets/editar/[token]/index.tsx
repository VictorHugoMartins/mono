import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_TICKET } from "~/config/apiRoutes/ticket";

import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

interface TicketsEditProps {
  token: string;
}

const TicketsEdit: React.FC<TicketsEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure
      title="Editar Ticket"
      returnPath="/projetos/tickets/lista"
    >
      <FormPageStructure
        preparePath={API_TICKET.PREPARE(token)}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(TicketsEdit);
