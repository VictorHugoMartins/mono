import React from "react";
import { GetServerSideProps } from "next";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";

import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import ModalTicketDetail from "~/components/local/TicketsListModals/ModalTicketDetail";

interface TicketsEditProps {
  token: string;
  returnUrl?: string;
}

const TicketsEdit: React.FC<TicketsEditProps> = ({ token, returnUrl }) => {
  return (
    <PrivatePageStructure
      title="Editar Resposta"
      returnPath={`/projetos/tickets/respostas/lista/${token}${
        returnUrl ? `?returnUrl=${returnUrl.replace("&", "%26")}` : ""
      }`}
    >
      <Flexbox justify="flex-end">
        <ModalTicketDetail ticketId={token} />
      </Flexbox>
      <FormPageStructure
        preparePath={API_TICKETRESPONSE.PREPARE(token)}
        buildPath={API_TICKETRESPONSE.BUILD()}
        submitPath={API_TICKETRESPONSE.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={`/projetos/tickets/respostas/lista/${token}${
          returnUrl ? `?returnUrl=${returnUrl.replace("&", "%26")}` : ""
        }`}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, returnUrl } = ctx.query;

  return { props: { returnUrl: returnUrl || null, token } };
};

export default privateroute(TicketsEdit);
