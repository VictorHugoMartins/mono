import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

import { APIResponseType } from "~/types/global/RequestTypes";

import { downloadBase64File } from "~/utils/DownloadBase64File";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";
import Toast from "~/utils/Toast/Toast";

export type ExportFileType = {
  disabled: boolean | null;
  file: string;
  name: string;
};

async function exportListPDFExcel(path: string, params?: {}) {
  let response: APIResponseType<ExportFileType> = {
    object: {} as ExportFileType,
    success: false,
    message: "",
  };

  if (params) {
    const responseApi = await PostRequest<ExportFileType>(`${path}`, params);
    if (responseApi.success) {
      downloadBase64File(responseApi.object.file, responseApi.object.name);
    } else Toast.error(responseApi.message || CONSTANTS_MESSAGES_APIERROR);
  } else {
    const responseApi = await GetRequest<ExportFileType>(`${path}`);

    if (responseApi.success) {
      downloadBase64File(responseApi.object.file, responseApi.object.name);
    } else Toast.error(responseApi.message || CONSTANTS_MESSAGES_APIERROR);
  }
}

const exportService = {
  exportListPDFExcel,
};

export default exportService;
