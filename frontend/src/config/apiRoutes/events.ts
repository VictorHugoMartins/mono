export const CALENDAR_EVENTS = {
    SAVE: () => `/Event/Save`,
    PREPARE: () => `/Event/Prepare?token=`,
    GET_ALL: () => `/Event/GetAll`,
    DELET: () => `/Event/Delete?token=`,
    GET_ALL_FILTERED: () => `/Event/GetAllFiltered`,
    GET_ALL_TIMEZONES: () => `/Event/GetAllTimezones`,
    BUILD: () => `/Event/Build`,
    GET_URL_SAVE: () => `/Event/SaveAndGetUrl`,
    EVENT_DETAILS : () => `/Event/Details?token=`
}