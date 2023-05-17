import React, { useEffect, useState } from "react";

//import components
import AllArticleList from "./components/AllArticleList";
import Tabs from "~/components/ui/Tabs";
import Typography from "~/components/ui/Typography/Typography";

//import config
import { API_ARTICLE } from "~/config/apiRoutes/article";

import style from "./knowledgebaseArticlePage.module.scss";

//import services
import listService from "~/services/list.service";
import formService from "~/services/form.service";

//import types
import { DataTableTabsRenderType } from "~/types/global/DataTableTabsRenderType";
import { GenericObjectType } from "~/types/global/GenericObjectType";

//import hooks
import useTheme from "~/hooks/useTheme";
import ArticleViewer from "./components/ArticleViewer";
import PopupLoading from "~/components/ui/Loading/PopupLoading/PopupLoading";

const KnowledgebaseArticlePage: React.FC = () => {
  const [_articleList, setArticleList] =
    useState<DataTableTabsRenderType>(null);
  const [_articleSelected, setArticleSelected] =
    useState<GenericObjectType>(null);
  const [_tabActive, setTabActive] = useState(0);

  const { theme } = useTheme();

  useEffect(() => {
    _getArticleList();
  }, []);

  useEffect(() => {
    setArticleSelected(null);
  }, [_tabActive]);

  async function _getArticleList() {
    let response = await listService.getGroupedList(
      API_ARTICLE.GETALLGROUPED()
    );

    setArticleList(response.object);
  }

  async function _getArticle(id: string) {
    let response = await formService.prepare(API_ARTICLE.PREPARE(id));
    if (response) {
      setArticleSelected(response);
    }
  }

  return (
    <div
      className={`${style.knowledgebaseArticlePage} ${style[`theme${theme}`]}`}
    >
      {!_articleList ? (
        <PopupLoading show={!_articleList} />
      ) : _articleList.length <= 0 ? (
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
            tabsData={_articleList?.map((item) => {
              return { label: item.tabName, value: "0" };
            })}
            horizontalScroll
            styleType="2"
            headerType
          />

          {_articleSelected ? (
            <ArticleViewer
              dataSelected={_articleSelected}
              sideList={_articleList[_tabActive]?.data}
              onChangeSelected={(id) => _getArticle(id)}
            />
          ) : (
            <AllArticleList
              list={_articleList[_tabActive]?.data}
              onClick={(id) => _getArticle(id)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default KnowledgebaseArticlePage;
