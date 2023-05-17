import React, { useEffect, useState } from "react";

//Import components
import Button from "~/components/ui/Button/Button";
import Card from "~/components/ui/Card";
import Chart from "~/components/ui/Charts/Chart";
import { Grid } from "~/components/ui/Layout/Grid";
import Flexbox from "~/components/ui/Layout/Flexbox/Flexbox";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

//Import services
import ticketService from "~/services/ticket.service";

//Import types
import { ChartObjectType } from "~/types/global/ChartTypes";
import { TicketCardType } from "~/types/global/ListType";

//Import utils
import RedirectTo from "~/utils/Redirect/Redirect";
import KanBanBoard from "~/components/local/Kanban/MyTickets/KanbanBoard";

interface MyTicketsListPageProps {
  createPath?: string;
  initialOpenTicketModal?: string;
}

const MyTicketsListPage: React.FC<MyTicketsListPageProps> = ({
  createPath,
  initialOpenTicketModal,
}) => {
  const [_lists, setLists] = useState<TicketCardType[]>(null);
  const [_chart, setChart] = useState<ChartObjectType>(null);

  async function _getList() {
    let response = await ticketService.getNestedList();
    setChart(response.chart);
    setLists(response.lists);
  }

  useEffect(() => {
    _getList();
  }, []);

  return (
    <>
      <PopupLoading show={!_chart && !_lists} />

      {createPath && (
        <Flexbox justify="flex-end" spacing="g" margin={{ bottom: "xg" }}>
          <div>
            <Button
              color="primary"
              icon="FaExternalLinkAlt"
              onClick={() => RedirectTo("/projetos/tickets/lista")}
            >
              Ver todos os tickets
            </Button>
          </div>
          <div>
            <Button
              color="primary"
              icon="FaPlus"
              onClick={() => RedirectTo(createPath)}
            >
              Criar Ticket
            </Button>
          </div>
        </Flexbox>
      )}

      <Grid container spacing={"xg"}>
        {_chart && (
          <Grid md={12}>
            <Card title={"Andamento dos tickets"} heightContent={350}>
              <Chart {..._chart} />
            </Card>
          </Grid>
        )}
        <KanBanBoard
          initialOpenTicketModal={initialOpenTicketModal}
          lists={_lists}
          refreshList={_getList}
        />
      </Grid>
    </>
  );
};

export default MyTicketsListPage;
