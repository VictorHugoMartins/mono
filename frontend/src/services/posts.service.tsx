import { API_TICKET } from "~/config/apiRoutes/ticket";
import { ListType } from "~/types/global/ListType";
import { PostsInfoType } from "~/types/global/PostsInfoType";
import { CTXServerSideType } from "~/types/global/ServerSideTypes";
import { GetRequest, PostRequest } from "~/utils/Requests/Requests";

type NestedListType = {
  chart: {};
  lists: ListType[];
};

async function getInfo(path: string, ctx?: CTXServerSideType) {
  let response = null as PostsInfoType;

  const responseApi = await GetRequest<PostsInfoType>(path, ctx);

  if (responseApi.success) {
    response = responseApi.object;
  }

  return response;
}

const postsService = {
  getInfo,
};

export default postsService;
