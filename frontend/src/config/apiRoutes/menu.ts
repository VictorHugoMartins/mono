export const API_MENU = {
  BUILD: (token?:string) => `/Menu/Build${token?`?id=${token}`:''}`,
  DELETE: () => `/Menu/Delete`,
  GETALL: () => `/Menu/GetAll`,
  GETALLGROUPEDBYGROUP: () => `/Menu/GetAllGroupedByGroup`,
  GETMENU: (token: string) => `/Menu/GetMenus?token=${token}`,
  PREPARE: (token: string) => `/Menu/Prepare?token=${token}`,
  SAVE: () => `/Menu/Save`,
  EXPORTLIST: () => `/Menu/ExportList?options=`,
};
