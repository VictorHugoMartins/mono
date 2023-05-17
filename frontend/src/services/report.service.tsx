import { API_REPORT } from "~/config/apiRoutes/report";
import { GenericObjectType } from "~/types/global/GenericObjectType";
import { ReportType } from "~/types/global/ReportType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { PostRequest } from "~/utils/Requests/Requests";

function buildRequestReportData(data: GenericObjectType): SelectOptionsType {
  let response = [] as SelectOptionsType;

  Object.keys(data).forEach((key, index) => {
    response.push({
      label: key,
      value: data[key],
    });
  });

  return response;
}

async function buildReport(token: string, data?: any) {
  let response: APIResponseType<ReportType> = {
    object: {} as ReportType,
    success: false,
    message: "",
  };

  let requestData = data ? buildRequestReportData(data) : null;

  const responseApi = await PostRequest<ReportType>(
    API_REPORT.RENDERTABLE(token),
    requestData || []
  );

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const reportService = { buildReport };

export default reportService;
