import { ChartObjectType } from "~/types/global/ChartTypes";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest } from "~/utils/Requests/Requests";

async function getGenerateChart(path: string) {
  let response: APIResponseType<ChartObjectType> = {
    object: {} as ChartObjectType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<ChartObjectType>(path);

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return responseApi;
}
const chartService = {
  getGenerateChart,
};

export default chartService;
