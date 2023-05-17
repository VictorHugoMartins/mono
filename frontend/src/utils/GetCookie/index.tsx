import { parseCookies } from "nookies";

async function GetCookie(token: string, ctx?: any) {
  const { [token]: value } = parseCookies(ctx);

  return value;
}

export default GetCookie;
