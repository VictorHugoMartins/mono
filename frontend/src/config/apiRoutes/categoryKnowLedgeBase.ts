export const API_CATEGORYKNOWLEDGEBASE = {
  BUILD: () => `/CategoryKnowLedgeBase/Build`,
  DELETE: () => `/CategoryKnowLedgeBase/Delete`,
  GETALL: () => `/CategoryKnowLedgeBase/GetAll`,
  PREPARE: (token: string) => `/CategoryKnowLedgeBase/Prepare?token=${token}`,
  SAVE: () => `/CategoryKnowLedgeBase/Save`,
  EXPORTLIST: () => `/CategoryKnowLedgeBase/ExportList?options=`,
};
