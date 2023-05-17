import { APIResponseType } from "~/types/global/RequestTypes";
import { getAPIClient } from "../../services/axios";
import {
  CONSTANTS_MESSAGES_APIERROR,
  CONSTANTS_MESSAGES_APIERROR406,
} from "../../config/messages";
import { CTXServerSideType } from "~/types/global/ServerSideTypes";
import RefreshToken from "../AuthToken/RefreshToken";
import RedirectTo from "../Redirect/Redirect";
import { AxiosInstance } from "axios";

async function GetRequest<T>(
  path: string,
  ctx?: CTXServerSideType,
  isRecursive?: boolean
) {
  const api = ctx ? getAPIClient(ctx) : getAPIClient();

  let response: APIResponseType<T> = { success: false, object: {} as T };
  try {
    await api
      .get(path)
      .then((result) => {
        response.success = result.data.success as boolean;
        response.number = result.data.number as number;
        response.object = result.data.object as T;
        response.message = result.data.message as string;
      })
      .catch(async function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              response.success = false;
              response.message = error.response.data.message;
              break;
            case 401:
              if (isRecursive != true) {
                await RefreshToken(ctx);
                response = await GetRequest(path, ctx, true);
              } else {
                response.success = false;
                response.message = CONSTANTS_MESSAGES_APIERROR;
              }
              break;
            case 403:
              response.success = false;
              response.message = CONSTANTS_MESSAGES_APIERROR406;
              RedirectTo("/dashboard/?view=0");
              break;
            case 404:
              response.success = false;
              response.message =
                error.response.data.message || CONSTANTS_MESSAGES_APIERROR;
              break;
            case 406:
              response.success = false;
              response.message = CONSTANTS_MESSAGES_APIERROR406;
              RedirectTo("/dashboard/?view=0");
              break;
            case 500:
              response.success = false;
              response.message = error.response.data.message;
              break;
          }
        } else {
          response.success = false;
          response.message = CONSTANTS_MESSAGES_APIERROR;
        }
      });
    return response;
  } catch {
    response.success = false;
    response.message = CONSTANTS_MESSAGES_APIERROR;
    return response;
  }
}

async function PostRequest<T>(
  path: string,
  data: {},
  ctx?: CTXServerSideType,
  isRecursive?: boolean,
  apiInstance?: AxiosInstance,
) {
  const api = apiInstance ? apiInstance : ctx ? getAPIClient(ctx) : getAPIClient();

  let response: APIResponseType<T> = {
    success: false,
    object: {} as T,
    message: "",
  };
  try {
    await api
      .post(path, data)
      .then((result) => {
        response.success = result.data.success as boolean;
        response.number = result.data.number as number;
        response.object = result.data.object as T;
        response.message = result.data.message as string;
      })
      .catch(async function (error) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              response.success = false;
              response.message =
                error.response.data.message || CONSTANTS_MESSAGES_APIERROR;
              response.errors = error.response.data.errors;
              break;
            case 401:
              if (isRecursive != true) {
                await RefreshToken(ctx);
                return PostRequest(path, data, ctx, true);
              }
              response.success = false;
              response.message = CONSTANTS_MESSAGES_APIERROR;
              break;
            case 404:
              response.success = false;
              response.message = CONSTANTS_MESSAGES_APIERROR;
              break;
            case 406:
              response.success = false;
              response.message = CONSTANTS_MESSAGES_APIERROR406;
              RedirectTo("/");
              break;
            case 409:
              response.success = false;
              response.message = error.response.data.message;
              break;
            case 500:
              response.success = false;
              response.message = error.response.data.message;
              break;
          }
        } else {
          response.success = false;
          response.message = CONSTANTS_MESSAGES_APIERROR;
        }
      });
    return response;
  } catch {
    response.success = false;
    response.message = CONSTANTS_MESSAGES_APIERROR;
    return response;
  }
}

export { GetRequest, PostRequest };
