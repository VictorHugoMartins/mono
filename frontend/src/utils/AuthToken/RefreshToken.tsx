import { api } from "~/services/api";
import Logout from "../Logout/Logout";
import GetAuthToken from "./GetAuthToken";
import SetAuthToken from "./SetAuthToken";

//Metodo para atualizar token de validação de usuario
async function RefreshToken(ctx?: any) {
  const { token, refreshToken } = GetAuthToken(ctx);

  const data = { token: token, refreshToken: refreshToken };
  const response = await api
    .post("/Account/Refresh", data)
    .then((result) => {
      if (result.status === 202) {
        const responseData = result.data;
        SetAuthToken(responseData.token, responseData.refreshToken);
      } else {
        Logout();
      }
    })
    .catch(function (error) {
      Logout();
    });

  return response;
}

export default RefreshToken;
