import React from 'react';

import FullCallendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import esLocale from '@fullcalendar/core/locales/pt-br';
import { CalendarDataOptions } from './calendar.interface';

const Calendar: React.FC<CalendarDataOptions> = ({
  calendarRef,
  initialDate,
  initialView,
  initialEvents,
  dayGridMonthFunction,
  prevClickFunction,
  nextClickFunction,
  selectFunction,
  eventClickFunction,
  timeGridWeekFunction,
  timeGridDayFunction
}) => {

  return (
    <FullCallendar
      initialDate={initialDate}

      timeZone='BRT'
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',

        right: 'dayGridMonth timeGridWeek timeGridDay'
      }}
      ref={calendarRef}
      customButtons={{
        next: {
          click: (e) => {
            if (nextClickFunction) nextClickFunction();
          }
        },
        prev: {
          click: (e) => {
            if (prevClickFunction) prevClickFunction();
          }
        },
        today: {
          text: 'Hoje',
          click: () => {
            let callendarAPI = calendarRef.current?.getApi();
            if (callendarAPI) {
              callendarAPI.today();
            }
          }
        },
        dayGridMonth: {
          text: 'Mês',
          click: () => {
            if (dayGridMonthFunction) dayGridMonthFunction();
          }
        },
        timeGridWeek: {
          text: 'Semana',
          click: () => {
            if (timeGridWeekFunction) timeGridWeekFunction();
          }
        },
        timeGridDay: {
          text: 'Dia',
          click: () => {
            if (timeGridDayFunction) timeGridDayFunction();
          }
        }
      }}
      locale={esLocale}
      initialView={initialView}
      editable={false}
      selectable={true}
      select={(e) => {
        if (selectFunction) selectFunction(e);
      }}
      selectMirror={true}
      dayMaxEvents={true}
      eventClick={(event) => {
        if (eventClickFunction) eventClickFunction(event);
      }}
      initialEvents={initialEvents}
    />
  );
}

export default Calendar;