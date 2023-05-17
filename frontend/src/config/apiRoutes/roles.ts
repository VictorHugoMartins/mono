export const API_ROLES = {
    BUILD:()=>`/Role/Build`,
    SAVE:()=>`/Role/Save`,
    PREPARE:(token:string|number)=>`/Role/Prepare?token=${token}`,
    GETALL:()=>`/Role/GetAll`,
    DELETE:()=>`/Role/Delete`,
    EXPORTLIST:()=>`/Role/ExportList?options=`
}