import React from "react";

import KnowledgebaseArticlePage from "~/components/structure/KnowledgebaseArticlePage";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";

import privateroute from "~/routes/private.route";

const KnowledgebaseArticle: React.FC = () => {
  return (
    <PrivatePageStructure title="Artigos" noPadding>
      <KnowledgebaseArticlePage />
    </PrivatePageStructure>
  );
};

export default privateroute(KnowledgebaseArticle);
