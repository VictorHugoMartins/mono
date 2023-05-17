import { GetRequest, PostRequest } from "~/utils/Requests/Requests";


export interface UserCreatedType {
    id: string,
    name: string,
    email?: string;
    profileImage?: string;
}
export interface ResponseGetEvents {
    id: number,
    title: string,
    description: string,
    linkMeeting: string,
    startDate: string,
    startTime: string,
    endDate: string,
    endTime: string,
    userCreated: UserCreatedType;
    statusName: string,
    eventTimezoneUnicode: string | null,
    usersAtendees: UserCreatedType[];
    color: string;
}
export interface ResponsePrepareEvents {
    id: number,
    title: string,
    description: string,
    linkMeeting: string,
    startDate: string,
    startTime: string,
    endTime: string;
    duration: string | null,
    userCreatedId: string,
    statusId: number,
    eventTimezoneId: string,
    atendeesIds: number[],
    color: string | null;
    linkCalendar: string;
}
export interface DetailsEvent {
    id: number,
    title: string,
    description: string,
    linkMeeting: string,
    startDate: string,
    startTime: string,
    endTime: string;
    duration: string | null,
    userCreatedId: UserCreatedType,
    statusId: number,
    eventTimezoneId: string,
    atendeesIds: number[],
    color: string | null;
    usersAtendees: UserCreatedType[];
    linkCalendar: string;
    statusName: string;
    eventTimezoneUnicode: string | null | undefined | string[];  
    linkPublicCalendar: string;
    htmlLinkCalendar:string;
   
}
const getAllEvents = async (rota: string) => {
    // console.log('dateEnd', dateEnd)
    try {

        const response = await GetRequest<ResponseGetEvents[]>(rota)
        // console.log(response)
        return response

    } catch (error) {
        return error
    }
}

const getEventsFiltered = async (rota: string, dateStart: string, dateEnd: string) => {

    // console.log('dateStart', dateStart)
    // console.log('dateEnd', dateEnd)
    try {
        const data = {
            "startDate": dateStart,
            "endDate": dateEnd,
        }
        const response = await PostRequest<ResponseGetEvents[]>(rota, data)
        // console.log(response)
        return response

    } catch (error) {
        return error
    }
}

const calendarService = {
    getAllEvents,
    getEventsFiltered
}

export default calendarService;