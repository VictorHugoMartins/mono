export const API_NOTIFICATION_TEMPLATE = {
    GETALL:()=>`/NotificationTemplate/GetAll`,
    BUILD:()=>`/NotificationTemplate/Build`,
    PREPARE:(token:string)=>`/NotificationTemplate/Prepare?token=${token}`,
    DELETE: ()=>`/NotificationTemplate/Delete`,
    SAVE:()=>`/NotificationTemplate/Save`,
    EXPORTLIST:()=>`/NotificationTemplate/ExportList`
}