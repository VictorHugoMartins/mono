export const API_BURNDOWN = {
    BUILD: (token: number) => `/BurnDown/BuildChart?idSprint=${token}`,
    PREPARE: (token: string) => `/BurnDown/Prepare?token=${token}`,
    GETOBSERVATIONS: (token: number) => `/BurnDown/Observations?idSprint=${token}`,
    GETDETAILS: (token: number) => `/BurnDown/Details?idSprint=${token}`,
    GETAVGPOINTS: (token: number) => `/BurnDown/AvgPointsSprints?idSprint=${token}`,
    EXPORTTOEXCEL: (token: number) => `/BurnDown/ExportXls?idSprint=${token}`, // deprecated
    EXPORTFILE: (token: number) =>  `/BurnDown/ExportList?idSprint=${token}&options=`,
    GET_SPRINT_AVERAGE:(token:string | number)=>`/BurnDown/GetChartGaugeAveragePointsSprint?token=${token}`,
    GET_PROJECT_AVERAGE:(token:string | number)=>`/BurnDown/GetChartGaugeAveragePointsProject?token=${token}`,
    EXPORTLIST:() => `/BurnDown/ExportList`
};