import { setCookie } from "nookies";
import { STORAGE_REFRESHTOKEN, STORAGE_TOKEN } from "~/config/storage";
import { api } from "~/services/api";

function SetAuthToken(token: string, refreshToken: string) {
  setCookie(undefined, STORAGE_TOKEN, token, {
    maxAge: 60 * 60 * 24, //24 hours
    path: "/",
  });

  setCookie(undefined, STORAGE_REFRESHTOKEN, refreshToken, {
    maxAge: 60 * 60 * 24, //24 hours
    path: "/",
  });

  api.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export default SetAuthToken;
