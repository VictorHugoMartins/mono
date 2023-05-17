import React from "react";
import Typography from "~/components/ui/Typography/Typography";
import useTheme from "~/hooks/useTheme";

import { generateIframeYouTubeLink } from "~/utils/GenerateIframeYouTubeLink";

import style from "./videoReprodutor.module.scss";

interface VideoReprodutorProps {
  description?: string;
  videoName?: string;
  url: string;
}

const VideoReprodutor: React.FC<VideoReprodutorProps> = ({
  description,
  url,
  videoName,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`${style.videoReprodutor} ${style[`theme${theme}`]}`}>
      <iframe
        src={generateIframeYouTubeLink(url)}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <Typography component="h2">{videoName}</Typography>
      <Typography component="h5">{description}</Typography>
    </div>
  );
};

export default VideoReprodutor;
