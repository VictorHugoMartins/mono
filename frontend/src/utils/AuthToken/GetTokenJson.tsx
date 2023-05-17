import { parseCookies } from "nookies";
import { STORAGE_TOKEN } from "~/config/storage";
import ConvertTokenToJSON from "./ConvertTokenToJSON";

async function GetTokenJson(ctx?: any) {
  const { [STORAGE_TOKEN]: token } = parseCookies(ctx);

  let _decodedToken = ConvertTokenToJSON(token);

  return _decodedToken;
}

export default GetTokenJson;
