import React, { useEffect, useState } from "react";
import HomeChartBoxRender from "~/components/structure/HomePageStructure/components/HomeChartBoxRender";

//Import types
import KanBanBoard from "~/components/local/Kanban/HomeKanban/HomeKanbanBoard";
import { WorkingHoursListPageProps } from "~/components/structure/WorkingHoursListPage";
import { Grid } from "~/components/ui/Layout/Grid";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";
import ticketService from "~/services/ticket.service";
import { GenericComponentType } from "~/types/global/GenericComponentType";
import { APIResponseType } from "~/types/global/RequestTypes";
import RoadMapHeader from "../../../../local/RoadMap/RoadMapHeader";

interface WorkingHoursKanBanProps extends WorkingHoursListPageProps {
  headerRender: GenericComponentType;
  forTickets?: boolean;
}

const WorkingHoursKanBan: React.FC<WorkingHoursKanBanProps> = ({
  headerRender,
  forTickets
}) => {
  const [_data, setData] = useState(null);

  async function _getKanbanList() {
    if (forTickets) {
      let response = await ticketService.getTicketsWorkingHoursKanban({ managementId: null, countItems: 30, projects: [], users: [] });
      setData(response.object);

    } else {
      let response = await ticketService.getWorkingHoursKanban({ managementId: null, countItems: 30, projects: [], users: [] });
      setData(response.object);
    }
  }

  function _setKanbanList(data: APIResponseType<any>) {
    setData(data);
  }

  useEffect(() => {
    _getKanbanList();
  }, []);

  if (!_data || (_data.length === 0)) return <PopupLoading show={true} />;
  return (
    <>
      {headerRender &&
        <RoadMapHeader
          headerRender={headerRender}
          reloadList={_getKanbanList}
          setList={_setKanbanList}
        />
      }

      {(forTickets && _data) ?
        <Grid container spacing="g">
          <Grid xs={12} md={6}>
            <HomeChartBoxRender
              title="Meus Tickets"
              data={_data.myTicketsChart}
              // getChartPath={API_KANBAN.GETTICKETCHARTBYUSER()}
              redirectPath="/projetos/tickets/meustickets/"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <HomeChartBoxRender
              title="Tickets"
              managementSelect
              data={_data.allTicketsChart}
              // getChartPath={API_KANBAN.GETALLTICKETSCHARTBYMANAGEMENT()}
              redirectPath="/projetos/tickets/lista/"
            />
          </Grid>
          <KanBanBoard
            data={forTickets ? _data.kanban : _data}
            refreshList={_getKanbanList}
            forTickets={forTickets}
          />
        </Grid> : !forTickets &&
        <KanBanBoard
          data={_data}
          refreshList={_getKanbanList}
        />
      }
    </>
  );
};

export default WorkingHoursKanBan;
