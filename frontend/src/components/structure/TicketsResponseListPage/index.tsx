import React from "react";

import { ListRedirectButton } from "~/components/local/ListRedirectButton";
import ModalTicketResponseDetail from "~/components/local/TicketsListModals/ModalTicketResponseDetail";

interface Props {
  rowData?: any;
  redirectButton?: boolean;
}

export function TicketsResponseListButtons({ rowData, redirectButton }: Props) {
  return (
    <>
      {redirectButton && (
        <ListRedirectButton
          rowData={rowData}
          href="/projetos/tickets/respostas/adicionar/"
          field="ticketId"
          title="Adicionar Resposta"
        />
      )}
      <ModalTicketResponseDetail rowData={rowData} />
    </>
  );
}
