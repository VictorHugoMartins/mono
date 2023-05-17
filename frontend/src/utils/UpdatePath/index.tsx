import Router from "next/router";

//Import types
import { GenericObjectType } from "~/types/global/GenericObjectType";

function UpdatePath(path: string, query: GenericObjectType) {
  Router.push(
    {
      pathname: path,
      query: query,
    },
    undefined,
    { shallow: true }
  );
}

export default UpdatePath;
