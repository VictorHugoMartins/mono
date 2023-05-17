import React from "react";

import { TicketCardType } from "~/types/global/ListType";
import { Grid } from "~/components/ui/Layout/Grid";
import HomeKanbanItem from "~/components/local/Kanban/HomeKanban/HomeKanbanItem";
import KanBanList from "../KanBanList";

interface KanBanBoardProps {
  initialOpenTicketModal?: string;
  lists: TicketCardType[];
  refreshList: () => void;
}

const KanBanBoard: React.FC<KanBanBoardProps> = ({
  initialOpenTicketModal,
  lists,
  refreshList,
}) => {
  if (!lists) return <></>;
  return (
    <Grid container md={12} spacing={"xg"}>
      {lists?.map((item, index) => (
        <Grid md={lists.length === 4 ? 3 : 4} key={`list-${index}`}>
          <KanBanList
            backgroundColor={item.spanBackgroundColor}
            title={item.title}
          >
            <HomeKanbanItem
              item={item}
              refreshList={refreshList}
              kanbanObjectType={"ticket"}
              initialOpenTicketModal={initialOpenTicketModal}
            />
          </KanBanList>
        </Grid>
      ))}
    </Grid>
  );
};

export default KanBanBoard;
