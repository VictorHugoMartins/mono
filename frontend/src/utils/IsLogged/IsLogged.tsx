import GetAuthToken from "../AuthToken/GetAuthToken";

export default function IsLogged(ctx?: any) {
  const { token } = GetAuthToken(ctx);
  return !!token;
}