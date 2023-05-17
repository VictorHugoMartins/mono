import { parseCookies } from "nookies";
import { STORAGE_TOKEN } from "~/config/storage";
import ConvertTokenToJSON from "./ConvertTokenToJSON";
import RefreshToken from "./RefreshToken";

async function CheckAuthToken(ctx?: any) {
  const { [STORAGE_TOKEN]: token } = parseCookies(ctx);

  let _decodedToken = ConvertTokenToJSON(token);

  if (_decodedToken) {
    if (_decodedToken.exp?.getTime() < new Date().getTime()) {
      await RefreshToken(ctx);
    }
  }
}

export default CheckAuthToken;
