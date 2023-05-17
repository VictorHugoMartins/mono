import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// import { Container } from './styles';
import styles from './calendarRender.module.scss'
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/core'
import FullCallendar from '@fullcalendar/react'

import calendarService, { DetailsEvent, ResponseGetEvents, ResponsePrepareEvents } from '~/services/calendar.service';
import { APIResponseType } from '~/types/global/RequestTypes';

import FormPageStructure from '~/components/structure/FormPageStructure';
import { FormSuccess } from "~/utils/FormSuccess";
import RedirectTo from '~/utils/Redirect/Redirect';

import ModalDetailStructureCalendar from '~/components/structure/ModalDetailStructureCalendar';
import { GetRequest, PostRequest } from '~/utils/Requests/Requests';
import Toast from '~/utils/Toast/Toast';
import { API_HOLLIDAY } from '~/config/apiRoutes/holliday';
import { DataTableRenderType } from '~/types/global/DataTableRenderType';

import { ConvertDateToPTBR } from '~/utils/ConverteDateToPT-BR';
import ChildrenWithProps from '~/utils/ChildrenWithProps/ChildrenWithProps';
import UserListRender from '~/components/ui/DataTable/AdmTable/UserListRender';
import DataTableHeaderButton from '~/components/ui/DataTable/DataTableHeader/DataTableHeaderButton';
import PopupLoading from '~/components/ui/Loading/PopupLoading/PopupLoading';
import { Modal } from '~/components/ui/Modal/Modal';
import Loading from '~/components/ui/Loading/Loading';
import Typography from '~/components/ui/Typography/Typography';
import Flexbox from '~/components/ui/Layout/Flexbox/Flexbox';
import Button from '~/components/ui/Button/Button';
import Calendar from '~/components/ui/Calendar';
import { CalendarDataRenderOptions } from './calendarRender.interface';
import { ObjectResponse } from '~/types/global/ObjectResponse';

interface HolidayEvents {
  dateHoliday: string;
  id: number | string;
}

interface WeekDate {
  start: string;
  end: string;
}

