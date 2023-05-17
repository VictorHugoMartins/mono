import React from "react";
import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import Toast from "~/utils/Toast/Toast";
import RedirectTo from "~/utils/Redirect/Redirect";
import { API_MENU } from "~/config/apiRoutes/menu";
import { FormSuccess } from "~/utils/FormSuccess";
import privateroute from "~/routes/private.route";

interface MenuEditProps {
  token: string;
}

const MenuEdit: React.FC<MenuEditProps> = ({ token }) => {
  return (
    <PrivatePageStructure title="Editar Menu" returnPath="/adm/menu/lista">
      <FormPageStructure
        buildPath={API_MENU.BUILD(token)}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath="/adm/menu/lista"
        submitPath={API_MENU.SAVE()}
        preparePath={API_MENU.PREPARE(token)}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};

export default privateroute(MenuEdit);
