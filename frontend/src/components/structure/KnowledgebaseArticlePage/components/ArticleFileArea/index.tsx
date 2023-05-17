import React from "react";

import style from "./articleFileArea.module.scss";

//Import components
import FileCard, { FileCardGroup } from "~/components/ui/FileCard";
import Typography from "~/components/ui/Typography/Typography";

//Import types
import { FileObjectType } from "~/types/global/FileObjectType";

interface ArticleFileArea {
  mainFile?: FileObjectType;
  galleryFiles?: FileObjectType[];
}

const ArticleFileArea: React.FC<ArticleFileArea> = ({
  mainFile,
  galleryFiles,
}) => {
  if (!mainFile && !galleryFiles) return <></>;
  return (
    <div className={style.articleFileArea}>
      <Typography component="h5">Arquivos: </Typography>
      <FileCardGroup>
        {mainFile && <FileCard fileObject={mainFile as any} />}
        {Array.isArray(galleryFiles) && (
          <>
            {galleryFiles.map((item, index) => (
              <FileCard key={`Filecard-${index}`} fileObject={item} />
            ))}
          </>
        )}
      </FileCardGroup>
    </div>
  );
};

export default ArticleFileArea;
