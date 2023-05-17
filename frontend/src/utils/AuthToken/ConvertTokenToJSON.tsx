import { AuthTokenObjectType } from "~/types/global/AuthTokenObjectType";
import { parseJwt } from "../ParseJwt";

function ConvertTokenToJSON(token: string): AuthTokenObjectType {
  let response = {} as AuthTokenObjectType;

  let _parseToken = parseJwt(token);

  if (_parseToken) {
    response.name = _parseToken["name"];
    response.email = _parseToken["username"];
    if (_parseToken["exp"]) {
      let _tokenExp = new Date(0);
      _tokenExp.setUTCSeconds(_parseToken["exp"]);
      response.exp = _tokenExp;
    }
    if (_parseToken["roles"]) {
      let _roles = _parseToken["roles"].split(",");
      response.roles = _roles;
    }
  }

  return response;
}
export default ConvertTokenToJSON;
