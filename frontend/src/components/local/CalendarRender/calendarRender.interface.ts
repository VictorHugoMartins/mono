export interface CalendarDataRenderOptions {
  /** url que prepara calendario para edição */
  preparePathCalendar?: string;
  /** url de salvamento do calendario */
  submitPathCalendar?: string;
  /**url deleção de evento */
  deletePathCalendar?: string;
  /** data incial para o filtro  */
  startDateCalendar?: string;
  /** data final para o filtro */
  endDateCalendar?: string;
  /** url de buscar todos os eventos */
  getAllEvents?: string;

  /** build de formulario do calendario */
  buildFormCalendar?: string;
  /** busca eventos filtrados pela data */
  getFilteredEvents?: string;

  /** url de save que retorna o google agenda */
  getUrlSaveCalendar?: string;
  /** tela de adicionar */
  calendarRedirectAdd?: string;
  /** tela de edição */
  calendarRedirectEdit?: string;
  /** em qual tabView o calendario esta */
  tabView?: number;
  /** url que retorna detalhes do evento */
  detailsEventsPath: string;
}