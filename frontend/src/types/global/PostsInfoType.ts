import { PostsMessageType } from "./PostsMessageType";
import { SelectOptionsType } from "./SelectObjectType";

export type PostsInfoType = {
  infos: SelectOptionsType;
  posts: PostsMessageType[];
};
