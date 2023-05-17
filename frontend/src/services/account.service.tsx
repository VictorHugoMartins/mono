import { API_ACCOUNT } from "~/config/apiRoutes/account";
import { UserInfoType } from "~/types/api/UserInfoType";
import { APIResponseType } from "~/types/global/RequestTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

async function confirmEmail(
  code: string | string[],
  userId: string | string[]
) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(`/Account/ConfirmAccount`, {
    userId,
    code,
  });

  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;

  return response.success;
}

async function forgotPassword(email: string) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>("/Account/ForgotPassword", {
    email: email,
  });

  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;

  return response;
}

type ResetPasswordData = {
  email: string;
  password: string;
  code: string;
};

async function resetPassword({ email, password, code }: ResetPasswordData) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>("/Account/ResetPassword", {
    email,
    password,
    code,
  });

  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;

  return response;
}

type resetPasswordSignInDataType = { oldPassword: string; newPassword: string };
async function resetPasswordSignIn(data: resetPasswordSignInDataType) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
    errors: null,
  };
  const responseApi = await PostRequest<any>(
    "/Account/ResetPasswordSignIn",
    data
  );

  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;

  return response;
}

type ResendEmailConfirmationData = {
  email: string;
};

async function resendEmailConfirmation({ email }: ResendEmailConfirmationData) {
  let response: APIResponseType<any> = {
    object: {},
    success: false,
    message: "",
  };

  const responseApi = await PostRequest<any>(
    API_ACCOUNT.RESENDEMAILCONFIRMATION(),
    {
      email,
    }
  );

  response.success = responseApi.success;
  response.message = responseApi.message;
  response.errors = responseApi.errors;

  return response;
}

async function getUserInfo() {
  let response: APIResponseType<UserInfoType> = {
    object: {} as UserInfoType,
    success: false,
    message: "",
  };

  const responseApi = await GetRequest<UserInfoType>(API_ACCOUNT.USERINFO());

  if (responseApi.success) response.object = responseApi.object;
  response.success = responseApi.success;
  response.message = responseApi.message;

  return response;
}

const accountService = {
  confirmEmail,
  forgotPassword,
  getUserInfo,
  resetPassword,
  resetPasswordSignIn,
  resendEmailConfirmation,
};

export default accountService;
