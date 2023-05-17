export const API_MANUALTRANSACTION = {
  BUILD: () => `/ManualTransaction/Build`,
  PREPARE: (token: string) => `/ManualTransaction/Prepare?token=${token}`,
  DELETE: () => `/ManualTransaction/Delete`,
  SAVE: () => `/ManualTransaction/Save`,
  GETALLGROUPED: () => `/ManualTransaction/GetAllGrouped`,
};
