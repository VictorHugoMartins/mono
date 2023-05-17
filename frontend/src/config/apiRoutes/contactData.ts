export const API_CONTACT_DATA = {
  BUILD: () => `/ContactData/Build`,
  SAVE: () => `/ContactData/Save`,
  EXPORTLIST: () => `/ContactData/ExportList?options=`,
  GETALL: (token?: string) => `/ContactData/GetAll?token=${token}`,
  GETALLGROUPED: (token?: string) => `/ContactData/GetAllGrouped?token=${token}`,
  GETBYID: (token: string) => `/ContactData/GetById?token=${token}`,
  MANAGEMENT_OPTIONS: `/ContactData/GetAllGroupedOptions`,
};
