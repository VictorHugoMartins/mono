import { InputRenderType } from "~/types/global/InputRenderType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { SelectObjectType } from "~/types/global/SelectObjectType";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

type InitialDataFormType = {
  [key: string]: string;
};

type OptionInpuFormType = SelectObjectType[];

type OptionsInpuFormType = {
  [key: string]: OptionInpuFormType;
};

type BuildResponseType = {
  fields: InputRenderType[];
  next: boolean;
  previous: boolean;
};

async function build(path: string) {
  let response: InputRenderType[] = [];

  const responseApi = await GetRequest<BuildResponseType>(path);
  if (responseApi.success) {
    response = responseApi.object.fields;
  }

  return response;
}

async function prepare(path: string) {
  let response: InitialDataFormType = {};

  const responseApi = await GetRequest<InitialDataFormType>(path);

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getFormOptions(path: string) {
  let response: OptionsInpuFormType = {};

  const responseApi = await GetRequest<OptionsInpuFormType>(path, {});

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function submit(path: string, data: any) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
    errors: null,
  };

  const responseApi = await PostRequest<any>(path, data);
  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;
  response.object = responseApi.object;
  return response;
}

async function getSelectOptions(path: string) {
  let response: OptionInpuFormType = [];

  const responseApi = await GetRequest<OptionInpuFormType>(path);

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

async function getSelectOptionsWithBody(path: string, data: any) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
    errors: null,
  };

  const responseApi = await PostRequest<any>(path, data);
  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;
  response.object = responseApi.object;

  return response;
}

const formService = {
  build,
  prepare,
  submit,
  getSelectOptions,
  getSelectOptionsWithBody,
  getFormOptions,
};

export default formService;
