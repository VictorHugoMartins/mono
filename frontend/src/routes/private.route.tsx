import { parseCookies } from "nookies";
import { useLayoutEffect, useState } from "react";
import CheckAuthToken from "~/utils/AuthToken/CheckAuthToken";
import RedirectTo from "~/utils/Redirect/Redirect";

export default function privateroute(Component) {
  const privateroute = (props) => {
    const [isLogged, setIsLogged] = useState(false);

    useLayoutEffect(() => {
      _privatePageInit();
    }, []);

    async function _privatePageInit() {
      await CheckAuthToken();
      const { userId } = parseCookies();
      if (userId) {
        setIsLogged(true);
      } else RedirectTo("/");
    }

    if (isLogged) {
      return <Component {...props} />;
    } else {
      return <></>;
    }
  };

  return privateroute;
}