const CalendarRender: React.FC<CalendarDataRenderOptions> = ({
  deletePathCalendar,
  endDateCalendar,
  preparePathCalendar,
  startDateCalendar,
  submitPathCalendar,
  getAllEvents,
  buildFormCalendar,
  getFilteredEvents,
  calendarRedirectAdd,
  calendarRedirectEdit,
  getUrlSaveCalendar,
  tabView,
  detailsEventsPath
}) => {
  const [dataCalendar, setDataCalendar] = useState<ResponseGetEvents[]>();
  const [holiday, setHoliday] = useState<DataTableRenderType>()
  const [holidayEvents, setHolidayEvents] = useState<HolidayEvents>()
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false)
  const [token, setToken] = useState<number | string>()
  const [prepare, setPrepare] = useState<ResponsePrepareEvents>();
  const [holidayClick, setHolidayClick] = useState<boolean>(false);
  const calendarRef = useRef<FullCallendar>(null);
  const [initialView, setInitiateView] = useState<string>('dayGridMonth')
  const [initialDate, setInitialDate] = useState<string>('')
  const [counter, setCounter] = useState<number>(1)
  const [fisrtSubimit, setFirtsSubmit] = useState<boolean>(true)
  const [alterNativeLoading, setAlternativeLoading] = useState<boolean>(false)
  const [externalData, setExternalData] = useState<boolean>(false)
  const [externalValue, setExternalValue] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [objectReturn, setObjectReturn] = useState<ObjectResponse>({
    response: ''
  })
  const [weekDate, setWeekDate] = useState<WeekDate>({
    end: '',
    start: ''
  })
  const [detail, setDetails] = useState<DetailsEvent>()
  const getCallendarFilteredDay = async (dateStr: string, action?: string) => {
    setAlternativeLoading(true)

    let date = new Date().toISOString()
    if (action === 'day') {
      date = dateStr
    } else {
      if (action !== 'prev') {
        if (fisrtSubimit === true) {
          date = new Date(new Date(dateStr).setHours(48)).toISOString()
        } else {
          date = new Date(new Date(dateStr).setHours(48)).toISOString()
        }
      } else {
        date = new Date(new Date(dateStr).setHours(-1)).toISOString()
      }
    }

    setInitialDate(date.split('T')[0])
    const startDate = `${date.split('T')[0]}T00:00:00.000Z`
    const endDate = `${date.split('T')[0]}T23:59:00.000Z`

    const response: APIResponseType<ResponseGetEvents[]> = await calendarService.getEventsFiltered(
      getFilteredEvents,
      startDate,
      endDate
    )
    if (response.success === true) {
      setDataCalendar(response.object)
      if (fisrtSubimit === true) {
        setFirtsSubmit(false)
      }
    } else {
      Toast.error(response.message)
    }
    setAlternativeLoading(false)

  }
  const getDataCalendarFilteredWeek = async (start: string, end: string, action?: string) => {
    setAlternativeLoading(true)
    let startDate = ''
    let endDate = ''
    if (action !== 'prev' && action !== 'week') {
      startDate = new Date(new Date(start).setHours(189)).toISOString();
      endDate = new Date(new Date(end).setHours(188)).toISOString();
      endDate = `${endDate.split('T')[0]}T23:59:00.000Z`
    } else if (action === 'prev') {
      startDate = new Date(new Date(start).setHours(-144)).toISOString();
      startDate = `${startDate.split('T')[0]}T00:00:00.000Z`;
      endDate = new Date(new Date(end).setHours(-148)).toISOString();
      endDate = `${endDate.split('T')[0]}T23:59:00.000Z`
    } else if (action === 'week') {
      if (weekDate.end !== '' && weekDate.start !== '') {
        startDate = weekDate.start
        endDate = weekDate.end
        setWeekDate({
          start: startDate,
          end: endDate
        })
      } else {
        startDate = new Date(new Date(start).setHours(189)).toISOString();
        // console.log(startDate, 'valor no start')
        endDate = new Date(new Date(end).setHours(-1)).toISOString();
        endDate = `${endDate.split('T')[0]}T23:59:00.000Z`
        setWeekDate({
          end: endDate,
          start: startDate
        })
      }
    }

    const response: APIResponseType<ResponseGetEvents[]> = await calendarService.getEventsFiltered(
      getFilteredEvents,
      startDate,
      endDate
    )
    if (action !== 'week') {
      setInitialDate(startDate.split('T')[0])
    }
    if (response.success === true) {
      setDataCalendar(response.object)
    } else {
      Toast.error(response.message)
    }
    setAlternativeLoading(false)

  }

  const getDataCalendar = async (alternativeAction?: boolean) => {
    if (alternativeAction === true) {
      setAlternativeLoading(true)
    } else {
      setLoading(true)
    }
    const response: APIResponseType<ResponseGetEvents[]> = await calendarService.getAllEvents(getAllEvents)
    if (response.success === true) {
      setDataCalendar(response.object)
    }
    const responseHolliday: APIResponseType<DataTableRenderType> = await GetRequest<DataTableRenderType>(API_HOLLIDAY.GETALL())
    if (response.success === true) {
      setHoliday(responseHolliday.object)
    }
    if (alternativeAction === true) {
      setAlternativeLoading(false)
    } else {
      setLoading(false)
    }
  }

  const prepareEvents = async (token: string, title?: string) => {
    if (title === 'Feriado') {
      setHolidayClick(true)
      const data: HolidayEvents[] = holiday && holiday.rows.length > 0 && holiday.rows.map(item => (
        {
          dateHoliday: ConvertDateToPTBR(item.holidayDate as string),
          id: item.id as number,
        }
      ))
      if (data && data.length > 0) {
        const filter = data.filter(item => {
          return `${item.id}` === token
        })
        setHolidayEvents(filter[0])
      }
    }
    const response: APIResponseType<DetailsEvent> = await GetRequest(`${detailsEventsPath}${token}`)
    // console.log(response)
    if (response.success === true) {
      setDetails(response.object)
    } else {
      Toast.error(response.message)
    }
  }

  const handleDeleteEvent = async () => {
    const response: APIResponseType<any> = await PostRequest(`${deletePathCalendar}${token}`, {})
    if (response.success === true) {
      getDataCalendar()
      Toast.success(response.message)
      setOpen(false)
    } else {
      Toast.error(response.message)
    }
  }

  useEffect(() => {
    const date = new Date().toISOString()
    setInitialDate(date.split('T')[0])
  }, [])

  useEffect(() => {
    if (open === false) {
      setHolidayClick(false)
    }
  }, [open])


  let INITIAL_EVENTS: EventInput[] = []
  if (holiday && holiday.rows.length > 0 && dataCalendar && dataCalendar.length > 0) {
    dataCalendar?.map(item => (
      INITIAL_EVENTS.push(
        {
          title: item.title,
          start: `${item.startDate.split('T')[0]}T${item.startTime}`,
          end: `${item.endDate.split('T')[0]}T${item.endTime}`,
          id: `${item.id}`,
          color: item.color,
        }
      )
    ))
    holiday?.rows?.map(item => (
      INITIAL_EVENTS.push({
        title: 'Feriado',
        start: (item.holidayDate as string).split('T')[0],
        end: (item.holidayDate as string).split('T')[0],
        id: `${item.id}`,
        color: '#937a7a',
      })
    ))
  } else if (holiday && holiday.rows.length > 0) {
    holiday?.rows?.map(item => (
      INITIAL_EVENTS.push({
        title: 'Feriado',
        start: (item.holidayDate as string).split('T')[0],
        end: (item.holidayDate as string).split('T')[0],
        id: `${item.id}`,
        color: '#937a7a',
      })
    ))
  } else if (dataCalendar && dataCalendar.length > 0) {
    dataCalendar?.map(item => (
      INITIAL_EVENTS.push(
        {
          title: item.title,
          start: `${item.startDate.split('T')[0]}T${item.startTime}`,
          end: `${item.endDate.split('T')[0]}T${item.endTime}`,
          id: `${item.id}`,
          color: item.color,
        }
      )
    ))
  }
  useLayoutEffect(() => {
    getDataCalendar()
  }, [])
  useEffect(() => {
    if (objectReturn !== undefined || objectReturn !== null) {
      if (objectReturn.response && `${objectReturn.response}`.length > 0) {
        // console.log('aqui')
        RedirectTo(`${objectReturn.response}`, '_blank')
      }
    }
  }, [objectReturn])


  function nextClickFunction() {
    let callendarAPI = calendarRef.current?.getApi();
    const data = callendarAPI.getEventSources()
    if (callendarAPI) {
      const currentViewType: 'dayGrid' | 'dayGridDay' | 'dayGridWeek' | 'dayGridMonth' | 'timeGrid' | 'timeGridDay' | 'timeGridWeek' = data[0]['context']['currentViewType']
      if (currentViewType === 'dayGridMonth') {
        let end = data[0]['context']['dateProfile']['currentRange']['end'] as string;
        end = new Date(end).toISOString() as string;
        setInitialDate(end.split('T')[0])
        setInitiateView('dayGridMonth')
        getDataCalendar(true)
      }
      if (currentViewType === 'timeGridWeek') {
        setInitiateView('timeGridWeek')
        const start = data[0]['context']['dateProfile']['activeRange']['start'];
        const end = data[0]['context']['dateProfile']['activeRange']['end'];
        getDataCalendarFilteredWeek(start, end,)
      }
      if (currentViewType === 'timeGridDay') {
        getCallendarFilteredDay(data[0]['context']['currentDate'])
        setInitiateView('timeGridDay')
      }
      setCounter(e => e + 1)
      callendarAPI.next();

    }
  }

  function prevClickFunction() {
    let callendarAPI = calendarRef.current?.getApi();
    if (callendarAPI) {
      let callendarAPI = calendarRef.current?.getApi();
      const data = callendarAPI.getEventSources()
      const currentViewType: 'dayGrid' | 'dayGridDay' | 'dayGridWeek' | 'dayGridMonth' | 'timeGrid' | 'timeGridDay' | 'timeGridWeek' = data[0]['context']['currentViewType']
      if (currentViewType === 'dayGridMonth') {
        let end = data[0]['context']['dateProfile']['currentRange']['start'] as string;
        let multiply = new Date(end).getDate()
        multiply = -(23 * multiply)
        // console.log(multiply)
        end = new Date(new Date(end).setHours(multiply)).toISOString()
        setInitialDate(end.split('T')[0])
        setInitiateView('dayGridMonth')
        getDataCalendar(true)
      }
      if (currentViewType === 'timeGridWeek') {
        setInitiateView('timeGridWeek')
        const start = data[0]['context']['dateProfile']['activeRange']['start'];
        const end = data[0]['context']['dateProfile']['activeRange']['end'];
        getDataCalendarFilteredWeek(start, end, 'prev')
      }
      if (currentViewType === 'timeGridDay') {
        getCallendarFilteredDay(data[0]['context']['currentDate'], 'prev')
        setInitiateView('timeGridDay')

      }
      callendarAPI.prev();
    }
  }
  function dayGridMonthFunction() {
    let callendarAPI = calendarRef.current?.getApi();
    if (callendarAPI) {
      setInitiateView('dayGridMonth')
      getDataCalendar()
      callendarAPI.changeView('dayGridMonth');
      setInitialDate(initialDate)
      //getDataCalendar()
    }
  }

  function selectFunction(e: DateSelectArg) {
    setExternalData(true);
    setOpenModal(true)
    setExternalValue(e.startStr)
  }

  function eventClickFunction(event: EventClickArg) {
    setOpen(e => !e)
    setToken(event.event.id)
    prepareEvents(event.event.id, event.event.title)
  }

  function timeGridWeekFunction() {
    let callendarAPI = calendarRef.current?.getApi();
    const data = callendarAPI.getEventSources()
    if (callendarAPI) {
      const start = data[0]['context']['dateProfile']['activeRange']['start'];
      const end = data[0]['context']['dateProfile']['activeRange']['end'];
      getDataCalendarFilteredWeek(start, end, 'week')
      setInitiateView('timeGridWeek')
      setInitialDate(initialDate)
      //getDataCalendar()
      callendarAPI.changeView('timeGridWeek');
    }
  }

  function timeGridDayFunction() {
    let callendarAPI = calendarRef.current?.getApi();
    const data = callendarAPI.getEventSources()
    if (callendarAPI) {
      getCallendarFilteredDay(initialDate, 'day')
      setInitiateView('timeGridDay')
      callendarAPI.changeView('timeGridDay');
    }
  }

  console.log("to chamando o trem certo?", deletePathCalendar);

  return (
    <>
      <PopupLoading show={loading} />
      <div style={{ width: 280, marginBlock: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Modal
          key={counter}
          setOpenModal={setOpenModal}
          openExternal={openModal}
          title={"Adicionar Evento"}
          fixed
          openButton={
            <DataTableHeaderButton
              text={"Adicionar"}
              icon={"FaPlus"}
            />
          }
          onClose={() => {
            setExternalData(false)
            getDataCalendar()
          }}
        >
          {ChildrenWithProps(
            <FormPageStructure
              externalInitalData={externalData ? {
                "startDate": `${externalValue}`,
              } : ''}
              onCancel={() => {
                setOpenModal(false);
                setCounter(e => e + 1)
              }}
              setObjectReturn={setObjectReturn}
              buildPath={buildFormCalendar}
              buttonSubmitText="Salvar"
              buttonCancelText="Cancelar"
              returnPath="/projetos/roadmap/"
              submitPath={getUrlSaveCalendar}
              onSuccess={(FormSuccess)}
            //preparePath={`${CALENDAR_EVENTS.PREPARE()}${token}`}
            />
            , {})}
        </Modal>
        {
          alterNativeLoading && (
            <Loading type='spin' size={10} />
          )
        }
      </div>
      {
        dataCalendar && dataCalendar.length === 0 && (
          <div style={{ marginBlock: 8 }}>
            <Typography component="h4">Não existem eventos neste período de tempo! Cadastre um para mostrar no calendário</Typography>
          </div>
        )
      }
      {
        loading === true ? (
          <>
          </>
        ) : (
          <>
            {
              !alterNativeLoading && (
                <div key={initialView === 'timeGridDay' && counter}>
                  {
                    initialDate !== '' && (
                      <Calendar
                        initialDate={initialDate}
                        calendarRef={calendarRef}
                        initialView={initialView}
                        initialEvents={INITIAL_EVENTS}
                        dayGridMonthFunction={dayGridMonthFunction}
                        prevClickFunction={prevClickFunction}
                        nextClickFunction={nextClickFunction}
                        selectFunction={selectFunction}
                        eventClickFunction={eventClickFunction}
                        timeGridWeekFunction={timeGridWeekFunction}
                        timeGridDayFunction={timeGridDayFunction}
                      />
                    )
                  }
                </div>
              )
            }
          </>
        )
      }
      <ModalDetailStructureCalendar
        title='Detalhes do Evento'
        open={open}
        maxWidth='md'
        setOpen={setOpen}
        token={1}
      >
        <div>
          <Flexbox flexDirection='column' spacing='p'>
            {
              <>
                {
                  holidayClick === true ? (
                    <>
                      <div className={styles.container}>
                        <Typography component='h2' >Feriado</Typography>
                        <div className={styles.containerDetail}>
                          <Typography component='p' >Data do evento</Typography>
                          <Typography component='h4'>{holidayEvents?.dateHoliday}</Typography>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {
                        detail ? (
                          <>
                            <div className={styles.container}>
                              <Typography component='h2' >{detail.title}</Typography>
                              <div className={styles.containerDetail}>
                                <Typography component='p' >Descrição</Typography>
                                <Typography component='h4' >{detail.description}</Typography>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <div className={styles.containerDetail}>
                                  <Typography component='p' >Data do evento</Typography>
                                  <Typography component='h4'>{ConvertDateToPTBR(detail.startDate)}</Typography>
                                </div>
                                <div className={styles.containerDetail}>
                                  <Typography component='p' >Horário do Evento</Typography>
                                  <Typography component='h4'>{detail.startTime.slice(0, 5)}</Typography>
                                </div>
                                <div className={styles.containerDetail}>
                                  <Typography component='p' >Hora Final</Typography>
                                  <Typography component='h4'>{detail.endTime.slice(0, 5)}</Typography>
                                </div>
                              </div>
                              <div className={styles.containerDetail}>
                                <Typography component='p' >Link do Meet</Typography>
                                <Typography component='h4' color='#00ff'><a href={detail.linkMeeting} target='_blank'>{detail.linkMeeting}</a></Typography>
                              </div>
                              <div className={styles.containerDetail}>
                                <Typography component='p' >Link de Integração</Typography>
                                <Typography component='h4' color='#00ff'><a href={detail.htmlLinkCalendar} target='_blank'><p className={styles.textStyled}>{detail.htmlLinkCalendar}</p></a></Typography>
                              </div>
                              <div className={styles.containerDetail}>
                                <Typography component='p' >Usuários Convidados:</Typography>
                                <div className={styles.containerUserList}>
                                  <UserListRender users={detail.usersAtendees}
                                    heightImage={40}
                                    widthImage={40}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Typography component='h4'>Nenhum dado Encontrado!</Typography>
                        )
                      }
                    </>
                  )
                }
              </>
            }
          </Flexbox>
          {
            !holidayClick ? (
              <>
                <div style={{ flexDirection: 'row', display: 'flex', gap: 10, height: 50 }}>
                  <Modal
                    title={"Editar Evento"}
                    fixed
                    key={counter}
                    openExternal={openModal}
                    openButton={
                      <DataTableHeaderButton
                        text={"Editar"}
                        icon={"FaPen"}
                      />
                    }
                    onClose={() => {
                      setOpen(false);
                      getDataCalendar()
                    }
                    }
                  >
                    {ChildrenWithProps(
                      <FormPageStructure
                        setObjectReturn={setObjectReturn}
                        buildPath={buildFormCalendar}
                        buttonSubmitText="Salvar"
                        onCancel={() => {
                          setOpenModal(false)
                          setCounter(e => e + 1)
                        }}
                        buttonCancelText="Cancelar"
                        returnPath="/projetos/roadmap/"
                        submitPath={getUrlSaveCalendar}
                        onSuccess={FormSuccess}
                        preparePath={`${preparePathCalendar}${token}`}
                      />
                      , {})}
                  </Modal>
                  <Button
                    type='button'
                    backgroundColor='red'
                    text='Excluir evento'
                    icon='FaTrash'
                    onClick={() => handleDeleteEvent()}
                  />
                </div>
              </>
            ) : (
              <>
                <Button
                  type='button'
                  backgroundColor='red'
                  text='Fechar'
                  onClick={() => setOpen(e => !e)}
                />
              </>
            )
          }
        </div>
      </ModalDetailStructureCalendar>
    </>
  );
}

export default CalendarRender;