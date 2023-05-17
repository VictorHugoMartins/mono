import React, { useEffect, useState } from "react";
import Card from "~/components/ui/Card";
import Typography from "~/components/ui/Typography/Typography";

import styles from "../kanban.module.scss";
import { TicketCardType } from "~/types/global/ListType";
import ResponsivePagination from "~/components/ui/Pagination";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import { ModalTicketFinished } from "~/components/local/TicketsListModals/ModalTicketFinished";
import useTheme from "~/hooks/useTheme";
import { ModalWithTicketResponses } from "~/components/structure/TicketsListPage";

interface HomeKanbanItemProps {
  item: TicketCardType;
  refreshList: () => void;
  kanbanObjectType?: "ticket" | "dashboard";
  initialOpenTicketModal?: string;
}

const HomeKanbanItem: React.FC<HomeKanbanItemProps> = ({
  item,
  refreshList,
  initialOpenTicketModal,
}) => {
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [noOfPages, setNoOfPages] = useState(1);

  useEffect(() => {
    setNoOfPages(Math.ceil(item.rows.length / itemsPerPage));
  }, [item.rows]);

  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    window.location.assign("#top-of-list");
    setPage(value);
  };

  return (
    <>
      {!(item.rows.length > 0) ? (
        <Typography component="p">
          Você não está associado a nenhum ticket {item.title.toLowerCase()}
        </Typography>
      ) : (
        item.rows
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((element, i) => {
            let ticket = element[0];

            return (
              <Card
                className={`${styles.card} ${styles[`theme${theme}`]}`}
                key={`kanabnItem-${i}`}
              >
                <Flexbox flexDirection="column" spacing="p" width={"100%"}>
                  <Flexbox justify="space-between" wrap width={"100%"}>
                    <caption>{ticket.project}</caption>
                    <Flexbox spacing="p">
                      <ModalWithTicketResponses
                        token={ticket.ticketId}
                        initialOpen={
                          Number(initialOpenTicketModal) ===
                          Number(ticket.ticketId)
                        }
                        getList={refreshList}
                      />
                      <ModalTicketFinished
                        ticketId={ticket.ticketId}
                        finished={item.title == "Finalizado"}
                        getList={refreshList}
                      />
                    </Flexbox>
                  </Flexbox>
                  <a
                    key={`ticket-${ticket.ticketId}`}
                    id={`ticket-${ticket.ticketId}`}
                  >
                    <Typography component="h4" margin={{ bottom: "pp" }}>
                      Ticket {ticket.ticketId} - {ticket.title}{" "}
                    </Typography>
                  </a>

                  <Typography component="h5">
                    Última atualização por {ticket.createdBy} em{" "}
                    {ticket.updatedAt}
                  </Typography>
                </Flexbox>
              </Card>
            );
          })
      )}
      <Flexbox align="center" justify="center" width={"100%"}>
        <ResponsivePagination
          page={page}
          noOfPages={noOfPages}
          handleChange={handleChange}
        />
      </Flexbox>
    </>
  );
};

export default HomeKanbanItem;
