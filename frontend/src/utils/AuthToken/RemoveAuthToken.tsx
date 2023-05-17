import { destroyCookie } from "nookies";
import { STORAGE_REFRESHTOKEN, STORAGE_TOKEN } from "~/config/storage";

function RemoveAuthToken(ctx?: any) {
  destroyCookie(ctx, STORAGE_TOKEN, { path: "/" });
  destroyCookie(ctx, STORAGE_REFRESHTOKEN, { path: "/" });
}

export default RemoveAuthToken;
