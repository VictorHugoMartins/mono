import { parseCookies } from "nookies";
import { STORAGE_REFRESHTOKEN, STORAGE_TOKEN } from "~/config/storage";

function GetAuthToken(ctx?: any) {
  const { [STORAGE_TOKEN]: token, [STORAGE_REFRESHTOKEN]: refreshToken } =
    parseCookies(ctx);

  return { token, refreshToken };
}
export default GetAuthToken;
