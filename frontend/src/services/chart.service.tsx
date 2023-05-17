import { ChartRenderType } from "~/types/global/ChartRenderType";
import { ChartObjectType } from "~/types/global/ChartTypes";
import { DataTableColumnType } from "~/types/global/DataTableColumnType";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function getChart(path: string, isPost = false) {
  let response: APIResponseType<ChartObjectType> = {
    object: null as ChartObjectType,
    success: false,
    message: "",
  };

  const responseApi = isPost
    ? await PostRequest<ChartObjectType>(path, {})
    : await GetRequest<ChartObjectType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getList(path: string) {
  let response: APIResponseType<ChartRenderType> = {
    object: {} as ChartRenderType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<ChartRenderType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

export type PrepareBurnDownChartType = {
  chartAvgPoints: ChartObjectType;
  dataChart: ChartObjectType;
  dataTable: {
    sizeSprint: string;
    pointsAdvanced: string;
    pointsBurned: string;
    tables: {
      columns: DataTableColumnType[];
      rows: any[];
    };
  };
};

export type BurnDownTableType = {
  dataTable: DataTableRenderType;
  detailSprint: {
    burnedValue: number;
    concludedHours: string;
    endDate: string;
    percentConclusion: number;
    pointsIndicator: string;
    previsionHours: number;
    projectId: number;
    projectName: string;
    sprintId: number;
    sprintName: string;
    startDate: string;
    valueTotal: number;
  };
};

async function getTableList(path: string) {
  let response: APIResponseType<BurnDownTableType> = {
    object: {} as BurnDownTableType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<BurnDownTableType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

async function getListForChartAndTable(path: string) {
  let response: APIResponseType<PrepareBurnDownChartType> = {
    object: {} as PrepareBurnDownChartType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<PrepareBurnDownChartType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

export type BurnDownFileType = {
  disabled: boolean | null;
  file: string;
  name: string;
};

async function getFile(path: string) {
  let response: APIResponseType<BurnDownFileType> = {
    object: {} as BurnDownFileType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<BurnDownFileType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const chartService = {
  getChart,
  getList,
  getTableList,
  getListForChartAndTable,
  getFile,
};

export default chartService;
