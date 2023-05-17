import React from "react";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import UserFormPage from "~/components/structure/UserFormPage";
import privateroute from "~/routes/private.route";

const UserAdd: React.FC = () => {
  return (
    <PrivatePageStructure title="Adicionar Usuario">
      <UserFormPage title="Adicionar Usuario" />
    </PrivatePageStructure>
  );
};

export default privateroute(UserAdd);
