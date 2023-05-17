export const API_PROSPECT = {
  BUILD: (token?: boolean) =>
    `/Prospect/Build${token ? `?isEdit=${token}` : ""}`,
  PREPARE: (token: string) => `/Prospect/Prepare?token=${token}`,
  DELETE: () => `/Prospect/Delete`,
  SAVE: () => `/Prospect/Save`,
  PREPARESALESFUNNEL: (token: string) =>
    `/Prospect/PrepareSalesFunnel?token=${token}`,
  SALESFUNNELCHART: (
    startDate: string,
    endDate: string,
    managementId?: string,
    organizationId?: string,
    userSellerId?: string
  ) =>
    `/Prospect/SalesFunnelChart?startDate=${startDate}&endDate=${endDate}${
      managementId ? `&managementId=${managementId}` : ""
    }${organizationId ? `&organizationId=${organizationId}` : ""}${
      userSellerId ? `&userSellerId=${userSellerId}` : ""
    }`,
  SALESFUNNELTABLE: (
    startDate: string,
    endDate: string,
    managementId?: string,
    organizationId?: string,
    userSellerId?: string
  ) =>
    `/Prospect/SalesFunnelTable?startDate=${startDate}&endDate=${endDate}${
      managementId ? `&managementId=${managementId}` : ""
    }${organizationId ? `&organizationId=${organizationId}` : ""}${
      userSellerId ? `&userSellerId=${userSellerId}` : ""
    }`,
  GETALLGROUPEDOPTIONS: () => `/Prospect/GetAllGroupedOptions`,
  GETALLGROUPED: (startDate: string, endDate: string, managementId?: string) =>
    `/Prospect/GetAllGrouped?startDate=${startDate}&endDate=${endDate}${
      managementId && Number(managementId) > 0  ? `&managementId=${managementId}` : ""
    }`,
  EXPORTLIST: () => `/Prospect/ExportList?options=`,


  CHANGE_STATUS_SAVE: () => `/Prospect/ChangeStatus`,
  PREPARE_CHANGE_STATUS:(token:string|number)=>`/Prospect/PrepareChangeStatus?token=${token}`,
  CHANGE_STATUS_BUILD:()=>`/Prospect/BuildChangeStatus`,

  CHANGE_SELLER_SAVE:()=>`/Prospect/ChangeSeller`,
  PREPARE_CHANGE_SELLER:(token:string|number)=>`/Prospect/PrepareChangeSeller?token=${token}`,
  CHANGE_SELLER_BUILD:(token:string|number)=>`/Prospect/BuildChangeSeller?prospectId=${token}`,
};
