import { EventInput } from '@fullcalendar/core'
import FullCallendar from '@fullcalendar/react'

export interface CalendarDataOptions {
  calendarRef: React.MutableRefObject<FullCallendar>;
  initialDate: string;
  initialView: string;
  initialEvents: EventInput[];
  dayGridMonthFunction: Function;
  prevClickFunction: Function;
  nextClickFunction: Function;
  selectFunction: Function;
  eventClickFunction: Function;
  timeGridWeekFunction: Function;
  timeGridDayFunction: Function;
}