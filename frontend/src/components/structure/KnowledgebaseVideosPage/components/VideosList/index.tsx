import React from "react";
import Box from "~/components/ui/Layout/Box/Box";
import GridGroup from "~/components/ui/Layout/GridGroup";
import Typography from "~/components/ui/Typography/Typography";
import useTheme from "~/hooks/useTheme";
import { DataTableRowType } from "~/types/global/DataTableRowType";
import { getYoutubeVideoThumbnailbyId } from "~/utils/GetYoutubeVideoThumbnailbyId";

import style from "./videosList.module.scss";

interface VideosListProps {
  list: DataTableRowType[];
  sideMode?: boolean;
  urlSelected?: string;
  onClick: (data: any) => void;
}

const VideosList: React.FC<VideosListProps> = ({
  list,
  sideMode,
  onClick,
  urlSelected,
}) => {
  const { theme } = useTheme();

  if (sideMode) return (
    <div className={`${style.sideVideosList} ${style[`theme${theme}`]}`}>
      <Box flexDirection="column" boxShadow borderRadius={8} padding={16} >
        <div className={style.list}>
          {list?.map((item, index) => (
            <div
              key={`videoName-${index}`}
              className={`${style.item} ${item["url"] === urlSelected ? style.selected : ""
                }`}
              onClick={() => onClick({ ...item })}
            >
              <div className={style.content}>
                <div
                  className={style.thumbnail}
                  style={{
                    backgroundImage: `url("${getYoutubeVideoThumbnailbyId(
                      item["url"] as string
                    )}")`,
                  }}
                ></div>
                <Typography component="h4">{item["videoName"]}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  )
  return (
    <div
      className={`${style.videosList} ${style[`theme${theme}`]} ${sideMode ? style.sideMode : ""
        }`}
    >
      <GridGroup width="280px" spacing={"xg"}>
        {list.map((item, index) => (
          <div
            key={`videoName-${index}`}
            className={`${style.item} ${item["url"] === urlSelected ? style.selected : ""
              }`}
            onClick={() => onClick({ ...item })}
          >
            <div className={style.content}>
              <div
                className={style.thumbnail}
                style={{
                  backgroundImage: `url("${getYoutubeVideoThumbnailbyId(
                    item["url"] as string
                  )}")`,
                }}
              ></div>
              <Typography component="h4">{item["videoName"]}</Typography>
            </div>
          </div>
        ))}
      </GridGroup>
    </div>
  );
};

export default VideosList;
