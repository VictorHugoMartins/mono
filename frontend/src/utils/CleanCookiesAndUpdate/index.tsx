import { setCookie } from "nookies";

export default function cleanCookiesAndUpdate(data: { userId: string | number, name: string }) {
  localStorage.clear();
  setCookie(undefined, 'userId', data.userId.toString(), {
    maxAge: 60 * 60 * 24, //24 hours
    path: "/",
  });
  setCookie(undefined, 'userName', data.name, {
    maxAge: 60 * 60 * 24, //24 hours
    path: "/",
  });
}