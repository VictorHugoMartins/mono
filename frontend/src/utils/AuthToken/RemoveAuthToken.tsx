import { destroyCookie } from "nookies";

function RemoveAuthToken(ctx?: any) {
  destroyCookie(ctx, 'userId', { path: "/" });
  destroyCookie(ctx, 'userName', { path: "/" });
  destroyCookie(ctx, 'permission', { path: "/" });
}

export default RemoveAuthToken;
