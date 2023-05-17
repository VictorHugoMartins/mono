import React from "react";

//Import components
import Icon from "~/components/ui/Icon/Icon";
import Box from "~/components/ui/Layout/Box/Box";
import Typography from "~/components/ui/Typography/Typography";

//Import hooks
import useTheme from "~/hooks/useTheme";

//Import types
import { DataTableRenderType } from "~/types/global/DataTableRenderType";

import style from "./sideArticleList.module.scss";

interface SideArticleListProps {
  idSelected: string;
  list: DataTableRenderType;
  onClick: (id: string) => void;
}

const SideArticleList: React.FC<SideArticleListProps> = ({
  idSelected,
  list,
  onClick,
}) => {
  const { theme } = useTheme();

  return (
    <div className={`${style.sideArticleList} ${style[`theme${theme}`]}`}>
      <Box flexDirection="column" boxShadow borderRadius={8} padding={16} >
        <div className={style.list}>
          {list?.rows.map((item) => (
            <div
              key={`sideArticle-item-${item["id"]}`}
              className={`${style.item} ${
                item["id"] === idSelected ? style.selected : ""
              }`}
              onClick={() => onClick(item["id"] as string)}
            >
              <Icon type="FaFileAlt" size={25} />
              <Typography component="h4">{item["title"]}</Typography>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default SideArticleList;
