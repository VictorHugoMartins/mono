import { API_REPORTGENERATOR } from "~/config/apiRoutes/reportGenerator";
import {
  GenericObjectArrayType,
  GenericObjectType,
} from "~/types/global/GenericObjectType";
import { ReportType } from "~/types/global/ReportType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { PostRequest } from "~/utils/Requests/Requests";

type ReportDataDropdownValuesType = {
  name: string;
  values: string[] | number[];
};

type ResponseBuildRequestReportData = {
  inputs: SelectOptionsType;
  dropdownsvalues: ReportDataDropdownValuesType[];
};

function buildRequestReportData(
  data: GenericObjectArrayType
): ResponseBuildRequestReportData {
  let response = {
    inputs: [],
    dropdownsvalues: [],
  } as ResponseBuildRequestReportData;

  Object.keys(data).forEach((key, index) => {
    if (key.includes("dropdown")) {
      response.dropdownsvalues.push({
        name: key.replace("dropdown", ""),
        values: data[key] as string[],
      });
    } else {
      response.inputs.push({
        label: key,
        value: data[key] as string,
      });
    }
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
    API_REPORTGENERATOR.RENDERREPORTS(token),
    requestData || { inputs: [], dropdownsvalues: [] }
  );

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function buildReportFiltered(
  token: string,
  data?: ResponseBuildRequestReportData
) {
  let response: APIResponseType<ReportType> = {
    object: {} as ReportType,
    success: false,
    message: "",
  };
  const responseApi = await PostRequest<ReportType>(
    API_REPORTGENERATOR.RENDERREPORTS(token),
    data
  );

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const reportGeneratorService = { buildReport, buildReportFiltered };

export default reportGeneratorService;
