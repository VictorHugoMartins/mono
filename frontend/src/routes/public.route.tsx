import { GetServerSideProps } from "next";
import { useLayoutEffect, useState } from "react";
import GetAuthToken from "~/utils/AuthToken/GetAuthToken";
import RedirectTo from "~/utils/Redirect/Redirect";

export default function comumroute(Component) {
  const comumroute = (props) => {
    const [isLogged, setIsLogged] = useState(true);

    useLayoutEffect(() => {
      // const { token } = GetAuthToken();
      // if (!token) setIsLogged(false);
      // else RedirectTo("/");
    }, []);

    return <Component {...props} />;
  };

  return comumroute;
}
