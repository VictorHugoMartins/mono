import { GetServerSideProps } from "next";
import React from "react";
import ModalTicketDetail from "~/components/local/TicketsListModals/ModalTicketDetail";

import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";
import privateroute from "~/routes/private.route";

import { FormSuccess } from "~/utils/FormSuccess";

interface PageProps {
  token: string;
  returnUrl?: string;
}

const TicketsAdd: React.FC<PageProps> = ({ token, returnUrl }) => {
  return (
    <PrivatePageStructure
      title="Criar Resposta"
      returnPath={`/projetos/tickets/respostas/lista/${token}${
        returnUrl ? `?returnUrl=${returnUrl.replace("&", "%26")}` : ""
      }`}
    >
      <Flexbox justify="flex-end">
        <ModalTicketDetail ticketId={token} />
      </Flexbox>
      <FormPageStructure
        buildPath={API_TICKETRESPONSE.BUILD()}
        submitPath={API_TICKETRESPONSE.SAVE()}
        hiddenInputs={{ ticketId: token }}
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

export default privateroute(TicketsAdd);
