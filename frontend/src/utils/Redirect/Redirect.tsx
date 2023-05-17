import Router from "next/router";

function RedirectTo(path: string, target?:string) {
 if ( target === "_blank" ) window.open(path)
 else Router.push(path);
}

export default RedirectTo;