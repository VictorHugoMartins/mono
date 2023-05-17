import React from "react";

import KnowledgebaseVideosPage from "~/components/structure/KnowledgebaseVideosPage";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import privateroute from "~/routes/private.route";

const KnowledgebaseVideos: React.FC = () => {
  return (
    <PrivatePageStructure title="Vídeos" noPadding>
      <KnowledgebaseVideosPage />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseVideos);
