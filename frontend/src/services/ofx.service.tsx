import { API_OFX } from "~/config/apiRoutes/ofx";
import { ChartObjectType } from "~/types/global/ChartTypes";
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectOptionsType } from "~/types/global/SelectObjectType";
import { GetRequest } from "~/utils/Requests/Requests";

export type OfxChartType = {
  dayGraph: ChartObjectType;
  classGraph: ChartObjectType;
};

async function getCharts(id: string) {
  let response: APIResponseType<OfxChartType> = {
    object: {} as OfxChartType,
    success: false,
    message: "",
  };
  const dayGraph = await GetRequest<ChartObjectType>(
    API_OFX.GENERATEDAYGRAPH(id)
  );
  const classGraph = await GetRequest<ChartObjectType>(
    API_OFX.GENERATECLASSGRAPH(id)
  );

  if (dayGraph.success && classGraph.success) {
    response.object.dayGraph = dayGraph.object;
    response.object.classGraph = classGraph.object;
  }
  response.success = dayGraph.success && classGraph.success;
  response.message = dayGraph.message || classGraph.message;

  return response;
}

export type OfxRenderType = {
  dataTable?: DataTableTabsRenderType;
  classificationsEntry: SelectOptionsType;
  classificationsExit: SelectOptionsType;
};

async function getList(path: string) {
  let response: APIResponseType<OfxRenderType> = {
    object: {} as OfxRenderType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<OfxRenderType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const ofxService = {
  getList,
  getCharts,
};

export default ofxService;
