export type ListType = {
  rows: ListRowType;
  backgroundColor?: string;
  title?: string;
};

export type ListRowType = ListRowItensType[];

export type ListRowItensType = ListRowItemType[];

export type ListRowItemType = {
  href?: string;
  label?: string;
  text: string;
};

export type TicketCardType = {
  cardBackgroundColor: string;
  spanBackgroundColor: string;
  title: string;
  rows: [{
    ticketId: number;
    title: string;
    href: string;
    project: string;
    createdBy: string;
    updatedAt: string;
  }]
}