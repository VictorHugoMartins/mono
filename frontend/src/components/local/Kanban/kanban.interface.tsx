
import { ReactNode } from "react";
import { TicketCardType } from "~/types/global/ListType";

export type KanbanCardType = {
  items: any;
  name: string;
};

export interface DashBoardKanbanItemProps extends KanBanItemProps {
  data: KanbanCardType[];
  list: any;
  forTickets?: boolean;
  initialOpenTicketModal?: string;
}

export interface KanBanItemProps {
  refreshList: () => void;
  kanbanObjectType?: "ticket" | "dashboard";
}

export interface HomeKanbanItemProps extends KanBanItemProps {
  list: any;
  forTickets?: boolean;
  initialOpenTicketModal?: string;
}


export interface DashboardKanBanBoardProps {
  data: KanbanCardType[];
  refreshList: () => void;
  forTickets?: boolean;
}

export interface MyTicketsKanBanBoardProps {
  initialOpenTicketModal?: string;
  lists: TicketCardType[];
  refreshList: () => void;
}

export interface KanBanListProps {
  backgroundColor: string;
  children: ReactNode;
  title: string;
}