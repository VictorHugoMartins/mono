import React from "react";

import { Grid } from "~/components/ui/Layout/Grid";
import KanbanItem from "~/components/local/Kanban/MyTickets/KanbanItem";
import { getStylesByField } from "~/utils/GetStyles";
import { DashboardKanBanBoardProps } from "../kanban.interface";
import KanBanList from "../KanBanList";

const KanBanBoard: React.FC<DashboardKanBanBoardProps> = ({
  data,
  refreshList,
  forTickets
}) => {
  if (!data || (data.length === 0)) return <></>;
  return (
    <Grid container md={12} spacing={"xg"}>
      {data && data.length > 0 && data?.map((list, index) => (
        <Grid md={data.length === 4 ? 3 : 4} key={`list-${index}`}>
          <KanBanList
            title={list.name}
            backgroundColor={getStylesByField("name", list.name, 1).backgroundColor}
          >
            <KanbanItem list={list} refreshList={refreshList} kanbanObjectType={"dashboard"} forTickets={forTickets} />
          </KanBanList>
        </Grid>
      ))
      }
    </Grid >
  );
};

export default KanBanBoard;
