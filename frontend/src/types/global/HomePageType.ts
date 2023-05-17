import { ChartObjectType } from "./ChartTypes";

export type HomeDataCollaborator = {
  userId: string;
  email: string;
  name: string;
  lastName: string;
  cards: CardProps;
  chartHoursData: ChartObjectType;
  chartSprintsAverage: ChartObjectType;
};

type CardProps = {
  todayHours: HoursCardType;
  mounthCard: HoursCardType;
  yearCard: HoursCardType;
};

type HoursCardType = {
  title: string;
  value: string;
};
