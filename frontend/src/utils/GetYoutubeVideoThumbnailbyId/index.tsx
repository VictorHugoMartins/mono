import { getYoutubeVideoIdbyLink } from "../GetYoutubeVideoIdbyLink";

const youtubeImgApi = "https://img.youtube.com/vi/*****/maxresdefault.jpg";

export const getYoutubeVideoThumbnailbyId = (url: string) => {
  let id = getYoutubeVideoIdbyLink(url);
  let response = youtubeImgApi.replace("*****", id);
  return response;
};
