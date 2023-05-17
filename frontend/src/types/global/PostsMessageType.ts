import { FileObjectType } from "./FileObjectType";

export type PostsMessageType = {
  text: string;
  title: string;
  createdAt?: string;
  galleryFiles?: FileObjectType[];
  image?: FileObjectType;
  name?: string;
};
