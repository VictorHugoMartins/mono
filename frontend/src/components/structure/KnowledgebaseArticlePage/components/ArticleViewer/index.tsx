import React from "react";

import style from "./articleViewer.module.scss";

//Import components
import ArticleFileArea from "../ArticleFileArea";
import Box from "~/components/ui/Layout/Box/Box";
import HtmlParseComponent from "~/components/ui/Layout/HtmlParseComponent";
import SideArticleList from "../SideArticleList";
import Typography from "~/components/ui/Typography/Typography";

//Import types
import { GenericObjectType } from "~/types/global/GenericObjectType";
import { DataTableRenderType } from "~/types/global/DataTableRenderType";

interface ArticleViewerProps {
  dataSelected: GenericObjectType;
  sideList: DataTableRenderType;
  onChangeSelected: (id: string) => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({
  dataSelected,
  sideList,
  onChangeSelected,
}) => {
  const htmlProps = {
    link: "<a",
    newLink: "<a style='color:blue'",
    image: "<img",
    newImage: '<img style="width:100%; border:1px solid #0b3861"',
  };

  if (!dataSelected) return <></>;
  return (
    <div className={style.articleViewer}>
      <div className={style.article}>
        <Box flexDirection="column" boxShadow borderRadius={8} padding={24}>
          <Typography component="h2">{dataSelected.title}</Typography>
          <HtmlParseComponent
            html={
              dataSelected.description
                .toString()
                .replaceAll(htmlProps.link, htmlProps.newLink)
                .replaceAll(htmlProps.image, htmlProps.newImage) as string
            }
          />
          <ArticleFileArea
            mainFile={dataSelected.mainFile as any}
            galleryFiles={dataSelected.galleryFiles as any}
          />
        </Box>
      </div>
      <SideArticleList
        idSelected={dataSelected["id"] as string}
        list={sideList}
        onClick={onChangeSelected}
      />
    </div>
  );
};

export default ArticleViewer;
