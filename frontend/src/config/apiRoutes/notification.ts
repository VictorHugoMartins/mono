export const API_NOTIFICATION = {
  GETALL: () => `/Notification/GetAll`,
  PREPARE: (token: string) => `/Notification/Prepare?token=${token}`,
  DELETE: () => `/Notification/Delete`,
  SAVE: () => `/Notification/Save`,
  SETVISUALIZED: (token: string) => `/Notification/SetVisualized?token=${token}`,
}