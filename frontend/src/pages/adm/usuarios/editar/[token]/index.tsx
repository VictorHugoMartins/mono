import React from "react";
import { GetServerSideProps } from "next";

import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import UserFormPage from "~/components/structure/UserFormPage";

import privateroute from "~/routes/private.route";

interface UserEditProps {
  token: string;
}

const UserEdit: React.FC<UserEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure title="Editar Usuário">
      <UserFormPage title="Editar Usuário" token={token} />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(UserEdit);
