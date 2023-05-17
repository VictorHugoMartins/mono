import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_CATEGORYKNOWLEDGEBASE } from "~/config/apiRoutes/categoryKnowLedgeBase";
import privateroute from "~/routes/private.route";

const KnowledgebaseCategoryList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Categorias de Conteudo">
      <ListPageStructure
        createPath="/adm/basedeconhecimento/categorias/adicionar"
        editPath="/adm/basedeconhecimento/categorias/editar"
        exportPath={API_CATEGORYKNOWLEDGEBASE.EXPORTLIST()}
        removeAPIPath={API_CATEGORYKNOWLEDGEBASE.DELETE()}
        param="id"
        getListPath={API_CATEGORYKNOWLEDGEBASE.GETALL()}
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseCategoryList);
