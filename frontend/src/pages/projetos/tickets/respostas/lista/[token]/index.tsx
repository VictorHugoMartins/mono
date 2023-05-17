import React from "react";
import { GetServerSideProps } from "next";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import FeedPageStructure from "~/components/structure/FeedPageStructure";

import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";

import privateroute from "~/routes/private.route";

interface PageProps {
  returnUrl?: string;
  token: string;
}

const TicketsResponseList: React.FC<PageProps> = ({ returnUrl, token }) => {
  return (
    <PrivatePageStructure
      title={`Respostas Ticket ${token}`}
      returnPath={returnUrl || `/projetos/tickets/lista`}
    >
      <FeedPageStructure
        createPath={`/projetos/tickets/respostas/adicionar/${token}${
          returnUrl ? `?returnUrl=${returnUrl.replace("&", "%26")}` : ""
        }`}
        getPath={API_TICKETRESPONSE.GETINFOPOSTSBYTICKET(token)}
        firstSelected
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token, returnUrl } = ctx.query;

  return { props: { returnUrl: returnUrl || null, token } };
};

export default privateroute(TicketsResponseList);
