import React from "react";
import { GetServerSideProps } from "next";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import { API_TICKETRESPONSE } from "~/config/apiRoutes/ticketResponse";

import privateroute from "~/routes/private.route";
import FeedPageStructure from "~/components/structure/FeedPageStructure";

interface PageProps {
  returnUrl?: string;
  title: string;
  token: string;
}

const TicketsResponseList: React.FC<PageProps> = ({
  returnUrl,
  title,
  token,
}) => {
  return (
    <PrivatePageStructure
      title={`Respostas Ticket ${token} - ${title}`}
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
  const { title, token, returnUrl } = ctx.query;

  return { props: { returnUrl: returnUrl || null, title, token } };
};

export default privateroute(TicketsResponseList);
