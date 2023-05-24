import { parseCookies } from "nookies";
import { useLayoutEffect, useState } from "react";
import RedirectTo from "~/utils/Redirect/Redirect";

export default function loginroute(Component) {
  const loginroute = (props) => {
    const [isLogged, setIsLogged] = useState(true);

    useLayoutEffect(() => {
      const { userId } = parseCookies();
      if (!userId) setIsLogged(false);
      else RedirectTo("/");
    }, []);

    if (!isLogged) {
      return <Component {...props} />;
    } else {
      return <></>;
    }
  };

  return loginroute;
}
