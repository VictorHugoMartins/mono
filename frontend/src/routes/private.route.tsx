import { parseCookies } from "nookies";
import { useLayoutEffect, useState } from "react";
import { useUserContext } from "~/context/global/UserContext";
import CheckAuthToken from "~/utils/AuthToken/CheckAuthToken";
import GetAuthToken from "~/utils/AuthToken/GetAuthToken";
import RedirectTo from "~/utils/Redirect/Redirect";

export default function privateroute(Component) {
  const privateroute = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const { getUserInfo } = useUserContext();

    useLayoutEffect(() => {
      _privatePageInit();
    }, []);

    async function _privatePageInit() {
      await CheckAuthToken();
      const { userId } = parseCookies();
      if (userId) {
        setIsLogged(true);
        getUserInfo();
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
