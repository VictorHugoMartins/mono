import React from "react";
import ListPageStructure from "~/components/structure/ListPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_VIDEO } from "~/config/apiRoutes/video";
import privateroute from "~/routes/private.route";

const KnowledgebaseList: React.FC = () => {
  return (
    <PrivatePageStructure title="Lista de Videos">
      <ListPageStructure
        createPath="/adm/basedeconhecimento/videos/adicionar"
        editPath="/adm/basedeconhecimento/videos/editar"
        getListPath={API_VIDEO.GETALL()}
        exportPath={API_VIDEO.EXPORTLIST()}
        removeAPIPath={API_VIDEO.DELETE()}
        param="id"
      />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseList);
