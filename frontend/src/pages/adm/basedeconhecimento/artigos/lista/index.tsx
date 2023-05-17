import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_ARTICLE } from "~/config/apiRoutes/article";
import privateroute from "~/routes/private.route";

const KnowledgebaseList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Artigos" noPadding>
      <ListPageStructure
        createPath="/adm/basedeconhecimento/artigos/adicionar"
        editPath="/adm/basedeconhecimento/artigos/editar"
        getListPath={API_ARTICLE.GETALLGROUPED()}
        exportPath={API_ARTICLE.EXPORTLIST()}
        removeAPIPath={API_ARTICLE.DELETE()}
        showTabs
        param="id"
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseList);
