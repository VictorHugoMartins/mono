import { GetServerSideProps } from "next";
import FormPageStructure from "~/components/structure/FormPageStructure";
import PrivatePageStructure from "~/components/structure/PrivatePageStructure/PrivatePageStructure";
import { API_PROSPECT } from "~/config/apiRoutes/prospect";
import { FormSuccess } from "~/utils/FormSuccess";

type PostManagementProps = {
  token: string;
};
const ProspectionEdit: React.FC<PostManagementProps> = ({ token }) => {
  const _returnUrl = "/adm/prospeccao/lista/";
  return (
    <PrivatePageStructure title="Editar Prospecção" returnPath={_returnUrl}>
      <FormPageStructure
        preparePath={API_PROSPECT.PREPARE(token)}
        buildPath={API_PROSPECT.BUILD(token?true:undefined)}
        submitPath={API_PROSPECT.SAVE()}
        buttonSubmitText="Salvar"
        buttonCancelText="Cancelar"
        returnPath={_returnUrl}
        onSuccess={FormSuccess}
      />
    </PrivatePageStructure>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.query;

  return { props: { token } };
};
export default ProspectionEdit;
