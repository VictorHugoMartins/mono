import React, { useEffect, useState } from "react";
import Card from "~/components/ui/Card";
import Typography from "~/components/ui/Typography/Typography";

import styles from "../kanban.module.scss";
import ResponsivePagination from "~/components/ui/Pagination";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import Icon from "~/components/ui/Icon/Icon";
import useTheme from "~/hooks/useTheme";
import {
  ModalWithTicketResponses,
} from "~/components/structure/TicketsListPage";
import DataTableButton from "~/components/ui/DataTable/DataTableButton/DataTableButton";
import { Modal } from "~/components/ui/Modal/Modal";
import { KanbanModalContent } from "~/components/ui/DataTable/DataTableModal/DataTableModalDetail";
import { HomeKanbanItemProps } from "~/components/local/Kanban/kanban.interface";
import LinkedUsersList from "../../../ui/DataTable/AdmTable/UserListRender";
import { ModalTicketFinished } from "../../TicketsListModals/ModalTicketFinished";
import { useUserContext } from "~/context/global/UserContext";

const KanbanItem: React.FC<HomeKanbanItemProps> = ({
  initialOpenTicketModal,
  list,
  refreshList,
  forTickets,
  kanbanObjectType = "ticket",
}) => {
  const { theme } = useTheme();

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const [noOfPages, setNoOfPages] = useState(1);

  const { user } = useUserContext();

  useEffect(() => {
    setPage(1);
  }, [list.items]);

  useEffect(() => {
    if (kanbanObjectType === "dashboard") setNoOfPages(Math.ceil(list.items.length / itemsPerPage));
  }, [list.items]);

  const handleChange = (event: any, value: React.SetStateAction<number>) => {
    window.location.assign("#top-of-list");
    setPage(value);
  };

  return (
    <>
      {!(list.items.length > 0) ? (
        <Typography component="p">
          Não há nenhum item {list.name.toLowerCase()}
        </Typography>
      ) : (
        list.items
          ?.slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item, i) => {
            let _ticketFromUser = (item.users[0] === user.id) || (item.creatorId === user.id);
            return (
              <Card className={`${styles.card} ${styles[`theme${theme}`]}`} key={item.id}>
                <Flexbox flexDirection="column" spacing="p" width={"100%"}>
                  <Flexbox justify="space-between" wrap width={"100%"}>
                    <caption>{item.projectName}</caption>
                    <Flexbox spacing="p">
                      {forTickets && _ticketFromUser && (
                        <ModalTicketFinished
                          ticketId={item.ticketId}
                          finished={list.name === "Feito"}
                          getList={refreshList}
                        />
                      )}
                      {forTickets && item.ticketId && (
                        <ModalWithTicketResponses
                          token={item.ticketId}
                          getList={refreshList}
                          initialOpen={
                            Number(initialOpenTicketModal) ===
                            Number(item.ticketId)
                          }
                        />
                      )}
                      <Modal
                        title={"Detalhes do lançamento"}
                        openButton={
                          <DataTableButton icon="FaInfo" title="Detalhes" />
                        }
                      >
                        <KanbanModalContent item={item} />
                      </Modal>
                    </Flexbox>
                  </Flexbox>
                  <a key={`item-${item.id}`} id={`item-${item.id}`}>
                    <Typography component="h4" margin={{ bottom: "pp" }}>
                      {" "}
                      {forTickets &&
                        item.ticketId &&
                        "Ticket " + item.ticketId + " - "}{" "}
                      {item.name}{" "}
                    </Typography>
                  </a>

                  <span>
                    Lançamento por <strong> {item.creatorName} </strong> em{" "}
                    {item.createdAt}
                  </span>
                  <Flexbox align="center" spacing="p">
                    <Icon type="FaCalendar" size={16} />
                    <Typography component="h6">
                      {" "}
                      Entrega prevista para {item.endDate}
                    </Typography>
                  </Flexbox>
                  <LinkedUsersList users={item.users} />
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

export default KanbanItem;
