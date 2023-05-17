import { APIResponseType } from "~/types/global/RequestTypes";
import SetAuthToken from "~/utils/AuthToken/SetAuthToken";
import { api } from "./api";
import { CONSTANTS_MESSAGES_APIERROR } from "~/config/messages";

type AuthType = {
  token: string;
  refreshToken: string;
};

async function signIn({ email, password }) {
  let response: APIResponseType<AuthType> = {
    object: {} as AuthType,
    success: false,
    message: "",
  };

  const responseApi = await api
    .post("/Account/Login", { email: email, password: password })
    .then((result) => {
      const { token, refreshToken } = result.data;

      SetAuthToken(token, refreshToken);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      response.success = true;
    })
    .catch(async function (error) {
      response.message = error.response?.data?.message
        ? error.response.data.message
        : CONSTANTS_MESSAGES_APIERROR;
    });

  return response;
}

const authService = {
  signIn,
};

export default authService;
