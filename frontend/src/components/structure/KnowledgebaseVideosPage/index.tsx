import React, { useEffect, useState } from "react";

//Import components
import Tabs from "~/components/ui/Tabs";
import Typography from "~/components/ui/Typography/Typography";
import VideosList from "./components/VideosList";
import VideoReprodutor from "./components/VideoReprodutor";

//Import config
import { API_VIDEO } from "~/config/apiRoutes/video";

import style from "./knowledgebaseVideosPage.module.scss";

//Import services
import listService from "~/services/list.service";

//Import types
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

type videoSelectedType = {
  description: string;
  videoName: string;
  url: string;
};

const KnowledgebaseVideosPage: React.FC = () => {
  const [_videos, setVideos] = useState<DataTableTabsRenderType>(null);
  const [_videoSelected, setVideoSelected] = useState<videoSelectedType>(null);
  const [_tabActive, setTabActive] = useState(0);

  useEffect(() => {
    _getVideos();
  }, []);

  useEffect(() => {
    setVideoSelected(null);
  }, [_tabActive]);

  async function _getVideos() {
    let response = await listService.getGroupedList(API_VIDEO.GETALLGROUPED());
    setVideos(response.object);
  }

  async function _setVideo({ description, videoName, url }) {
    setVideoSelected({ description, videoName, url });
  }

  return (
    <div className={style.knowledgebasePage}>
      {!_videos ? (
        <PopupLoading show={!_videos} />
      ) : _videos.length <= 0 ? (
        <div style={{ padding: 16 }}>
          <Typography component="p">
            Sentimos muito, mas ainda não existe nenhum dado cadastrado!
          </Typography>
        </div>
      ) : (
        <>
          <Tabs
            active={_tabActive}
            setActive={setTabActive}
            tabsData={_videos?.map((item) => {
              return { label: item.tabName, value: "0" };
            })}
            horizontalScroll
            styleType="2"
            headerType
          />

          <div className={style.knowledgebaseVideosPage}>
            {_videoSelected && <VideoReprodutor {..._videoSelected} />}
            <VideosList
              list={_videos[_tabActive]?.data.rows}
              onClick={_setVideo}
              sideMode={!!_videoSelected}
              urlSelected={_videoSelected?.url}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default KnowledgebaseVideosPage;
