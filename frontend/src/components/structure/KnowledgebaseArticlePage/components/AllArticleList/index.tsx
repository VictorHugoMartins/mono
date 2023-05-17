import React from "react";

//Import components
import Icon from "~/components/ui/Icon/Icon";
import GridGroup from "~/components/ui/Layout/GridGroup";
import Typography from "~/components/ui/Typography/Typography";

//Import hooks
import useTheme from "~/hooks/useTheme";

//Import types
import { DataTableRenderType } from "~/types/global/DataTableRenderType";

import style from "./allArticleList.module.scss";

interface AllArticleListProps {
  list: DataTableRenderType;
  onClick: (id: string) => void;
}

const AllArticleList: React.FC<AllArticleListProps> = ({ list, onClick }) => {
  const { theme } = useTheme();

  return (
    <div className={`${style.allArticleList} ${style[`theme${theme}`]}`}>
      <GridGroup width={"283px"} spacing={"xg"}>
        {list?.rows.map((item) => (
          <div
            key={`article-item-${item["id"]}`}
            className={style.allListItem}
            onClick={() => onClick(item["id"] as string)}
          >
            <Icon type="FaFileAlt" size={25} />
            <Typography component="h4">{item["title"]}</Typography>
          </div>
        ))}
      </GridGroup>
    </div>
  );
};

export default AllArticleList;
