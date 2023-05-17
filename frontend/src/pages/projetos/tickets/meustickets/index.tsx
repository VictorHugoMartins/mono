import { GetServerSideProps } from "next";
import React from "react";

import MyTicketsListPage from "~/components/structure/MyTicketsPage";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import privateroute from "~/routes/private.route";

interface PageProps {
  ticketId?: string;
}

const TicketsList: React.FC<PageProps> = ({ ticketId }) => {
  return (
    <PrivatePageStructure title="Lista dos Meus Tickets">
      <MyTicketsListPage
        createPath="/projetos/tickets/adicionar"
        initialOpenTicketModal={ticketId}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ticketId } = ctx.query;

  return {
    props: {
      ticketId: ticketId ?? null,
    },
  };
};

export default privateroute(TicketsList);
